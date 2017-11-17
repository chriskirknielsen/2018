var scrollDuration = 300, // ms; total scroll duration
    repaintTick = Math.round(1000 / 60), // ms; number of repaints per second (target 60fps)
    updateActiveMenuOn = true; // See if the ticker has to check for the current section in the viewport

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) { window.setTimeout(callback, repaintTick); };

function Ticker() { // This function runs on requestAnimationFrame for continuously repeating functions
    this.callbackQueue = {};
    this.removeQueue = [];

    this.start = function () { this.ticker(); } // Initialise ticker

    this.ticker = function () {
        // First we remove elements from the callback queue
        while (this.removeQueue.length > 0) {
            var key = this.removeQueue.pop();
            if (key in this.callbackQueue) {
                delete this.callbackQueue[key];
            }
        }

        // Then we execute remaining callbacks
        for (var key in this.callbackQueue) {
            this.callbackQueue[key]();
        }

        requestAnimationFrame(this.ticker.bind(this)); // Restart function
    }

    this.addCallback = function(id, callback) {
        this.callbackQueue[id] = callback;
    }

    // Add callback ID to a queue for removal that will be emptied in ticker
    this.removeCallback = function(id) {
        if (id in this.callbackQueue) {
            this.removeQueue.push(id);
        } else {
            console.log('Error: the given id "' + id + '" does not refer to any callback function');
        }
    }
}
var ticker = new Ticker();

function ease(t) { // Easing equation
    return (t * (2 - t)) / 1; // Ease-Out Quad
}

// I am just a bit lazy to type the whole thing everytime…
function $(el, p) { return (p || document).querySelector(el); }

// AJAX
function xhrPost(url, params, isResponseJson, successFn, errorFn) {
    var request = new XMLHttpRequest(),
        resp = '';
    
    request.open('POST', url, true);
    request.withCredentials = true;
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            resp = (isResponseJson) ? JSON.parse(this.responseText) : this.responseText;

            if ((isResponseJson && resp.success === true) || (!isResponseJson && resp === 'email_okay')) { // reCAPTCHA JSON
                successFn(); // If all verifications are successful, we can execute the function
            }
            else {
                errorFn(resp);
            }
        }
    }
    
    request.send(params);
    
    return resp;
}

// Contact form submit
function contactSubmit() { // Contact form submit function
    var contactSubmitActions = { // Functions invoked at different stages of the emailing process
        captcha: {
            success: function () { // Captcha Success function: If the captcha reponse is valid, we process the e-mail
                var contactName = $('#contact_name').value,
                    contactEmail = $('#contact_email').value,
                    contactSubject = $('#contact_subject').value,
                    contactMessage = $('#contact_message').value,
                    contactParams = 'contact_name='+contactName+'&contact_email='+contactEmail+'&contact_subject='+contactSubject+'&contact_message='+contactMessage,
                    contactUrl = contactForm.getAttribute('action');

                var email = xhrPost(contactUrl, contactParams, false, contactSubmitActions.email.success, contactSubmitActions.email.failure);
            },
            failure: function () { // Captcha Error function: inform the user
                emailModal('error', lang.emailError);
            }
        },
        email: {
            success: function () { // All clear, we can inform the user the e-mail has been sent
                emailModal('success', lang.emailSuccess);
                console.log('E-mail sent!');
            },
            failure: function (errorCode) { // When an error occurs, retrieve the response and inform the user accordingly
                var errorMessage;

                switch (errorCode) {
                    case 'email_error::sendoff-fail':
                        errorMessage = lang.emailSendoffFail;
                        break;
                    case 'email_error::max-attempts':
                        errorMessage = lang.emailMaxAttempts;
                        break;
                    case 'email_error::email-invalid':
                        errorMessage = lang.emailAddressInvalid;
                        break;
                    case 'email_error::name-empty':
                        errorMessage = lang.emailNameEmpty;
                        break;
                    case 'email_error::subject-empty':
                        errorMessage = lang.emailSubjectEmpty;
                        break;
                    case 'email_error::not-post':
                        errorMessage = lang.emailNotPost;
                        break;
                    default:
                        errorMessage = lang.emailError;
                    }

                emailModal('error', errorMessage);
            }
        }
    };
    
    var contactForm = $('#contact__form'),
        gCaptchaResponse = $('.g-recaptcha-response').value,
        reCaptcha = xhrPost('./js/recaptcha.php',
                            'response=' + gCaptchaResponse,
                            true,
                            contactSubmitActions.captcha.success,
                            contactSubmitActions.captcha.failure
                            );
}

function emailModal(type, message) {
    var contactForm = $('#contact__form'),
        modal = document.createElement('div'),
        additionalButton = '';
    
    contactForm.classList.add('contact__form-' + type);
    
    if (type === 'error') { // If there's an error, let's allow the user to resubmit
        additionalButton = '<br><br><button class="button" onclick="removeEmailModal()"><span>OK</span></button>';
    }
    
    modal.setAttribute('class', 'contact__form-modal');
    modal.innerHTML = '<div class="contact__form-modal--symbol contact__form-modal--symbol_'+ type +'"></div><p class="text__center contact__form-modal--message">' + message + additionalButton + '</p>';
    
    contactForm.insertBefore(modal, contactForm.firstChild);
}

function removeEmailModal() {
    var contactForm = $('#contact__form'),
        modal = $('.contact__form-modal');
    
    contactForm.removeChild(modal);
    contactForm.classList.remove('contact__form-error');
}

document.addEventListener('DOMContentLoaded', function(e) {
    var menuLinkClass = '.menu__nav-item--link',
        menuLinks = document.querySelectorAll(menuLinkClass), // Retrieve all the menu links
        logoLink = $('.menu__logo'),
        hashSelection = (location.hash.slice(1)) ? location.hash.split('#')[1] : false,
        projectList = $('#projects-list'),
        projectCount = projects.length,
        projectModal = false,
        projectTransitionDuration = 350; // ms (CSS transition time + 50ms compensation for any delay)
    
    if ($('#contact__form')) {
        $('#contact-form-submit').setAttribute('type', 'button'); // Switch from a submit to a button
    }
    
    function menuSetActiveSection(targetElementId, doScroll, setHash) {
        var targetHash = '#' + targetElementId,
            sectionTarget = $(targetHash);

        if (setHash) {
            if (history.replaceState) {
                history.replaceState(targetHash, null, targetHash);
            } else {
                location.hash = targetHash;
            }
        }

        if (doScroll) {
            scrollToTarget(sectionTarget);
        }
        
        if (!sectionTarget.hasAttribute('aria-active')) { // No point in doing these operations if the menu is already active
            if (typeof doScroll === 'undefined' || doScroll !== true) { doScroll = false; }

            $('[aria-active="true"]').removeAttribute('aria-active');
            $(menuLinkClass + '[href="' + targetHash + '"]').parentElement.setAttribute('aria-active', 'true');
        }
    }
    
    function scrollToTarget(scrollTarget, scrollTiming, initialScrollPos, initialTargetY) {
        var scrollTopWindow = (typeof initialScrollPos !== 'undefined') ? initialScrollPos : (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),
            targetYcalc = (typeof initialTargetY !== 'undefined') ? initialTargetY : (scrollTopWindow + parseInt(scrollTarget.getBoundingClientRect().top, 10)),
            targetY = (targetYcalc < 0) ? 0 : targetYcalc,
            targetOffset = targetY - scrollTopWindow,
            scrollDirection = (targetOffset < 0) ? 1 : -1,
            scrollTiming = (typeof scrollTiming !== 'undefined') ? scrollTiming : 0;
        
        if (scrollTiming < scrollDuration) { // We aren't done yet
            var currentTimePercent = scrollTiming / scrollDuration,
                factor = ease(currentTimePercent),
                newScrollY = scrollTopWindow + targetOffset * factor;
            
            updateActiveMenuOn = false;
            
            window.scrollTo(0, newScrollY); // Redefine the scroll value

            ticker.addCallback('scroller', function () { // Restart function
                scrollToTarget(scrollTarget, (scrollTiming + repaintTick), scrollTopWindow, targetY)
            });
        }
        else { // We're done, we can stop the scrolling function and reallow the auto-update of the menu indicator
            updateActiveMenuOn = true;
            ticker.removeCallback('scroller');
            window.scrollTo(0, targetY);
        }
    }
    
    ticker.addCallback('updateActiveMenu', function () {
        if (updateActiveMenuOn) { // We don't want this to work while the scrollToTgarget function is working
            var windowHeight = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight,
                windowHeightThreshold = Math.round(windowHeight / 4);

            for (var i = 0 ; i < menuLinks.length ; i++) {
                var menuTargetHash = menuLinks[i].getAttribute('href').split('#')[1],
                    menuLinkTarget = $('#' + menuTargetHash),
                    menuScrollY = menuLinkTarget.getBoundingClientRect(),
                    menuScrollYTop = parseInt(menuScrollY.top, 10),
                    menuScrollYBottom = parseInt(menuScrollY.bottom, 10),
                    menuActive;

                if (menuScrollYTop <= windowHeightThreshold && menuScrollYBottom >= windowHeightThreshold) {
                    menuActive = menuTargetHash;
                }
            }

            menuSetActiveSection(menuActive, false, false);
        }
    });
    
    if (hashSelection && $(menuLinkClass + '[href="#' + hashSelection + '"]')) { // If there is a hash and the hash is associated to a menu's link to as section, change the active tag
        menuSetActiveSection(hashSelection, false, true);
    }
    
    function menuClick(event, targetHref) {
        menuSetActiveSection(targetHref, true, true);
        
        // Avoid <a> anchor to jump
        event.preventDefault();
        event.stopPropagation();
    }
    
    for (var i = 0 ; i < menuLinks.length ; i++) {
        menuLinks[i].addEventListener('click', function (e) {
            menuClick(e, e.currentTarget.getAttribute('href').split('#')[1]); // This is used to retrieve the target ID
        });
    }
    
    logoLink.addEventListener('click', function (e) {
        menuClick(e, menuLinks[0].getAttribute('href').split('#')[1]); // Same as above, retrieves target ID
    });
    
    // Lazy-loading for the "About" image
    (function lazyLoadAboutImage() {
        var img = $('.about__image'),
            imageToLoad = new Image();
        
        imageToLoad.src = img.getAttribute('data-lazy-src');
        
        imageToLoad.onload = function () { // Avoid a flash
            img.setAttribute('src', img.getAttribute('data-lazy-src'));
            img.removeAttribute('data-lazy-src');
        }
    })();
    
    //******************//
    // PROJECTS-RELATED //
    //******************//
    
    // Dynamically loads the projects list
    projectList.innerHTML = ''; // Empty the element, quick and dirty
    
    for (p = 0 ; p < projects.length ; p++) { // Retrieve projects and repopulate the list with buttons to be interactive
        var proj = projects[p],
            newButton = document.createElement('button');
        
        newButton.setAttribute('type', 'button');
        newButton.setAttribute('class', 'project');
        newButton.setAttribute('data-project-id', p);
        
        newButton.innerHTML += "\n" +
            '<div class="project__frame">' + "\n" +
                '<div class="project__image" style="background-image: url(' + proj.background + ');"></div>' + "\n" +
                '<div class="project__logo" style="background-image: url(' + proj.logo + ');"></div>' + "\n" +
            '</div>' + "\n" +
            "\n";
        
        projectList.appendChild(newButton);
        
        newButton.addEventListener('click', function (e) {
            var getParentId = e.currentTarget.getAttribute('data-project-id');
            var projectId = parseInt(getParentId, 10);
            
            if (!projectModal) {
                projectModal = new ProjectModal();
                projectModal.open();
            }

            projectModal.load(projectId);
        });
    }
    
    // Project modal
    function ProjectModal() { // Object to handle the modal operations
        this.current = 0;
        this.dragging = false;
        this.swipeX = 0;
        this.offsetX = 0;
        
        this.open = function () { // Method to create the modal's structure and properties
            // Create the modal elements
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
            this.wrapper.setAttribute('class', 'project-modal__wrapper');
            this.wrapper.setAttribute('data-projects', projectCount);
            
            this.content.setAttribute('class', 'project-modal__content');
            
            this.media.setAttribute('class', 'project-modal__content-media');
            
            this.info.setAttribute('class', 'project-modal__content-info');
            
            this.buttons.container.setAttribute('class', 'project-modal__content-info--buttons');
            
            this.buttons.previous.setAttribute('class', 'project-modal__content-info--buttons_button project-modal__content-info--buttons_prev');
            this.buttons.previous.setAttribute('title', lang.txtPrev);
            this.buttons.previous.innerHTML = '<span>&larr;</span>';

            this.buttons.close.setAttribute('class', 'project-modal__content-info--buttons_button project-modal__content-info--buttons_close');
            this.buttons.close.setAttribute('title', lang.txtClose);
            this.buttons.close.innerHTML = '<span>&times;</span>';

            this.buttons.next.setAttribute('class', 'project-modal__content-info--buttons_button project-modal__content-info--buttons_next');
            this.buttons.next.setAttribute('title', lang.txtNext);
            this.buttons.next.innerHTML = '<span>&rarr;</span>';
            
            this.logo.setAttribute('class', 'project-modal__content-info--logo');
            
            this.name.setAttribute('class', 'project-modal__content-info--name font__title text__center');
            
            this.details.container.setAttribute('class', 'project-modal__content-info--details');
            
            this.details.type.setAttribute('class', 'project-modal__content-info--details_type color__a-m');
            
            this.details.tools.setAttribute('class', 'project-modal__content-info--details_tools');
            
            this.description.setAttribute('class', 'project-modal__content-info--description');
            
            document.body.style.overflow = 'hidden'; // Disable scrolling for the content under the modal
            
            // Add all previously created elements into the document
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
                this.content.classList.add('project-modal__content-loaded');
            }.bind(this), projectTransitionDuration);
            
            // Event handlers
            this.wrapper.addEventListener('click', function (e) {
                if (e.target === this.wrapper) {
                    this.close();
                }
            }.bind(this)); // If the user clicks the background, ensure it closes

            this.buttons.previous.addEventListener('click', this.previous.bind(this));
            this.buttons.close.addEventListener('click', this.close.bind(this));
            this.buttons.next.addEventListener('click', this.next.bind(this));
            
            // Swipping/dragging to previous/next project
            this.wrapper.addEventListener('mousedown', function (e) { this.onDown(e, 'mouse'); }.bind(this));
            this.wrapper.addEventListener('touchstart', function (e) { this.onDown(e, 'touch'); }.bind(this));
            this.wrapper.addEventListener('mousemove', function (e) { this.onMove(e, 'mouse'); }.bind(this));
            this.wrapper.addEventListener('touchmove', function (e) { this.onMove(e, 'touch'); }.bind(this));
            this.wrapper.addEventListener('mouseup', function (e) { this.onUp(e, 'mouse'); }.bind(this));
            this.wrapper.addEventListener('touchend', function (e) { this.onUp(e, 'touch'); }.bind(this));
            
            document.activeElement.blur(); // Remove :focus on the project button
        }
        
        this.load = function (projectId) {
            var modalTransition = 0;
            
            if (projectId === '-' || projectId === '+') { // Modal is already open
                modalTransition = projectTransitionDuration;
                
                if (projectId === '-') {
                    this.content.classList.add('project-modal__content-previous');
                    this.content.classList.add('project-modal__content-switch');
                    
                    if (this.current === 0) { projectId = projectCount - 1; } // If the current project is the first, load the last one
                    else { projectId = this.current - 1; } // Else, get the previous project
                }
                else if (projectId === '+') {
                    this.content.classList.add('project-modal__content-next');
                    this.content.classList.add('project-modal__content-switch');
                    
                    if (this.current === (projectCount - 1)) { projectId = 0; } // If the current project is the last, load the first one
                    else { projectId = this.current + 1; } // Else, get the next project
                }

                setTimeout(function () {
                    this.content.classList.remove('project-modal__content-previous');
                    this.content.classList.remove('project-modal__content-next');

                    this.content.classList.remove('project-modal__content-switch');
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
                
                projectMediaContent = '<div class="project-modal__content-media--slideshow slideshow">' +
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
                projectMediaContent = '<div class="project-modal__content-media--image loader" style="background-image: url(' + projectData.image + ');"></div>';
            }
            
            setTimeout(function () { // Handle if a transition warrants a delay in the change of content or not
                this.wrapper.setAttribute('data-current-project', (this.current + 1));
                
                this.media.innerHTML = projectMediaContent;
                
                this.logo.innerHTML = '<img src="' + projectData.logo + '" alt="Project logo" class="project-modal__content-info--logo_image">';
                
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
            document.body.style.overflow = ''; // Allow scrolling again

            projectModal = false;
        }
        
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
                    this.wrapper.classList.add('project-modal__dragging');
                }
            }
        }

        this.onMove = function (e, type) {
            if (!this.dragging) { return; } // Cancel dragging if mouse button isn't pressed

            var pageWidth = window.innerWidth || document.documentElement.clientWidth,
                dragPosition = (type === 'touch') ? e.touches[0].pageX : e.pageX;

            this.offsetX = (dragPosition - this.swipeX) / pageWidth * 100; // Percentage

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

            this.content.style.transform = '';
            this.content.style.transition = '';

            this.media.style.opacity = '';
            this.media.style.transition = '';

            this.info.style.opacity = '';
            this.info.style.transition = '';

            this.wrapper.classList.remove('project-modal__dragging');

            // Reset variables
            this.dragging = false;
            this.offsetX = 0; 
            this.swipeX = 0;
        }
    }
    
    document.addEventListener('keyup', function (e) { // Enables easy keyboard navigation for project modal
        e = e || window.event;
        
        if (projectModal) { // No point in checking if the modal isn't open…
            if (e.keyCode == 27 || e.key == "Esc" || e.key == "Escape") { // If the user presses 'escape'
                projectModal.close(); // If the modal is open, close it
            }

            else if (e.keyCode == 37 || e.key == "Left" || e.key == "ArrowLeft") { // If the user presses the left arrow
                projectModal.previous(); // If the modal is open, load the previous project
            }

            else if (e.keyCode == 39 || e.key == "Right" || e.key == "ArrowRight") { // If the user presses the right arrow
                projectModal.next(); // If the modal is open, load the next project
            }
        }
    });
    
    // And now we can get the ticker going
    ticker.start();
});