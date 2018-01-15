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

/** Easing equation for transitions **/
function ease(t) {
    return (t * (2 - t)) / 1; // Ease-Out Quad
}

/** Handles the present of the hash in the page URL **/
function setHash(targetHash) {
    if (history.replaceState) {
        history.replaceState(targetHash, null, targetHash);
    } else {
        location.hash = targetHash;
    }
}

/** Handles functions and binds them to requestAnimationFrame **/
function Ticker() {	// By Alan Transon: https://gist.github.com/atranson/006bf0aa19237b29b8d435dcc7f866e7
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

/** Scroller object to handle jumps to different sections in the page **/
function ScrollToTarget(ticker) {
    const TICKER_CALLBACK_NAME = 'scroller'; 
    const SCROLL_DURATION = 500;

    var initialOffsetY = 0,
        targetOffsetY = 0,
        startDate = null, // If not null, the scrolling behavior is active
        callbacks = {};

    this.start = function (scrollTarget) {
        /* If start is called before the previous scroll was ended, we force it to end */
        if (startDate != null) {
            endScrolling();
        }

        // Various browser handling
        initialOffsetY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        // Compute needed Y offset
        var targetY = initialOffsetY + parseInt(scrollTarget.getBoundingClientRect().top, 10);
        targetOffsetY = (targetY < 0 ? 0 : targetY) - initialOffsetY;

        startDate = new Date();
        ticker.hook(TICKER_CALLBACK_NAME, scrollStep);
        triggerCallback('start');
    }

    this.abort = function () {
        endScrolling();
    }

    this.onStart = function (callback) {
        callbacks['start'] = callback;
    }

    this.onStop = function (callback) {
        callbacks['stop'] = callback;
    }

    function scrollStep () {
        var elapsedTime = new Date() - startDate;

        if (elapsedTime >= SCROLL_DURATION) {
            window.scrollTo(0, targetOffsetY + initialOffsetY); // Sets the scroll to the final target
            endScrolling();
            return;   
        }

        var factor = ease(elapsedTime / SCROLL_DURATION);

        window.scrollTo(0, initialOffsetY + targetOffsetY * factor); // Redefine the scroll value
    }

    function endScrolling() {
        triggerCallback('stop');
        ticker.unhook(TICKER_CALLBACK_NAME); // The function is no longer called
        startDate = null; // Inactive
    }

    function triggerCallback(event) {
        if (event in callbacks) {
            callbacks[event]();
        }
    }
}

/** Handle menu operations **/
function MenuHandler(ticker, menuElements, logoElement) {
    const TICKER_CALLBACK_NAME = 'updateActiveMenu';
    
    function assignActiveMenu(targetMenu) {
        if (targetMenu.hasAttribute('aria-active')) { // No point in doing these operations if the menu is already active
            return;
        }

        $('[aria-active="true"]').removeAttribute('aria-active');
        targetMenu.parentElement.setAttribute('aria-active', 'true');
    }
    
    function clickAction(evt, targetMenu) {
        var targetHash = targetMenu.getAttribute('href'); // Retrieve target ID (#id format)
        
        assignActiveMenu(targetMenu);

        /* Prevent anchor jump */
        evt.preventDefault();
        evt.stopPropagation();
        
        setHash(targetHash); // Change the hash in the page URL accordingly
        
        scroller.start($(targetHash)); // Start scrolling to the target

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
        return $('[aria-active="true"] > a').getAttribute('href').split('#')[1];
    }
    
    var scroller = new ScrollToTarget(ticker);

    /* Handle the menu update while auto-scrolling */
    scroller.onStart(function() { ticker.disable(TICKER_CALLBACK_NAME); });
    scroller.onStop(function() { ticker.enable(TICKER_CALLBACK_NAME); });
    
    /* Bind menu links and logo to menuClick method */
    for (var i = 0 ; i < menuElements.length ; i++) {
        menuElements[i].addEventListener('click', function (e) {
            clickAction(e, e.currentTarget);
        });
    }

    logoElement.addEventListener('click', function (e) {
        clickAction(e, menuElements[0]); // The logo element should mirror the first menu element
    });
    
    ticker.hook(TICKER_CALLBACK_NAME, updateActiveMenu);
}

/** Object to handle the modal displaying project details **/
function ProjectModal(projects) {
    const TRANSITION_DURATION = 350; // ms (CSS transition time 300ms + 50ms compensation for potential delay)
    
    var opened = false,
        projectCount = projects.length;
    
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

        this.name.setAttribute('class', 'modal__name font__title text__center');

        this.details.container.setAttribute('class', 'modal__details');

        this.details.type.setAttribute('class', 'modal__details-type color__a-m');

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
        }.bind(this));

        this.buttons.previous.addEventListener('click', this.previous.bind(this));
        this.buttons.close.addEventListener('click', this.close.bind(this));
        this.buttons.next.addEventListener('click', this.next.bind(this));

        /* Swipping/dragging to previous/next project */
        this.wrapper.addEventListener('mousedown', function (e) { this.onDown(e, 'mouse'); }.bind(this));
        this.wrapper.addEventListener('touchstart', function (e) { this.onDown(e, 'touch'); }.bind(this));
        this.wrapper.addEventListener('mousemove', function (e) { this.onMove(e, 'mouse'); }.bind(this));
        this.wrapper.addEventListener('touchmove', function (e) { this.onMove(e, 'touch'); }.bind(this));
        this.wrapper.addEventListener('mouseup', function (e) { this.onUp(e, 'mouse'); }.bind(this));
        this.wrapper.addEventListener('touchend', function (e) { this.onUp(e, 'touch'); }.bind(this));
        
        opened = true;

        document.activeElement.blur(); // Remove the focus on the project button
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
            var original_i = 0,
                thumbnail_i = 0;

            projectMediaContent = '<div class="slideshow">' +
                projectData.slideshow.map(function (i) { // Pure CSS slideshow
                ++thumbnail_i;
                // Create a radio input and an associated label to select an image
                return '<input type="radio" name="slideshow" id="slideshow_item_' + thumbnail_i + '" class="slideshow__radio"' + ((thumbnail_i === 1) ? ' checked' : '') + '>' +
                    '<label for="slideshow_item_' + thumbnail_i + '" class="slideshow__label"><div class="slideshow__label-thumbnail" style="background-image: url(' + i.tb + ')"></div></label>';
            }).join(' ') +
                '<div class="slideshow__container loader">' +
                projectData.slideshow.map(function (i) {
                original_i++;
                return '<div class="slideshow__container-image" style="background-image: url(' + i.o + ')"></div>';
            }).join('') +
                '</div>' +
                '</div>';
        }
        else { // Show single image
            projectMediaContent = '<div class="modal__image loader" style="background-image: url(' + projectData.image + ');"></div>';
        }

        setTimeout(function () { // Handle if a transition warrants a delay in the change of content or not
            this.wrapper.setAttribute('data-current-project', (this.current + 1));

            this.media.innerHTML = projectMediaContent;

            this.logo.innerHTML = '<img src="' + projectData.logo + '" alt="Project logo" class="modal__logo-image">';

            this.name.innerText = projectData.name;

            this.details.type.innerText = projectData.type.join(' / ');

            this.details.tools.innerHTML = projectData.tools.map(function (t) {
                return '<span class="tool-icon tool-icon__' + t.toLowerCase().replace(/\s+/g, '') + '" data-tip="' + t + '" data-tip-nowrap="true" data-tip-reverse="true" data-tip-position="left">' + t + '</span>';
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

var ticker = new Ticker(),
    projectModal = new ProjectModal(projects);

document.addEventListener('DOMContentLoaded', function (e) {
    var menuHandler = new MenuHandler(
            ticker,
            document.querySelectorAll('.menu__nav-link'), // List of menu links
            $('#menu-logo') // Menu logo
        );
        
    /** Determines whether the intro video should be in the playing or paused state **/
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
    
    /** Dynamically loads the projects from the en/fr.js file **/
    (function () {
        var projectList = $('#projects-list'); // Element containing the grid of project buttons
        projectList.innerHTML = ''; // First we remove the content, which is a series of <a> elements

        for (var p = 0 ; p < projects.length ; p++) { // Repopulate the grid with buttons instead
            var proj = projects[p],
                pButton = document.createElement('button');

            pButton.setAttribute('type', 'button');
            pButton.setAttribute('class', 'project');
            pButton.setAttribute('data-project-id', p);

            pButton.innerHTML += "\n" +
                '<div class="project__frame">' + "\n" +
                '<div class="project__image" style="background-image: url(' + proj.background + ');"></div>' + "\n" +
                '<div class="project__logo" style="background-image: url(' + proj.logo + ');"></div>' + "\n" +
                '</div>' + "\n" +
                "\n";

            projectList.appendChild(pButton);

            pButton.addEventListener('click', function (e) {
                var getProjectId = e.currentTarget.getAttribute('data-project-id'),
                    projectId = parseInt(getProjectId, 10);

                projectModal.load(projectId); // Execute the project modal loading action
            });
        }
    })();
    
    /** Lazy-loading for the "About" image **/
    (function () {
        var image = $('#about-image'),
            imageToLoad = new Image();
        
        imageToLoad.src = image.getAttribute('data-lazy-src');
        
        imageToLoad.onload = function () { // Avoid a flash of unloaded image
            image.setAttribute('src', image.getAttribute('data-lazy-src'));
            image.removeAttribute('data-lazy-src');
        }
    })();
    
    /** Handling of the keyboard navigation for the project modal **/
    document.addEventListener('keyup', function (e) {
        e = e || window.event;
        
        if (projectModal.isOpened()) { // Only execute if the modal is open
            if (e.keyCode == 27 || e.key == "Esc" || e.key == "Escape") { // If the user presses 'escape'
                projectModal.close();
            }

            else if (e.keyCode == 37 || e.key == "Left" || e.key == "ArrowLeft") { // If the user presses the left arrow
                projectModal.previous();
            }

            else if (e.keyCode == 39 || e.key == "Right" || e.key == "ArrowRight") { // If the user presses the right arrow
                projectModal.next();
            }
        }
    });
    
    /* And finally, we can get the ticker going */
    ticker.start();
});