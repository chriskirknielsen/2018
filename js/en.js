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
    
    {
        name: 'Nintendo Classic Mini: NES Dynamic Takeover',
        type: ['Design','Motion','Integration'],
        tools: ['Photoshop','After Effects','Brackets'],
        description: 'For Nintendo of Europe, I worked with Green Garden Digital to create a dynamic takeover. The idea was to capture the retro atmosphere, which I love, making this a delightful project to work on. Mockups were prepared in Photoshop and the animation was made in After Effects. Integration was coded in Brackets.',
        logo: './img/work/tb_minines.png',
        background: './img/work/bg_minines.jpg',
        image: './img/work/bg_minines.jpg'
    },
    {
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
    {
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
    {
        name: 'Minimalist Dexter Intro',
        type: ['Motion Design'],
        tools: ['After Effects'],
        description:
        'An intro video for the TV show Dexter on Showtime. The idea was to create a short video with After Effects, with simple shapes, while making a clean and smooth animation. I cut the music to make it shorter and tried to remind of key elements of the show with simple geometric shapes.'+
        '<br><br>'+
        'Dexter is a TV show on Showtime that I really liked. Based on Jeff Lindsay\'s book "Dearly Disturbed Dexter", who has since written many more, Dexter is a personal favourite.',
        logo: './img/work/tb_dexter.png',
        background: './img/work/bg_dexter.jpg',
        youtube: 'LNAa26l4ugU'
    },
    {
        name: 'Uncharted: Drake\'s Fortune Wallpaper',
        type: ['Design'],
        tools: ['Photoshop'],
        description: 'This wallpaper was done when I was 14 years old, for a competition held by Playstation Europe which I won. This led to my wallpaper being avaible on all European Playstation Stores for download. Being the youngest finalist, this project motivated me to pursue graphic design studies.',
        logo: './img/work/tb_uncharted.png',
        background: './img/work/bg_uncharted.jpg',
        image: './img/work/fs_uncharted.jpg'
    },
    {
        name: 'Nintendo Classic Mini: NES Dynamic Takeover',
        type: ['Design','Motion','Integration'],
        tools: ['Photoshop','After Effects','Brackets'],
        description: 'For Nintendo of Europe, I worked with Green Garden Digital to create a dynamic takeover. The idea was to capture the retro atmosphere, which I love, making this a delightful project to work on. Mockups were prepared in Photoshop and the animation was made in After Effects. Integration was coded in Brackets.',
        logo: './img/work/tb_minines.png',
        background: './img/work/bg_minines.jpg',
        image: './img/work/bg_minines.jpg'
    },
    {
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
    {
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
    {
        name: 'Minimalist Dexter Intro',
        type: ['Motion Design'],
        tools: ['After Effects'],
        description:
        'An intro video for the TV show Dexter on Showtime. The idea was to create a short video with After Effects, with simple shapes, while making a clean and smooth animation. I cut the music to make it shorter and tried to remind of key elements of the show with simple geometric shapes.'+
        '<br><br>'+
        'Dexter is a TV show on Showtime that I really liked. Based on Jeff Lindsay\'s book "Dearly Disturbed Dexter", who has since written many more, Dexter is a personal favourite.',
        logo: './img/work/tb_dexter.png',
        background: './img/work/bg_dexter.jpg',
        youtube: 'LNAa26l4ugU'
    },
    {
        name: 'Uncharted: Drake\'s Fortune Wallpaper',
        type: ['Design'],
        tools: ['Photoshop'],
        description: 'This wallpaper was done when I was 14 years old, for a competition held by Playstation Europe which I won. This led to my wallpaper being avaible on all European Playstation Stores for download. Being the youngest finalist, this project motivated me to pursue graphic design studies.',
        logo: './img/work/tb_uncharted.png',
        background: './img/work/bg_uncharted.jpg',
        image: './img/work/fs_uncharted.jpg'
    },
    {
        name: 'Nintendo Classic Mini: NES Dynamic Takeover',
        type: ['Design','Motion','Integration'],
        tools: ['Photoshop','After Effects','Brackets'],
        description: 'For Nintendo of Europe, I worked with Green Garden Digital to create a dynamic takeover. The idea was to capture the retro atmosphere, which I love, making this a delightful project to work on. Mockups were prepared in Photoshop and the animation was made in After Effects. Integration was coded in Brackets.',
        logo: './img/work/tb_minines.png',
        background: './img/work/bg_minines.jpg',
        image: './img/work/bg_minines.jpg'
    },
    {
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
    }
];

/*
//manettes : garde
tough cookie : doute
awesome : vire sauf si tu présente come sur le behance chaque lettre (là ça aura le swagg)
casualty : garde
uncharted : doute
houston : garde
//dexter : garde
beauty : garde
sims 4 : doute
bjork : doute
bioshock : vire
ghosts n stuff : garde si tu ajoute toutes les couvs que t'as faite réunies sous une partie "couv"
chronoise : de la merde (garde)
commerce : voir ghost n stuff
drive : vire
istanbul : garde (hashtag la diversité)
no man's sky : doute
1984 : doute, fusionner avec houston et bjork peut être ?

*/