var lang = {
    emailSuccess: 'Your e-mail has been sent - I will get back to you as soon as possible!',
    emailError: 'Unable to send your email, please check all fields and try again.',
    emailSendoffFail: 'There was an error trying to send your email.',
    emailMaxAttempts: 'You have sent too many e-mails! If you really need to send another, please send it via your e-mail client to my e-mail address above the form.',
    emailAddressInvalid: 'Please make sure your e-mail address is in a valid format (e.g. you@gmail.com) so that I can get back to you.',
    emailNameEmpty: 'Please specify your name before sending your email.',
    emailSubjectEmpty: 'Please write a subject line.',
    emailNotPost: 'I do not know what happened but it seems this was not sent via the right form.',
    txtPrev: 'Previous',
    txtNext: 'Next',
    txtClose: 'Close'
};

var projects = [
    /*
        {
            name, // STRING
            type, // ARRAY
            tools, // ARRAY
            description, // STRING
            logo, // STRING (URL)
            background, // STRING (URL)
            image, // STRING (URL)
            || embed, // STRING (HTML)
            || youtube // STRING (VIDEO ID)
            || slideshow // ARRAY (OBJECT CONTAINING tb AND o SIZE URLs)
        }
    */
    
    { // Super Mario Odyssey
        name: 'Super Mario Odyssey - European Marketing Campaign',
        type: ['Design','Motion','Integration'],
        tools: ['Photoshop','After Effects','Google Web Designer'],
        description: 'For Nintendo of Europe, I worked with Green Garden Digital to deliver multiple assets for the European marketing campaign of Super Mario Odyssey on the Nintendo Switch. I produced master files for both the set of banners and the dynamic takeover, starting from Photoshop files given to me by co-workers.<br><br>The banners were built in Google Web Designer, and the dynamic takeover was prepared in After Effects and integrated in HTML/CSS.',
        logo: './img/work/tb_mario.png',
        background: './img/work/bg_mario.jpg',
        image: './img/work/bg_mario.jpg'
    },
    { // Ratchet Galaxy
        name: 'Ratchet-Galaxy v3',
        type: ['Web Design','Integration'],
        tools: ['Sketch','Illustrator','Brackets'],
        description:
            'A redesign for the website <a href="https://www.ratchet-galaxy.com" target="_blank">Ratchet-Galaxy.com</a> was longtime overdue. I have been close to this web project since its genesis, first creating its now-popular logo. I was able to take it further by renewing the entire visual identity of the website, drawing inspiration from the recent Ratchet &amp; Clank games.'+
            '<br><br>'+
            'All the pages were mocked up in Sketch, while the icons were drawn in Illustrator, and the integration was done in Brackets.',
        logo: './img/work/tb_rgv3.png',
        background: './img/work/bg_rgv3.jpg',
        slideshow: [
            {
                tb: './img/work/tb_rgv3-1.jpg',
                o: './img/work/fs_rgv3-1.jpg'
            },
            {
                tb: './img/work/tb_rgv3-2.jpg',
                o: './img/work/fs_rgv3-2.jpg'
            },
            {
                tb: './img/work/tb_rgv3-3.jpg',
                o: './img/work/fs_rgv3-3.jpg'
            }
        ]
    },
    { // PlayStation
        name: 'PlayStation: an illustration project',
        type: ['Illustration'],
        tools: ['Illustrator'],
        description: 'My first gaming console was a PlayStation in 1997, you could say I\'ve become a bit of a PlayStation fan since then. I needed some vector illustrations of the various PlayStation consoles and controllers for a personal project, so I decided I would make my own.',
        logo: './img/work/tb_playstation.png',
        background: './img/work/bg_playstation.jpg',
        slideshow: [
            {
                tb: './img/work/tb_playstation-1.jpg',
                o: './img/work/fs_playstation-1.jpg'
            },
            {
                tb: './img/work/tb_playstation-2.jpg',
                o: './img/work/fs_playstation-2.jpg'
            },
            {
                tb: './img/work/tb_playstation-3.jpg',
                o: './img/work/fs_playstation-3.jpg'
            },
            {
                tb: './img/work/tb_playstation-4.jpg',
                o: './img/work/fs_playstation-4.jpg'
            }
        ]
    },
    { // Dexter
        name: 'Minimalist Dexter Intro',
        type: ['Motion Design'],
        tools: ['After Effects'],
        description:
        'An intro video for the TV show Dexter on Showtime. The idea was to create a short video with After Effects, with simple shapes, while making a clean and smooth animation. I cut the music to make it shorter and tried to remind of key elements of the show with simple geometric shapes.<br><br>'+
        'Dexter is a TV show on Showtime that I really liked. Based on Jeff Lindsay\'s book "Dearly Disturbed Dexter", who has since written many more, Dexter is a personal favourite.',
        logo: './img/work/tb_dexter.png',
        background: './img/work/bg_dexter.jpg',
        youtube: 'LNAa26l4ugU'
    },
    { // Posters
        name: 'Unrelated Posters',
        type: ['Design','Typography'],
        tools: ['Photoshop','Illustrator'],
        description: 'Here is a handful of posters I\'ve made to practice (these were not commissioned).<br><br>'+
        '<span class="font__title">Houston:</span> This is a typography-oriented project with layers of text leading to a famous quote.<br><br>'+
        '<span class="font__title">1984:</span> Also typography-oriented, this was meant to be a book cover but also works in it own right as a poster, playing with the notion of censorship which is a main theme of the book.<br><br>'+
        '<span class="font__title">Björk:</span> This poster is an excercise to play with low-poly vector art. Each triangle was individually drawn (reference photo used).',
        logo: './img/work/tb_posters.png',
        background: './img/work/bg_posters.jpg',
        slideshow: [
            {
                tb: './img/work/tb_posters-houston.jpg',
                o: './img/work/fs_posters-houston.jpg'
            },
            {
                tb: './img/work/tb_posters-1984.jpg',
                o: './img/work/fs_posters-1984.jpg'
            },
            {
                tb: './img/work/tb_posters-bjork.jpg',
                o: './img/work/fs_posters-bjork.jpg'
            }
        ]
    },
    { // Awesome
        name: 'AWESOME',
        type: ['Motion Design'],
        tools: ['Illustrator','After Effects'],
        description: 'This little GIF series was made in order to practice with tiny details in motion design. First imagined on paper then drawn in Illustrator, these letters were individually edited in After Effects to get an animation that you keep looking at to catch all the details.',
        logo: './img/work/tb_awesome.png',
        background: './img/work/bg_awesome.jpg',
        slideshow: [
            {
                tb: './img/work/tb_awesome-1.jpg',
                o: './img/work/fs_awesome-1.gif'
            },
            {
                tb: './img/work/tb_awesome-2.jpg',
                o: './img/work/fs_awesome-2.gif'
            },
            {
                tb: './img/work/tb_awesome-3.jpg',
                o: './img/work/fs_awesome-3.gif'
            },
            {
                tb: './img/work/tb_awesome-4.jpg',
                o: './img/work/fs_awesome-4.gif'
            },
            {
                tb: './img/work/tb_awesome-5.jpg',
                o: './img/work/fs_awesome-5.gif'
            },
            {
                tb: './img/work/tb_awesome-6.jpg',
                o: './img/work/fs_awesome-6.gif'
            },
            {
                tb: './img/work/tb_awesome-7.jpg',
                o: './img/work/fs_awesome-7.gif'
            },
            
        ]
    },
    { // Covers
        name: 'Dissonant Covers',
        type: ['Design','Typography'],
        tools: ['Cinema 4D','Photoshop','Illustrator'],
        description: 'Here are some covers I have made, commissioned or for practice.<br><br>'+
        '<span class="font__title">Commerce.:</span> Commerce., an electronic music artist, commissioned me to make a cover for his EP called "Primary Colours". He wanted something abstract, so I made a crazy shape in 3D and worked on it in Illustrator and Photoshop, giving it a used look to contrast with the cleanliness of the 3D shape.<br><br>'+
        '<span class="font__title">Ghosts n’ Stuff:</span> This is some typography practice, trying to make a music cover artwork using a Fraktur typeface. Since I thought the font looked like something you would find on a music sheet, I aimed at illustrating "Ghosts \'n\' Stuff" by deadmau5. The word "Ghosts" itself reminded me of Pac-Man, so I intertwinded my ideas, keeping the whole cohesive thanks to the font, which I reorganised to give it a more interesting structure.',
        logo: './img/work/tb_covers.png',
        background: './img/work/bg_covers.jpg',
        slideshow: [
            {
                tb: './img/work/tb_covers-commerce.jpg',
                o: './img/work/fs_covers-commerce.jpg'
            },
            {
                tb: './img/work/tb_covers-deadmau5.jpg',
                o: './img/work/fs_covers-deadmau5.jpg'
            }
        ]
    },
    { // Uncharted
        name: 'Uncharted: Drake\'s Fortune Wallpaper',
        type: ['Design'],
        tools: ['Photoshop'],
        description: 'This wallpaper was done back in 2007, for a competition held by Playstation Europe which I won. This led to my wallpaper being avaible on all European Playstation Stores for download. Being the youngest finalist, this project motivated me to pursue graphic design not as just a hobby, but also as a career.',
        logo: './img/work/tb_uncharted.png',
        background: './img/work/bg_uncharted.jpg',
        image: './img/work/fs_uncharted.jpg'
    }
];

/*
tough cookie : doute
awesome : vire sauf si tu présente come sur le behance chaque lettre (là ça aura le swagg)
casualty : garde
beauty : garde
chronoise : de la merde (garde)
istanbul : garde (hashtag la diversité)
no man's sky : doute

*/