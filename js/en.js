var lang = {
        txtPrev: 'Previous',
        txtNext: 'Next',
        txtClose: 'Close'
    },
    projects = [
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
            name: 'Super Mario Odyssey European Marketing',
            type: ['Design','Motion','Integration'],
            tools: ['Photoshop','After Effects','Google Web Designer'],
            description: 'For Nintendo of Europe, I worked with Green Garden Digital to deliver multiple assets for the European marketing campaign of Super Mario Odyssey on the Nintendo Switch. I produced master files for a set of banners and a dynamic takeover, starting from Photoshop mockups made by co-workers.<br><br>The banners were built in Google Web Designer, and the dynamic takeover was prepared in Photoshop, then built in After Effects, and integrated in HTML/CSS.',
            logo: './img/work/tb_mario.png',
            background: './img/work/bg_mario.jpg',
            youtube: 'u0msoyr7Hyw'
        },
        { // Ratchet Galaxy
            name: 'Ratchet-Galaxy v3',
            type: ['Web Design','Integration'],
            tools: ['Sketch','Illustrator','Brackets'],
            description:
                'A redesign for the website <a href="https://www.ratchet-galaxy.com" target="_blank">Ratchet-Galaxy.com</a> was longtime overdue. I have been close to this project since its genesis in 2005, creating its now-standard logo. I was able to take it further in 2017 by renewing the entire visual identity of the website, drawing inspiration from the recent Ratchet &amp; Clank games. The design was redone for a more modern aspect and more modulable layout, with responsiveness in mind.<br><br>All the pages were mocked up in Sketch, while the icons were drawn in Illustrator, and the integration was done in Brackets, using SASS as a pre-processor for CSS.',
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
                },
                {
                    tb: './img/work/tb_rgv3-4.jpg',
                    o: './img/work/fs_rgv3-4.jpg'
                }
            ]
        },
        { // Nike CR7
            name: 'CR7 Mercurial Superfly',
            type: ['Web Design'],
            tools: ['Photoshop','After Effects','Brackets'],
            description: 'For the launch of a Nike shoe, the Mercurial Superfly, Green Garden and I created an e-corner for the product centered around Cristiano Ronaldo. Based on static assets, I created light animations in After Effects and implemented them in a responsive layout for FootCenter.<br><br><a href="https://www.footcenter.fr/cr7-chapter3-discovery" target="_blank" rel="noopener">View e-corner page on FootCenter.fr</a>.',
            logo: './img/work/tb_nike.png',
            background: './img/work/bg_nike.jpg',
            youtube: 'Farr2gs1bMc'
        },
        { // Dreadnought
            name: 'Dreadnought Marketing Assets',
            type: ['Motion','Design','Integration'],
            tools: ['Photoshop','After Effects','Brackets'],
            description:
            'In collaboration with Green Garden, I worked on several assets used for the promotion of the video game Dreadnought, focused on a cinematic sequence. This includes a set of banners, a dynamic takeover, as well as Facebook disruptive posts, for both European and North American markets.<br><br>After settling on the Dynamic Takeover\'s direction, the banners and disruptive posts were created using the same idea, in order to have a cohesive campaign across all platforms.',
            logo: './img/work/tb_dreadnought.png',
            background: './img/work/bg_dreadnought.jpg',
            youtube: 'BCmG6qN_t7Y'
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
        { // Hardcore Henry
            name: 'Hardcore Henry',
            type: ['Design','Integration'],
            tools: ['Photoshop','Premiere Pro','Brackets'],
            description:
            'For the French marketing campaign of Hardcore Henry\'s theatrical release, I was tasked with Green Garden to make a banner that would engage users. I cut up several clips taken from the movie trailers to create an interactive "Quick Time Event" game, where the user\'s choices would show different aspects of this <acronym title="First Person Shooter">FPS</acronym>-inspired film. A timer was integrated so the quickest users could enroll to win a GoPro.',
            logo: './img/work/tb_hardcorehenry.png',
            background: './img/work/bg_hardcorehenry.jpg',
            youtube: 'vQa7cGklQYs'
        },
        { // Dexter
            name: 'Minimalist Dexter Intro',
            type: ['Motion Design'],
            tools: ['After Effects'],
            description:
            'An intro video for the TV show Dexter on Showtime. The idea was to create a short video with After Effects, with simple shapes, while making a clean and smooth animation. I cut the music to make it shorter and tried to remind of key elements of the show with simple geometric shapes.<br><br>Dexter is a TV show on Showtime that I really liked. Based on Jeff Lindsay\'s book "Dearly Disturbed Dexter", who has since written many more, Dexter is a personal favourite.',
            logo: './img/work/tb_dexter.png',
            background: './img/work/bg_dexter.jpg',
            youtube: 'LNAa26l4ugU'
        },
        { // Posters
            name: 'Unrelated Posters',
            type: ['Design','Typography'],
            tools: ['Photoshop','Illustrator'],
            description: 'Here is a handful of posters I\'ve made for practice purposes (these were not commissioned).<br><br><span class="font__title">Houston:</span> This is a typography-oriented project with layers of text leading to a famous quote.<br><br><span class="font__title">1984:</span> Also typography-oriented, this was meant to be a book cover but also works in it own right as a poster, playing with the notion of censorship which is a main theme of the book.<br><br><span class="font__title">Björk:</span> This poster is an excercise to play with low-poly vector art. Each triangle was individually drawn (reference photo used).',
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
            name: 'Letter Animations',
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
                }
            ]
        },
        { // Covers
            name: 'Dissonant Covers',
            type: ['Design','Typography'],
            tools: ['Cinema 4D','Photoshop','Illustrator'],
            description: 'Here are some covers I have made, commissioned or for practice.<br><br><span class="font__title">Commerce.:</span> Commerce., an electronic music artist, commissioned me to make a cover for his EP called "Primary Colours". He wanted something abstract, so I made a crazy shape in 3D and worked on it in Illustrator and Photoshop, giving it a used look to contrast with the cleanliness of the 3D shape.<br><br><span class="font__title">Ghosts n’ Stuff:</span> This is some typography practice, trying to make a music cover artwork using a Fraktur typeface. Since I thought the font looked like something you would find on a music sheet, I aimed at illustrating "Ghosts \'n\' Stuff" by deadmau5. The word "Ghosts" itself reminded me of Pac-Man, so I intertwinded my ideas, keeping the whole cohesive thanks to the font, which I reorganised to give it a more interesting structure.',
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
        { // Chronoise
            name: 'Chronoise Identity',
            type: ['Logotype'],
            tools: ['Illustrator'],
            description: 'Chronoise is my moniker for a personal project started in 2010, prior to which I developped a growing interest for electronic music. I taught myself how to create electronica on my computer and have since then written many melodies and released tracks. This spawned a need for a visual identity, that has been adjusted and perfected over time. The geometry is simple, and the colour palette evoques an underwater atmosphere, as making this music transports me somewhere else, bringing a relaxing state of mind.<br><br>Listen to music on <a href="https://chronoise.com" target="_blank" rel="noopener">Chronoise.com</a>, <a href="https://chronoise.bandcamp.com" target="_blank" rel="noopener" title="Chronoise on Bandcamp">Bandcamp</a>, and <a href="https://soundcloud.com/chronoise" target="_blank" rel="noopener" title="Chronoise on SoundCloud">SoundCloud</a>.',
            logo: './img/work/tb_chronoise.png',
            background: './img/work/bg_chronoise.jpg',
            image: './img/work/fs_chronoise.jpg'
        },
        { // Uncharted
            name: 'Uncharted: Drake\'s Fortune Wallpaper',
            type: ['Design'],
            tools: ['Photoshop'],
            description: 'This wallpaper was created for a competition held by Playstation Europe which I won. This led to my entry being avaible on all European Playstation Stores for download. Being the youngest finalist, this project motivated me to pursue graphic design not as just a hobby, but also as a career.',
            logo: './img/work/tb_uncharted.png',
            background: './img/work/bg_uncharted.jpg',
            image: './img/work/fs_uncharted.jpg'
        }
    ];