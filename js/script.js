'use strict';
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) { window.setTimeout(callback, Math.round(1000 / 60)); }; // Set requestAnimationFrame with fallback

/**
 * Quick way to select an element based on CSS selector syntax
 * @param el: CSS selector for the target element
 * @param p (optional): parent element in which to search for el
 */
function $(el, p) {
    if (el.charAt(0) === '#' && !el.match(/\.|\[|\(|\:/)) { // Matches an #id without a CSS class, attribute or pseudo-selector
        return document.getElementById(el.slice(1));
    }

    return (p || document).querySelector(el);
}

/** Handles the presence of the hash in the page URL */
function setHash(targetHash) {
    if (history.replaceState) {
        history.replaceState(targetHash, null, targetHash);
    } else {
        location.hash = targetHash;
    }
}

/** Handles functions and binds them to requestAnimationFrame */
function Ticker() { // By Alan Transon: https://gist.github.com/atranson/006bf0aa19237b29b8d435dcc7f866e7
    var callbackQueue = {};

    /** Main ticker function (private) */
    function ticker() {
        // Execute the callbacks
        for (var key in callbackQueue) {
            if (callbackQueue[key]['enabled']) {
                // If the callback returns false, we remove it from the queue
                if (callbackQueue[key]['callback']() === false) {
                    delete callbackQueue[key];
                }
            }
        }

        requestAnimationFrame(ticker); // Restart function
    }

    function reportUnknownId(id) {
        console.log('Error: the given id "' + id + '" does not refer to any callback');
    }

    /** Start the ticker */
    this.start = function () { ticker(); }

    /**
	 * Add a callback so that it can be executed at each iteration of the ticker
	 * Note: a callback will be automatically unhooked if it returns false
	 * 
	 * @param id Key to identify the callback (allow removal afterwards)
	 * @param callback function that should be called every tick
	 */    
    this.hook = function (id, callback) {
        callbackQueue[id] = {
            'callback': callback, 
            'enabled': true
        };
    }

    /** 
	 * Remove a callback from the ticker
	 * @param id Key that was associated to the callback when it was hooked
	 */
    this.unhook = function (id) {
        if (id in callbackQueue) {
            delete callbackQueue[id];
        } else {
            reportUnknownId(id);
        }
    }

    /** 
	 * Enable a callback
	 * @param id Key that was associated to the callback when it was hooked 
	 */
    this.enable = function (id) {
        if (id in callbackQueue) {
            callbackQueue[id]['enabled'] = true;
        } else {
            reportUnknownId(id);
        }
    }

    /** 
	 * Disable a callback
	 * @param id Key that was associated to the callback when it was hooked 
	 */
    this.disable = function(id) {
        if (id in callbackQueue) {
            callbackQueue[id]['enabled'] = false;
        } else {
            reportUnknownId(id);
        }
    }
}

/** Handle menu operations */
function MenuHandler(ticker, menuElements, logoElement) {
    const TICKER_CALLBACK_NAME = 'updateActiveMenu';
    
    function assignActiveMenu(targetMenu) {
        // No point in doing these operations if the menu is already active
        if (targetMenu.hasAttribute('aria-current')) { return; }

        $('[aria-current="true"]').removeAttribute('aria-current');
        targetMenu.parentElement.setAttribute('aria-current', 'true');
    }
    
    function clickAction(evt, targetMenu) {
        var targetHash = targetMenu.getAttribute('href'); // Retrieve target ID (#id format)
        
        assignActiveMenu(targetMenu);

        /* Prevent anchor jump */
        evt.preventDefault();
        evt.stopPropagation();
        
        setHash(targetHash); // Change the hash in the page URL accordingly
        
        $(targetHash).scrollIntoView( {block: "start", inline: "nearest", behavior: "smooth"} ); // Start scrolling to the target

        document.activeElement.blur(); // Remove the focus on the clicked element
    }
    
    function updateActiveMenu() {
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight,
            windowHeightThreshold = Math.round(windowHeight / 3),
            activeMenu;

        for (var i = 0 ; i < menuElements.length ; i++) {
            var targetHash = menuElements[i].getAttribute('href').split('#')[1],
                linkTarget = $('#' + targetHash),
                scrollY = linkTarget.getBoundingClientRect(),
                scrollYTop = parseInt(scrollY.top, 10),
                scrollYBottom = parseInt(scrollY.bottom, 10);

            if (scrollYBottom >= windowHeightThreshold) {
                activeMenu = menuElements[i];
                break;
            }
        }
        
        assignActiveMenu(activeMenu);
    }
    
    this.getActiveMenuId = function () {
        /* Select the active menu's link and return its target href */
        return $('[aria-current="true"] > a').getAttribute('href').split('#')[1];
    }
    
    /* Bind menu links and logo to menuClick method */
    for (var i = 0 ; i < menuElements.length ; i++) {
        menuElements[i].addEventListener('click', function (e) {
            clickAction(e, e.currentTarget);
        }, false);
    }

    logoElement.addEventListener('click', function (e) {
        clickAction(e, menuElements[0]); // The logo element should mirror the first menu element
    }, false);
    
    ticker.hook(TICKER_CALLBACK_NAME, updateActiveMenu);
}

/** Object to handle the modal displaying project details */
function ProjectModal(projects) {
    const TRANSITION_DURATION = 350; // ms (CSS transition time 300ms + 50ms compensation for potential delay)
    
    var opened = false;
    var projectCount = projects.length;
    
    this.current = 0;
    this.dragging = false;
    this.swipeX = 0;
    this.offsetX = 0;

    this.isOpened = function () {
        return opened;
    }

    this.open = function () { // Method to create the modal's structure and properties
        /* Create the necessary modal elements */
        this.wrapper = document.createElement('div');
        this.content = document.createElement('div');
        this.media = document.createElement('div');
        this.info = document.createElement('div');
        this.buttons = {
            container: document.createElement('div'),
            previous: document.createElement('button'),
            next: document.createElement('button'),
            close: document.createElement('button')
        };
        this.logo = document.createElement('div');
        this.name = document.createElement('div');
        this.details = {
            container: document.createElement('div'),
            type: document.createElement('div'),
            tools: document.createElement('div')
        };
        this.description = document.createElement('div');

        // Add the attributes such as classes to the elements
        this.wrapper.setAttribute('class', 'modal__wrapper');
        this.wrapper.setAttribute('data-projects', projectCount);

        this.content.setAttribute('class', 'modal__content');
        this.content.setAttribute('tabindex', '0');

        this.media.setAttribute('class', 'modal__media');

        this.info.setAttribute('class', 'modal__info');

        this.buttons.container.setAttribute('class', 'modal__buttons');

        this.buttons.previous.setAttribute('class', 'modal__button modal__button-prev');
        this.buttons.previous.setAttribute('title', lang.txtPrev);
        this.buttons.previous.innerHTML = '<span>&larr;</span>';

        this.buttons.close.setAttribute('class', 'modal__button modal__button-close');
        this.buttons.close.setAttribute('title', lang.txtClose);
        this.buttons.close.innerHTML = '<span>&times;</span>';

        this.buttons.next.setAttribute('class', 'modal__button modal__button-next');
        this.buttons.next.setAttribute('title', lang.txtNext);
        this.buttons.next.innerHTML = '<span>&rarr;</span>';

        this.logo.setAttribute('class', 'modal__logo');

        this.name.setAttribute('class', 'modal__name font--title text--center');

        this.details.container.setAttribute('class', 'modal__details');

        this.details.type.setAttribute('class', 'modal__details-type color--a-m');

        this.details.tools.setAttribute('class', 'modal__details-tools');

        this.description.setAttribute('class', 'modal__description');

        /* Add all previously created elements into the document */
        document.body.appendChild(this.wrapper);
        this.wrapper.appendChild(this.content);
        this.content.appendChild(this.media);
        this.content.appendChild(this.info);
        this.info.appendChild(this.buttons.container);
        this.buttons.container.appendChild(this.buttons.previous);
        this.buttons.container.appendChild(this.buttons.close);
        this.buttons.container.appendChild(this.buttons.next);
        this.info.appendChild(this.logo);
        this.info.appendChild(this.name);
        this.info.appendChild(this.details.container);
        this.details.container.appendChild(this.details.type);
        this.details.container.appendChild(this.details.tools)
        this.info.appendChild(this.description);

        setTimeout(function () { // Avoid seeing the box-shadows while opening
            this.content.classList.add('modal__content--loaded');
        }.bind(this), TRANSITION_DURATION);

        this.wrapper.addEventListener('click', function (e) {
            if (e.target === this.wrapper) { // If the user clicks the background, ensure it closes
                this.close();
            }
        }.bind(this), false);

        this.buttons.previous.addEventListener('click', this.previous.bind(this), false);
        this.buttons.close.addEventListener('click', this.close.bind(this), false);
        this.buttons.next.addEventListener('click', this.next.bind(this), false);

        /* Swipping/dragging to previous/next project */
        this.wrapper.addEventListener('mousedown', function (e) { this.onDown(e, 'mouse'); }.bind(this), false);
        this.wrapper.addEventListener('touchstart', function (e) { this.onDown(e, 'touch'); }.bind(this), false);
        this.wrapper.addEventListener('mousemove', function (e) { this.onMove(e, 'mouse'); }.bind(this), false);
        this.wrapper.addEventListener('touchmove', function (e) { this.onMove(e, 'touch'); }.bind(this), false);
        this.wrapper.addEventListener('mouseup', function (e) { this.onUp(e, 'mouse'); }.bind(this), false);
        this.wrapper.addEventListener('touchend', function (e) { this.onUp(e, 'touch'); }.bind(this), false);
        
        opened = true;

        document.activeElement.blur(); // Remove the focus on the project button…
        this.content.focus(); // …and focus the project modal
    }

    this.load = function (projectId) {
        if (!this.isOpened()) {
            this.open();
        }
        
        var modalTransition = 0;

        if (projectId === '-' || projectId === '+') { // Modal is already open
            modalTransition = TRANSITION_DURATION;

            if (projectId === '-') {
                this.content.classList.add('modal__content--previous');
                this.content.classList.add('modal__content--switch');

                if (this.current === 0) { projectId = projectCount - 1; } // If the current project is the first, load the last one
                else { projectId = this.current - 1; } // Else, get the previous project
            }
            else if (projectId === '+') {
                this.content.classList.add('modal__content--next');
                this.content.classList.add('modal__content--switch');

                if (this.current === (projectCount - 1)) { projectId = 0; } // If the current project is the last, load the first one
                else { projectId = this.current + 1; } // Else, get the next project
            }

            setTimeout(function () {
                this.content.classList.remove('modal__content--previous');
                this.content.classList.remove('modal__content--next');

                this.content.classList.remove('modal__content--switch');
            }.bind(this), modalTransition);
        }

        this.media.classList.remove('loader');
        this.current = parseInt(projectId, 10); // Ensure this is an integer
        this.info.scrollTop = 0; // Scroll back to the top

        var projectData = projects[this.current],
            projectMediaContent = '';

        if (projectData.youtube) { // Load a YouTube video
            this.media.classList.add('loader');
            projectMediaContent = '<iframe src="//www.youtube.com/embed/' + projectData.youtube + '" allowfullscreen="" style="z-index: 200;" height="100%" frameborder="0" width="100%"></iframe>';
        }
        else if (projectData.embed) { // Embed raw HTML
            this.media.classList.add('loader');
            projectMediaContent = projectData.embed;
        }
        else if (projectData.slideshow) { // Create simple slideshow
            projectMediaContent =
                '<div class="slideshow">' +
                    projectData.slideshow.map(function (slide, i) { // Pure CSS slideshow
                    // Create a radio input and an associated label to select an image
                        return '<input type="radio" name="slideshow" id="slideshow_item_' + i + '" class="slideshow__radio visually-hidden" value="'+i+'" ' + (i === 0 ? ' checked' : '') + '>' +
                        '<label for="slideshow_item_' + i + '" class="slideshow__label"><div class="slideshow__label-thumbnail" style="background-image: url(' + slide.tb + ')" role="img" aria-label="Thumbnail for image '+(i+1)+' out of '+projectData.slideshow.length+'"></div></label>';
                    }).join(' ') +
                    '<div class="slideshow__container loader">' +
                        projectData.slideshow.map(function (slide, i) {
                            return '<div class="slideshow__container-image" style="background-image: url(' + slide.o + ')" role="img" aria-label="Full-sized image '+(i+1)+' out of '+projectData.slideshow.length+'"></div>';
                        }).join('') +
                    '</div>' +
                '</div>';
        }
        else { // Show single image
            projectMediaContent = '<div class="modal__image loader"><img src="' + projectData.image + '" alt="' + projectData.name + ' image" class="modal__image-img"></div>';
        }

        setTimeout(function () { // Handle if a transition warrants a delay in the change of content or not
            this.wrapper.setAttribute('data-current-project', (this.current + 1));

            this.media.innerHTML = projectMediaContent;

            this.logo.innerHTML = '<img src="' + projectData.logo + '" alt="Project logo" class="modal__logo-image">';

            this.name.innerText = projectData.name;

            this.details.type.innerText = projectData.type.join(' / ');

            this.details.tools.innerHTML = projectData.tools.map(function (t) {
                return '<span class="tool-icon tool-icon__' + t.toLowerCase().replace(/\s+/g, '') + '" data-tip="' + t + '" data-tip-nowrap="true" data-tip-reverse="true" data-tip-position="left" aria-label="' + t + '" role="img">' + t + '</span>';
            }).join(' '); // Creates a span for each tool in the array and associates a lowercase, spaceless classname to it

            this.description.innerHTML = projectData.description;
        }.bind(this), modalTransition);
    }

    this.previous = function () {
        this.load('-');
    }

    this.next = function () {
        this.load('+');
    }

    this.close = function () {
        document.body.removeChild(projectModal.wrapper); // Remove the modal from the DOM
        
        opened = false;
    }
    
    /* Mouse-drag/Touch-drag related methods */
    this.onDown = function (e, type) {
        var disableDragFrom = false;
        this.dragging = true;
        this.swipeX = (type === 'touch') ? e.touches[0].pageX : e.pageX;

        if (type === 'mouse') { // Prevent text from being select when mouse is dragging
            e.preventDefault();

            disableDragFrom = this.buttons.container;
        }
        else if (type === 'touch') { // Prevent dragging when touch is triggered from the info area
            disableDragFrom = this.info;
        }

        if (disableDragFrom) {
            if (e.target === disableDragFrom || disableDragFrom.contains(e.target)) {
                this.dragging = false;
            }
            else {
                this.wrapper.classList.add('modal--dragging');
            }
        }
    }

    this.onMove = function (e, type) {
        if (!this.dragging) { return; } // Cancel dragging if mouse button isn't pressed

        var pageWidth = window.innerWidth || document.documentElement.clientWidth,
            dragPositionX = (type === 'touch') ? e.touches[0].pageX : e.pageX;

        this.offsetX = (dragPositionX - this.swipeX) / pageWidth * 100; // Percentage

        this.content.style.transform = 'translateX(' + this.offsetX + 'vw)';
        this.content.style.transition = 'transform 0s linear';

        this.media.style.opacity = 1 - Math.abs(this.offsetX / 100);
        this.media.style.transition = 'opacity 0s linear';

        this.info.style.opacity = 1 - Math.abs(this.offsetX / 100);
        this.info.style.transition = 'opacity 0s linear';
    }

    this.onUp = function (e, type) {
        if (this.offsetX > 25) { // If the user goes more than 25% to the right, load the previous project
            this.previous();
        }
        else if (this.offsetX < -25) { // If the user goes more than 25% to the left, load the previous project
            this.next();
        }
        // Else, leave the displayed project in place

        this.content.style.removeProperty('transform');
        this.content.style.removeProperty('transition');

        this.media.style.removeProperty('opacity');
        this.media.style.removeProperty('transition');

        this.info.style.removeProperty('opacity');
        this.info.style.removeProperty('transition');

        this.wrapper.classList.remove('modal--dragging');

        // Reset variables
        this.dragging = false;
        this.offsetX = 0; 
        this.swipeX = 0;
    }
}

var ticker = new Ticker();
var projectModal = new ProjectModal(projects);

document.addEventListener('DOMContentLoaded', function (e) {
    var menuHandler = new MenuHandler(
            ticker,
            document.querySelectorAll('.js-menuLink'), // List of menu links
            $('#menu-logo') // Menu logo
        );
        
    /** Determines whether the intro video should be in the playing or paused state */
    function introVideoStateHandler() {
        var portfolioVideo = $('#portfolio-video');
        
        if (!portfolioVideo) { return; }
        
        // If the top part isn't active, we can pause the video if it's playing
        if (menuHandler.getActiveMenuId() !== 'portfolio' && !portfolioVideo.paused) {
            portfolioVideo.pause();
        }
        
        // The portfolio section is active so the video can play if it's paused
        else if (menuHandler.getActiveMenuId() === 'portfolio' && portfolioVideo.paused) {
            portfolioVideo.play();
        }
    }
    
    ticker.hook('portfolioVideo', introVideoStateHandler);
    
    /** Dynamically loads the projects from the [en|fr].js file */
    (function () {
        var projectList = $('#projects-list'); // Element containing the grid of project buttons
        projectList.innerHTML = ''; // First we remove the content, which is a series of <a> elements

        for (var p = 0 ; p < projects.length ; p++) { // Repopulate the grid with buttons instead
            var proj = projects[p];
            var pButton = document.createElement('button');

            pButton.setAttribute('type', 'button');
            pButton.setAttribute('class', 'project');
            pButton.setAttribute('aria-labelledby', 'project-name-'+p);
            pButton.setAttribute('data-project-id', p);

            pButton.innerHTML += "\n" +
                '<div class="project__frame">' + "\n" +
                    '<div class="project__image" style="background-image: url(' + proj.background + ');" aria-hidden="true"></div>' + "\n" +
                    '<img src="' + proj.logo + '" class="project__logo" alt="' + proj.name + ' logo">' + "\n" +
                    '<span class="project__name" id="project-name-'+p+'">' + proj.name + '</span>' + "\n" +
                '</div>' + "\n" +
                "\n";

            projectList.appendChild(pButton);

            pButton.addEventListener('click', function (e) {
                var getProjectId = e.currentTarget.getAttribute('data-project-id');
                var projectId = parseInt(getProjectId, 10);

                projectModal.load(projectId); // Execute the project modal loading action
            }, false);
        }
    })();
    
    /** Delay loading for the "About" image */
    (function () {
        var image = $('#about-image');
        var imageToLoad = new Image();
        
        imageToLoad.src = image.getAttribute('data-lazy-src');
        
        imageToLoad.onload = function () { // Avoid a flash of unloaded image
            image.setAttribute('src', image.getAttribute('data-lazy-src'));
            image.removeAttribute('data-lazy-src');
        }
    })();
    
    /** Handling of the keyboard navigation for the project modal */
    document.addEventListener('keyup', function (e) {
        e = e || window.event;
        
        if (projectModal.isOpened()) { // Only execute if the modal is open
            if (e.keyCode == 27 || e.key == "Esc" || e.key == "Escape") { // If the user presses 'escape'
                if (projectModal.dragging) { // If Esc is pressed while dragging the modal, cancel dragging
                    projectModal.onUp(false, 'mouse');
                    return;
                }
                
                projectModal.close();
            }

            else if (e.keyCode == 37 || e.key == "Left" || e.key == "ArrowLeft") { // If the user presses the left arrow
                projectModal.previous();
            }

            else if (e.keyCode == 39 || e.key == "Right" || e.key == "ArrowRight") { // If the user presses the right arrow
                projectModal.next();
            }
        }
    }, false);
    
    /* And finally, we can get the ticker going */
    ticker.start();
}, false);

(function (){ // Handle the "hero" media to be displayed
    var windowW = window.innerWidth;
    var NOVIDEO_BREAKPOINT = 520;
    var QUALITY_BREAKPOINT = 1440;
    var VIDEO_ATTR = 'data-video-responsive';
    var SRCSET_ATTR = 'data-video-srcset';
    var POSTER_ATTR = 'data-video-poster';
    var videos = document.querySelectorAll('[' + VIDEO_ATTR + ']');

    var setVideoTag = function (el, url, poster) {
        var elClasses = el.getAttribute('class');
        var elId = el.getAttribute('id');

        el.outerHTML =
        '<video poster="'+poster+'" muted autoplay loop playsinline class="'+elClasses+'" id="'+elId+'" tabindex="-1">'
        +'    <source src="'+url+'.webm" type="video/webm">'
        +'    <source src="'+url+'.mp4" type="video/mp4">'
        +'</video>'
    }

    for (var v = 0; v < videos.length; v++) {
        var sdPoster = videos[v].getAttribute('src');
        var hdPoster = videos[v].getAttribute(POSTER_ATTR);
        var srcset = videos[v].getAttribute(SRCSET_ATTR).split(',').map(function(s){return s.trim()}); // URLs without the extension (webm and mp4 variants are expected)

        if (windowW < NOVIDEO_BREAKPOINT) { continue; } // The screen is small, no video will be shown, skip the rest of the iteration

        if (windowW <= QUALITY_BREAKPOINT) {
            setVideoTag(videos[v], srcset[0], sdPoster);
        }
        else {
            setVideoTag(videos[v], srcset[1], hdPoster);
        }
    }
})();