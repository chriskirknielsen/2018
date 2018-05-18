var lang = {
        txtPrev: 'Précédent',
        txtNext: 'Suivant',
        txtClose: 'Fermer'
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
            name: 'Marketing Européen Super Mario Odyssey',
            type: ['Design','Motion','Intégration'],
            tools: ['Photoshop','After Effects','Google Web Designer'],
            description: 'Pour Nintendo of Europe, j\'ai travaillé avec Green Garden Digital afin de livrer plusieurs éléments pour la campagne promotionnelle européene de Super Mario Odyssey sur Nintendo Switch. J\'ai produit des fichiers maîtres pour une série de bannières et un habillage destructurant, partant de maquettes Photoshop préparées par des collègues.<br><br>Les bannières ont été réalisées avec Google Web Designer, et l\'habillage destructurant a été préparé dans Photoshop, animé dans After Effects, puis intégré en HTML/CSS.',
            logo: './img/work/tb_mario.png',
            background: './img/work/bg_mario.jpg',
            youtube: 'u0msoyr7Hyw'
        },
        { // Ratchet Galaxy
            name: 'Ratchet-Galaxy v3',
            type: ['Web Design','Intégration'],
            tools: ['Sketch','Illustrator','Brackets'],
            description:
            'Une refonte du site <a href="https://www.ratchet-galaxy.com" target="_blank"><span>Ratchet-Galaxy.com</span></a> était nécessaire depuis longtemps. J\'ai suivi ce projet depuis sa génèse en 2005, et en ai créé son fameux logo. J\'ai eu l\'opportunité de pousser ceci plus loin en 2017, en renouvellant toute l\'identité visuelle du site, en m\'inspirant des récents jeux vidéo Ratchet &amp; Clank. Cette refonte a été fait avec un aspect plus moderne et une interface plus modulable, adaptée à toutes les résolutions.<br><br>Toutes les pages ont été maquettées dans Sketch, les icônes dessinées dans Illustrator et l\'intégration a été réalisée dans Brackets, en utilisant SASS comme pré-processeur de CSS.<br><br>J\'ai également mis à jour la police d\'écriture "Future" (basée sur le logo du jeu), redessinant chaque caractère dans Illustrator, étandant la version initiale pour faire des versions standard et italique.',
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
                },
                {
                    tb: './img/work/tb_rgv3-5.jpg',
                    o: './img/work/fs_rgv3-5.jpg'
                }
            ]
        },
        { // Nike CR7
            name: 'CR7 Mercurial Superfly',
            type: ['Web Design'],
            tools: ['Photoshop','After Effects','Brackets'],
            description: 'Pour le lancement d\'une nouvelle paire de chaussures Nike, la Mercurial Superfly, Green Garden et moi avons créé un e-corner pour ce produit centré autour de Cristiano Ronaldo. Basé sur des éléments statiques, j\'ai réalisé de légères animations sous After Effects et les ai implémentées dans une interface responsive pour FootCenter.<br><br><a href="https://www.footcenter.fr/cr7-chapter3-discovery" target="_blank" rel="noopener"><span>Voir le e-corner sur FootCenter.fr</span></a>.',
            logo: './img/work/tb_nike.png',
            background: './img/work/bg_nike.jpg',
            youtube: 'Farr2gs1bMc'
        },
        { // Dreadnought
            name: 'Éléments de marketing Dreadnought',
            type: ['Motion','Design','Intégration'],
            tools: ['Photoshop','After Effects','Brackets'],
            description: 'En collaboration avec Green Garden, j\'ai travaillé sur plusieurs éléments pour la promotion du jeu vidéo Dreadnought, centrée autour d\'une séquence cinématique. Ceci inclus une série de bannières, un habillage destructurant, ainsi que des publications Facebook disruptives, pour les marchées européens et américains.<br><br>Après avoir décidé de la direction de l\'habillage destructurant, les bannières et publications disruptives ont été créées en suivant la même idée, afin d\'obtenir une campagne cohérente à travers toutes les plateformes.',
            logo: './img/work/tb_dreadnought.png',
            background: './img/work/bg_dreadnought.jpg',
            youtube: 'BCmG6qN_t7Y'
        },
        { // PlayStation
            name: 'PlayStation: an illustration project',
            type: ['Illustration'],
            tools: ['Illustrator'],
            description: 'Ma première console de salon était une PlayStation en 1997. On peut dire que je suis devenu un vrai fan de PlayStation depuis. J\'ai eu besoin d\'illustration vectorielles des différentes consoles PlayStation pour un projet personnel, alors je me suis décidé à les réaliser par moi-même.',
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
            type: ['Design','Intégration'],
            tools: ['Photoshop','Premiere Pro','Brackets'],
            description: 'Pour la campagne promotionnelle de la sortie cinéma de Hardcore Henry, j\'ai eu pour tâche de créer une bannière engageante avec les utilisateurs. J\'ai découpé des séquences tirées des bande-annonces du film pour en faire un "Quick Time Event" interactif, où les choix de l\'utilisateur illustrent différents aspects de ce film inspiré des jeux <acronym title="First Person Shooter">FPS</acronym>. Un compteur a été mis en place afin que les utilisateurs les plus rapides puissent participer à un concours pour remporter une GoPro.',
            logo: './img/work/tb_hardcorehenry.png',
            background: './img/work/bg_hardcorehenry.jpg',
            youtube: 'vQa7cGklQYs'
        },
        { // Dexter
            name: 'Intro Minimaliste Dexter',
            type: ['Motion Design'],
            tools: ['After Effects'],
            description: 'Une vidéo d\'introduction pour la série Dexter de la chaîne Showtime. L\'idée était de créer une courte vidéo sous After Effects, avec des formes simples animées de manière propre et fluide. J\'ai raccourci la musique et ai tenté de rappeler des éléments clés de la série avec des formes géométriques.<br><br>Dexter est une série TV de Showtime que j\'ai beaucoup appréciée. Basée sur le livre de Jeff Lindsay "Dearly Disturbed Dexter", qui en a écrit plusieurs depuis, Dexter est un de mes favoris.',
            logo: './img/work/tb_dexter.png',
            background: './img/work/bg_dexter.jpg',
            youtube: 'LNAa26l4ugU'
        },
        { // Posters
            name: 'Unrelated Posters',
            type: ['Design','Typography'],
            tools: ['Photoshop','Illustrator'],
            description: 'Voici une poignée d\'affiches réalisées dans le but de m\'exercer.<br><br><span class="font--title">Houston :</span> Ceci est une affiche typographique avec différents niveaux de lecture menant à une célèbre citation.<br><br><span class="font--title">1984 :</span> Également un projet typographique, ceci est supposé être une couverture de livre mais fonctionne également comme affiche, évoquant la censure, qui est un thème majeur du livre.<br><br><span class="font--title">Björk :</span> This poster is an excercise to play with low-poly vector art. Each triangle was individually drawn (reference photo used).',
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
            name: 'Animations de Lettres',
            type: ['Motion Design'],
            tools: ['Illustrator','After Effects'],
            description: 'Cette petite série de GIFs a été réalisée afin de m\'entraîner en motion design sur des minuscules détails. D\'abord imaginées sur papier puis dessinées sur Illustrator, ces lettres ont été individuellement éditées sur After Effects pour obtenir des animations que l\'on regarde plusieurs fois pour en capturer tous les détails.',
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
            description: 'Voici des jaquettes que j\'ai réalisées, commandées ou pour l\'exercice.<br><br><span class="font--title">Commerce. :</span> Commerce., un artiste de musique électronique, m\'a demandé de réaliser une jaquette pour son E.P. "Primary Colours". Il souhaite quelque chose d\'abstrait, j\'ai donc réalisé une forme biscornue en 3D et l\'ai travaillée dans Illustrator et Photoshop, lui donnant un aspect usé pour contraster avec la propreté de la forme 3D.<br><br><span class="font--title">Ghosts n’ Stuff :</span> Ceci est un exercice typographique où j\'ai tenté de réaliser une jaquette en utilisant une police d\'écriture de type Fraktur. Puisque je trouvais que la police ressemblait à des formes que l\'on trouve sur une portée de musique, j\'ai voulu illustrer "Ghosts \'n\' Stuff" par deadmau5. Le mot "Ghosts" m\'a rappelé of Pac-Man, j\'ai donc fusionné mes idées, en conservant la cohésion globale grâce à la police, que j\'ai réorganisée pour lui donner une structure plus intéressante.',
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
            name: 'Identité Chronoise',
            type: ['Logotype'],
            tools: ['Illustrator'],
            description: 'Chronoise est mon pseudonyme pour un projet personnel démarré en 2010, avant quoi je me suis découvert un intérêt grandissant pour la musique électronique. J\'ai appros de manière autonome comment créer de la musique sur mon ordinateur et ai depuis écrit de nombreuses mélodies, et sorti plusieurs morceaux. Ceci a créé un besoin pour moi d\'avoir une identité visuelle, qui a été ajustée et perfectionnée au fil des années. La géométrie est simple et la palette de couleurs évoque une atmosphère sub-aquatique, puisque créer cette musique me transporte ailleurs, me mettant dans un état d\'esprit calme.<br><br>Écouter de la musique sur <a href="https://chronoise.com" target="_blank" rel="noopener"><span>Chronoise.com</span></a>, <a href="https://chronoise.bandcamp.com" target="_blank" rel="noopener" title="Chronoise on Bandcamp"><span>Bandcamp</span></a>, et <a href="https://soundcloud.com/chronoise" target="_blank" rel="noopener" title="Chronoise on SoundCloud"><span>SoundCloud</span></a>.',
            logo: './img/work/tb_chronoise.png',
            background: './img/work/bg_chronoise.jpg',
            image: './img/work/fs_chronoise.jpg'
        },
        { // Uncharted
            name: 'Fond d\'écran Uncharted: Drake\'s Fortune',
            type: ['Design'],
            tools: ['Photoshop'],
            description: 'Ceci est un fond d\'écran réalisé pour un concours organisé par Playstation Europe que j\'ai remporté. Suite à ceci, mon illustration a été rendue disponible au téléchargement sur tous les magasins en ligne PlayStation Store européens. Étant le finaliste le plus jeune, ce projet m\'a motivé à poursuivre le graphisme comme carrière, et non pas comme simple passe-temps.',
            logo: './img/work/tb_uncharted.png',
            background: './img/work/bg_uncharted.jpg',
            image: './img/work/fs_uncharted.jpg'
        }
    ];