// ✦ The Arcane Archive — edit this file to add, change or remove titles.
// realm: "written" | "inked" | "animated" | "wisdom" | "scroll"
// status: "Completed" | "Reading" | "Watching" | "Plan to Read"
// cover: optional image URL. Without one, a glowing arcane cover is generated.
// highlight: set to a personal quote to feature it in "Stories That Stayed With Me".

export type Realm = "written" | "inked" | "animated" | "wisdom" | "scroll";
export type Status = "Completed" | "Reading" | "Watching" | "Plan to Read";

export interface Entry {
  id: string;
  title: string;
  creator: string;
  type: string;
  realm: Realm;
  status: Status;
  rating: number; // 0–10
  genres: string[];
  synopsis: string;
  notes: string;
  cover?: string;
  highlight?: string;
}

export const realms: { id: Realm; name: string; desc: string; glyph: string; mosaic?: string[] }[] =
  [
    { id: "written", name: "Written", desc: "Books & novels", glyph: "ᚱ" },
    { id: "inked", name: "Inked", desc: "Manga & manhwa", glyph: "ᛟ" },
    { id: "animated", name: "Animated", desc: "Anime", glyph: "ᛉ" },
    {
      id: "wisdom",
      name: "Wisdom",
      desc: "Philosophy",
      glyph: "ᛞ",
    },
    { id: "scroll", name: "Endless Scroll", desc: "Web novels", glyph: "ᛜ" },
  ];

export const collection: Entry[] = [
  {
    id: "solo-leveling",
    title: "Solo Leveling",
    creator: "Chugong",
    type: "Manhwa",
    realm: "inked",
    status: "Completed",
    rating: 10,
    genres: ["Action", "Fantasy"],
    synopsis:
      "The weakest hunter of all mankind gains a mysterious System that lets him level up without limit.",
    notes: "The shadow army reveal still gives me chills.",
    highlight: "Arise. Some stories don't just entertain — they awaken something.",
    cover:
      "https://rukminim3.flixcart.com/image/480/640/xif0q/book/c/v/f/solo-leveling-vol-14-comic-original-imahrkjvczejzagj.jpeg?q=90",
  },
  {
    id: "omniscient-reader",
    title: "Omniscient Reader's Viewpoint",
    creator: "Sing Shong",
    type: "Manhwa",
    realm: "inked",
    status: "Reading",
    rating: 10,
    genres: ["Fantasy", "Action"],
    synopsis: "The only reader of a web novel finds himself living inside its apocalyptic story.",
    notes: "A love letter to readers. Meta in the best way.",
    highlight: "For the reader who stayed until the very end.",
    cover: "https://images.mangabaka.dev/f/5/5/3/0/2/5/5/7ed0/437d/92ca/d4ddc297da85",
  },
  {
    id: "attack-on-titan",
    title: "Attack on Titan",
    creator: "Wit / MAPPA",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 9,
    genres: ["Dark Fantasy", "Action"],
    synopsis: "Humanity fights for survival against giant man-eating Titans behind enormous walls.",
    notes: "The plot twists rewired my brain.",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-buvcRTBx4NSm.jpg",
  },
  {
    id: "vinland-saga",
    title: "Vinland Saga",
    creator: "Wit / MAPPA",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 9,
    genres: ["Drama", "Action"],
    synopsis: "A young Viking seeks revenge, then searches for a land without war.",
    notes: "Season 2 is a masterpiece of growth.",
    cover:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101348-2fhDFPCuMNiz.jpg",
  },

  // ✦ My watched anime list
  {
    id: "black-clover",
    title: "Black Clover",
    creator: "Pierrot",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 0,
    genres: ["Action", "Fantasy"],
    synopsis:
      "Asta, a boy born without magic, wields anti-magic to chase his dream of becoming the Wizard King.",
    notes: "Pure shonen hype — never count out the underdog.",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx97940-fyh8o7gNbha0.png",
  },
  {
    id: "bleach",
    title: "Bleach",
    creator: "Pierrot",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 10,
    genres: ["Action", "Fantasy"],
    synopsis:
      "Ichigo Kurosaki gains the power of a Soul Reaper and defends the living world from Hollows.",
    notes: "One of my all-time favourites. The Soul Society arc is untouchable.",
    highlight: "Bankai! The story that taught me style, loyalty and soul.",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx269-d2GmRkJbMopq.png",
  },
  {
    id: "blue-lock",
    title: "Blue Lock",
    creator: "8bit",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 0,
    genres: ["Sports", "Thriller"],
    synopsis:
      "Japan gathers its most egotistical strikers in a brutal program to create the world's greatest goal scorer.",
    notes: "Egoism done right — every match feels like a final.",
    cover:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx137822-U8naszP96vzC.png",
  },
  {
    id: "blue-spring-ride",
    title: "Blue Spring Ride",
    creator: "A-1 Pictures",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 0,
    genres: ["Romance", "Drama"],
    synopsis:
      "Io Sakura reconnects with her first crush, Futaba Yoshioka, years after they drifted apart.",
    notes: "A gentle, bittersweet first-love story.",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20596-fJdMHV8xRMgY.png",
  },
  {
    id: "boruto",
    title: "Boruto",
    creator: "Pierrot",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 0,
    genres: ["Action", "Adventure"],
    synopsis: "Naruto's son walks his own path as a ninja in a village now at peace.",
    notes: "A new generation carrying the old torch.",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21220-3cWAUtR1Ih5h.jpg",
  },
  {
    id: "classroom-of-the-elite",
    title: "Classroom of the Elite",
    creator: "Lerche",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 0,
    genres: ["Thriller", "Drama"],
    synopsis:
      "At a prestigious school that ranks its students, Ayanokoji quietly manipulates the game behind the scenes.",
    notes: "Never trust a calm smile.",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx98659-WNyPLIZDpGGY.jpg",
  },
  {
    id: "death-note",
    title: "Death Note",
    creator: "Madhouse",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 0,
    genres: ["Thriller", "Mystery"],
    synopsis: "A high schooler finds a notebook that kills anyone whose name is written inside it.",
    notes: "The cat-and-mouse duel that defined a generation.",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1535-kUgkcrfOrkUM.jpg",
  },
  {
    id: "demon-slayer",
    title: "Demon Slayer",
    creator: "ufotable",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 0,
    genres: ["Action", "Fantasy"],
    synopsis: "Tanjiro joins the Demon Slayer Corps to cure his sister and avenge his family.",
    notes: "ufotable makes every frame a painting.",
    cover:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-WBsBl0ClmgYL.jpg",
  },
  {
    id: "dr-stone",
    title: "Dr. Stone",
    creator: "TMS Entertainment",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 0,
    genres: ["Sci-Fi", "Adventure"],
    synopsis:
      "A genius student rebuilds civilization from scratch after thousands of years of petrification.",
    notes: "Science is the coolest magic system.",
    cover:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx105333-GybuoSoOZfpH.jpg",
  },
  {
    id: "the-eminence-in-shadow",
    title: "The Eminence in Shadow",
    creator: "Nexus",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 0,
    genres: ["Action", "Comedy"],
    synopsis:
      "A boy dedicates himself to becoming the shadowy mastermind behind a secret war against an evil cult.",
    notes: "Ridiculously fun — shadow-genius energy.",
    cover:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx130298-YMdcKHytpWNH.jpg",
  },
  {
    id: "fire-force",
    title: "Fire Force",
    creator: "David Production",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 0,
    genres: ["Action", "Sci-Fi"],
    synopsis:
      "Firefighters with pyrokinetic abilities battle spontaneous human combustion across Tokyo.",
    notes: "Stylish action with a killer soundtrack.",
    cover:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx105310-2PKUvoaA6fTn.jpg",
  },
  {
    id: "from-me-to-you",
    title: "From Me to You",
    creator: "Production I.G",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 0,
    genres: ["Romance", "Drama"],
    synopsis:
      "Shouta Kazehaya and Sawako Kuronuma's quiet friendship slowly blooms into first love.",
    notes: "Wholesome before wholesome was a trend.",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx6045-JujXjoWtslUM.jpg",
  },
  {
    id: "the-god-of-high-school",
    title: "The God of High School",
    creator: "MAPPA",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 0,
    genres: ["Action", "Fantasy"],
    synopsis:
      "Martial artists compete in a global tournament that hides world-shaking supernatural powers.",
    notes: "The animation goes unbelievably hard.",
    cover:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx116006-Wt8JSA1ZQxlM.png",
  },
  {
    id: "golden-time",
    title: "Golden Time",
    creator: "J.C.Staff",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 0,
    genres: ["Romance", "Drama"],
    synopsis:
      "Tada Banri, who lost his memories in an accident, navigates love and identity in college.",
    notes: "A romance that actually respects its past.",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx17895-M8yjOyMxHf5X.jpg",
  },
  {
    id: "haikyu",
    title: "Haikyu!!",
    creator: "Production I.G",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 0,
    genres: ["Sports"],
    synopsis:
      "Short but fierce, Hinata aims to turn the weakened Karasuno High volleyball team into legends.",
    notes: "Every rally had me on the edge of my seat.",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20464-ooZUyBe4ptp9.png",
  },
  {
    id: "higehiro",
    title: "Higehiro: After Being Rejected, I Shaved and Took in a High School Runaway",
    creator: "Project No.9",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 0,
    genres: ["Drama", "Slice of Life"],
    synopsis:
      "After a rejection, a young man takes in a runaway high schooler — and both begin to heal.",
    notes: "Quiet, careful and surprisingly mature.",
    cover:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx114232-2rm50ZD1cQgP.jpg",
  },
  {
    id: "hells-paradise",
    title: "Hell's Paradise",
    creator: "MAPPA",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 0,
    genres: ["Action", "Dark Fantasy"],
    synopsis:
      "Condemned criminals search a mysterious island for the elixir of life, guarded by monstrous beings.",
    notes: "Dark, beautiful and brutal in equal measure.",
    cover:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx128893-Gc2t8b8M0mVu.jpg",
  },
  {
    id: "horimiya",
    title: "Horimiya",
    creator: "CloverWorks",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 0,
    genres: ["Romance", "Comedy"],
    synopsis: "Two classmates discover each other's hidden sides and fall for who they really are.",
    notes: "One of the most natural romances out there.",
    cover:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx124080-3i22mRVPBS0T.jpg",
  },
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    creator: "MAPPA",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 0,
    genres: ["Action", "Dark Fantasy"],
    synopsis:
      "Yuji Itadori swallows a cursed finger and becomes the vessel for the King of Curses.",
    notes: "Cursed energy never looked this good.",
    cover:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-LHBAeoZDIsnF.jpg",
  },
  {
    id: "lovely-complex",
    title: "Lovely Complex",
    creator: "TMS Entertainment",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 0,
    genres: ["Romance", "Comedy"],
    synopsis: "Tall Koaki and short Otani bicker their way from comedy duo to unexpected romance.",
    notes: "Still one of the funniest rom-coms.",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx2034-erjg6gzDetAp.png",
  },
  {
    id: "mashle",
    title: "Mashle: Magic and Muscles",
    creator: "A-1 Pictures",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 0,
    genres: ["Action", "Comedy"],
    synopsis: "In a world of magic, Mashle relies on pure muscle to become a Divine Visionary.",
    notes: "Absurd, hilarious and oddly wholesome.",
    cover:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx151801-XxVf22Le6C8o.png",
  },
  {
    id: "tonari-no-seki-kun",
    title: "Tonari no Seki-kun: The Master of Killing Time",
    creator: "Shin-Ei Animation",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 0,
    genres: ["Comedy", "Slice of Life"],
    synopsis:
      "Rumi Yokoi can't pay attention in class because her neighbour Seki runs increasingly elaborate hobbies under his desk — and somehow never gets caught.",
    notes: "Seven-minute episodes of pure, cozy distraction.",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20600-d7QD2EDRe20U.png",
  },
  {
    id: "my-hero-academia",
    title: "My Hero Academia",
    creator: "Bones",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 0,
    genres: ["Action", "Superhero"],
    synopsis:
      "Born quirkless, Izuku Midoriya inherits the power of All Might and strives to become a hero.",
    notes: "Plus ultra — a modern shonen staple.",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21459-nYh85uj2Fuwr.jpg",
  },
  {
    id: "naruto",
    title: "Naruto",
    creator: "Pierrot",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 10,
    genres: ["Action", "Adventure"],
    synopsis:
      "A lonely young ninja seeks recognition from his village and dreams of becoming the Hokage.",
    notes: "The first anime that ever made me cry. Will of fire forever.",
    highlight: "Believe it — the will of fire still burns in me.",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20-dE6UHbFFg1A5.jpg",
  },
  {
    id: "one-piece",
    title: "One Piece",
    creator: "Toei Animation",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 10,
    genres: ["Action", "Adventure"],
    synopsis:
      "Monkey D. Luffy sails the Grand Line with his crew in search of the legendary One Piece and the title of Pirate King.",
    notes:
      "My number one. Hundreds of episodes and it still feels like setting sail for the first time.",
    highlight: "For the crew that feels like home — the adventure never ends.",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21-ELSYx3yMPcKM.jpg",
  },
  {
    id: "that-time-i-got-reincarnated-as-a-slime",
    title: "That Time I Got Reincarnated as a Slime",
    creator: "Eight Bit",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 0,
    genres: ["Fantasy", "Isekai"],
    synopsis: "Satoru Mikami reincarnates as a slime monster and builds a nation of monsters.",
    notes: "Chill overpowered-protagonist comfort watch.",
    cover:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101280-tDxCVJm714nt.jpg",
  },
  {
    id: "the-rising-of-the-shield-hero",
    title: "The Rising of the Shield Hero",
    creator: "Kinema Citrus",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 0,
    genres: ["Fantasy", "Adventure"],
    synopsis: "Naofumi, the weakest of the four cardinal heroes, must rise after being betrayed.",
    notes: "Rage fuelled the best kind of character growth.",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx99263-LcazQwdlWzMy.jpg",
  },
  {
    id: "shikimoris-not-just-a-cutie",
    title: "Shikimori's Not Just a Cutie",
    creator: "Doga Kobo",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 0,
    genres: ["Romance", "Slice of Life"],
    synopsis:
      "Micchi adores Shikimori, the seemingly perfect girlfriend who hides her own clumsy charms.",
    notes: "Soft, sweet and easy on the eyes.",
    cover:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127911-qfJDzUt0qCna.jpg",
  },
  {
    id: "solo-leveling-anime",
    title: "Solo Leveling (Anime)",
    creator: "A-1 Pictures",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 9,
    genres: ["Action", "Fantasy"],
    synopsis:
      "Sung Jinwoo, humanity's weakest hunter, levels up without limit after a double dungeon awakens the System.",
    notes: "Watched the anime too — the OST and animation bring the manhwa to life.",
    cover:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx151807-it355ZgzquUd.png",
  },
  {
    id: "kono-oto-tomare",
    title: "Kono Oto Tomare! (Sounds of Life)",
    creator: "Platinum Vision",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 0,
    genres: ["Music", "Slice of Life"],
    synopsis:
      "When delinquent Chika Kudo joins Tokise High School's lonely koto club — and prodigy Satowa Hozuki follows — a group of misfits discovers the beauty of the traditional koto.",
    notes: "The koto performances give genuine chills — a hidden music gem.",
    cover:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx103302-RVGwGRDGdMQq.jpg",
  },
  {
    id: "sword-art-online",
    title: "Sword Art Online",
    creator: "A-1 Pictures",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 0,
    genres: ["Action", "Sci-Fi"],
    synopsis:
      "Players trapped in a death game must clear one hundred floors to escape the virtual world of Aincrad.",
    notes: "The isekai/MMO wave that started it all.",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx11757-SxYDUzdr9rh2.jpg",
  },
  {
    id: "the-cafe-terrace-and-its-goddesses",
    title: "The Café Terrace and Its Goddesses",
    creator: "Tezuka Productions",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 0,
    genres: ["Comedy", "Romance"],
    synopsis:
      "Takaki inherits his grandfather's café, staffed by five mysterious goddess-like girls.",
    notes: "Chaotic, warm and way more fun than expected.",
    cover:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154412-bEMQkJWOStDR.jpg",
  },
  {
    id: "the-girl-i-liked-forgot-her-glasses",
    title: "The Girl I Like Forgot Her Glasses",
    creator: "GoHands",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 0,
    genres: ["Romance", "Comedy"],
    synopsis:
      "Mie forgets her glasses — and with them, the memories of the boy who quietly likes her.",
    notes: "Blurry, bokeh-filled cuteness overload.",
    cover:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx160188-4RvYLaru3vKj.jpg",
  },
  {
    id: "the-seven-deadly-sins",
    title: "The Seven Deadly Sins",
    creator: "A-1 Pictures / Studio DEEN",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 0,
    genres: ["Action", "Fantasy"],
    synopsis:
      "Princess Elizabeth sets out to find the legendary Seven Deadly Sins and save the kingdom from corruption.",
    notes: "Meliodas and Ban's brotherhood carried the whole show.",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20789-Ma5ouSYPkru9.jpg",
  },
  {
    id: "tokyo-revengers",
    title: "Tokyo Revengers",
    creator: "Liden Films",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 0,
    genres: ["Action", "Drama"],
    synopsis:
      "Takemichi travels back in time to save his ex and change the future of the Tokyo Manji Gang.",
    notes: "Time-travel meets gang drama — oddly addictive.",
    cover:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx120120-cWDmnmeEntSe.jpg",
  },
  {
    id: "your-lie-in-april",
    title: "Your Lie in April",
    creator: "A-1 Pictures",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 0,
    genres: ["Drama", "Music"],
    synopsis:
      "A former pianist's world brightens when a free-spirited violinist pulls him back into music.",
    notes: "Spring will come again… right in the feelings.",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20665-TLgkL8T8IRFd.png",
  },
  {
    id: "zom-100",
    title: "Zom 100: Bucket List of the Dead",
    creator: "BUG FILMS",
    type: "Anime",
    realm: "animated",
    status: "Completed",
    rating: 0,
    genres: ["Comedy", "Horror"],
    synopsis:
      "Instead of despair, a burned-out worker makes a bucket list as zombies rise around him.",
    notes: "A zombie show that's secretly about loving life.",
    cover:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx159831-cJUNqCqzuApc.png",
  },

  // ✦ My manhwa list
  {
    id: "the-beginning-after-the-end",
    title: "The Beginning After the End",
    creator: "REDICE Studio",
    type: "Manhwa",
    realm: "inked",
    status: "Reading",
    rating: 10,
    genres: ["Fantasy", "Adventure"],
    synopsis:
      "King Grey, the most powerful ruler of his world, is reborn into a realm of magic and monsters with a past he must atone for.",
    notes: "My favourite manhwa — the second-chance story done right.",
    highlight: "Every ending is a beginning after the end.",
    cover:
      "https://preview.redd.it/the-beginning-after-the-end-which-manhwa-does-everyone-like-v0-myvmfpxw55fg1.jpeg?auto=webp&s=fd8f2c121627ed25cb15072a9402a1044d68b6a0",
  },
  {
    id: "the-legendary-hero-is-an-academys-honored-student",
    title: "The Legendary Hero is an Academy's Honored Student",
    creator: "Unknown",
    type: "Manhwa",
    realm: "inked",
    status: "Reading",
    rating: 10,
    genres: ["Fantasy", "Action"],
    synopsis:
      "A student carries the honoured legacy of the world's legendary hero into a prestigious academy.",
    notes: "One of my favourites — the legacy twists keep me hooked.",
    highlight: "Legends don't end — they get inherited.",
    cover:
      "https://i.namu.wiki/i/gmwCFdC8Xej1Ieg9VHb6IutzYU365C_MzvHqj_Or2_qKwwlY8DF9GdlvbfLR2_nbJfEkMbI96flV5bA9V6hl9Q.webp",
  },
  {
    id: "the-legend-of-the-northern-blade",
    title: "The Legend of the Northern Blade",
    creator: "Wookjakga",
    type: "Manhwa",
    realm: "inked",
    status: "Completed",
    rating: 0,
    genres: ["Martial Arts", "Dark Fantasy"],
    synopsis:
      "After the fall of the Great Northern Clan, Jin Mu-Won secretly masters its secret martial arts to one day rebuild it.",
    notes: "Some of the best panel work in all of manhwa.",
    cover: "https://pbs.twimg.com/media/F6-VkuZXgAA_qgD?format=webp&name=large",
  },
  {
    id: "the-greatest-estate-developer",
    title: "The Greatest Estate Developer",
    creator: "Unknown",
    type: "Manhwa",
    realm: "inked",
    status: "Completed",
    rating: 0,
    genres: ["Fantasy", "Comedy"],
    synopsis:
      "A modern salaryman transmigrates into a fantasy novel's minor noble and uses his foreknowledge to develop his estate — and his power.",
    notes: "Comedy, cunning and construction — an underrated gem.",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs8JgWkCImzqc_G4vGvU-KC2jjLqnFWkScfhGqVQ_S9tyAlWWHMo0TV7MQ&s=10",
  },
  {
    id: "eleceed",
    title: "Eleceed",
    creator: "Son Jae-ho",
    type: "Manhwa",
    realm: "inked",
    status: "Reading",
    rating: 0,
    genres: ["Action", "Superhero"],
    synopsis:
      "Kayden, a top-tier awakener trapped in the body of a kitten, teams up with the kind-hearted Jiwoo, who secretly hunts wrongdoers with his incredible speed.",
    notes: "Wholesome on the surface, epic underneath.",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzR4CPyOhsQu_F-CkNWkZrPfRBsA4aPdi-7yXwLBoWJvAMtIXFXyXoBN8&s=10",
  },
  {
    id: "the-dark-mage-returns-to-enlistment",
    title: "The Dark Mage Returns to Enlistment",
    creator: "Unknown",
    type: "Manhwa",
    realm: "inked",
    status: "Completed",
    rating: 0,
    genres: ["Action", "Fantasy"],
    synopsis:
      "A legendary dark mage wakes ages later in a changed world and reenlists in the military to find his old companions.",
    notes: "Strong, unapologetic and easy to binge.",
    cover:
      "https://preview.redd.it/the-dark-mages-return-to-enlistment-are-there-any-missing-v0-k1mbgbrxyztf1.jpeg?auto=webp&s=e2ddeb654df8f4555a362b78d2d0d7ed9fe5ab60",
  },

  // ✦ My web novel list
  {
    id: "shadow-slave",
    title: "Shadow Slave",
    creator: "Guiltythree",
    type: "Web Novel",
    realm: "scroll",
    status: "Reading",
    rating: 0,
    genres: ["Fantasy", "Dark Fantasy"],
    synopsis:
      "A powerless young man is forced into a deadly test that binds him to a cursed shadow, surviving a nightmarish dream world one step at a time.",
    notes: "Long, dark and impossible to put down.",
    cover:
      "https://preview.redd.it/shadow-slave-physical-hardcover-covers-for-vol-2-and-3-v0-cq2hywwy3bnh1.jpg?width=640&crop=smart&auto=webp&s=ffddd21da282a8d19af53d71b8cf7f47daa41690",
  },

  // ✦ My self-improvement books
  {
    id: "the-psychology-of-money",
    title: "The Psychology of Money",
    creator: "Morgan Housel",
    type: "Book",
    realm: "wisdom",
    status: "Completed",
    rating: 0,
    genres: ["Self-improvement", "Finance"],
    synopsis:
      "Morgan Housel explores how people think about money through nineteen short stories about greed, fear and behaviour.",
    notes: "Changed how I think about saving and patience.",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR1NlQ_mXi_plLMsh7pBXLuMkmJNjVb62mZIaxaWf6dnRkpqmw0lT6wKC3&s=10",
  },
  {
    id: "the-power-of-your-subconscious-mind",
    title: "The Power of Your Subconscious Mind",
    creator: "Joseph Murphy",
    type: "Book",
    realm: "wisdom",
    status: "Completed",
    rating: 0,
    genres: ["Self-improvement", "Psychology"],
    synopsis:
      "Joseph Murphy explains how the subconscious mind shapes habits, health and success — and how to program it deliberately.",
    notes: "A classic I keep coming back to.",
    cover: "https://cdn.exoticindia.com/images/products/original/books-2019-013/nau451.webp",
  },
  {
    id: "ikigai",
    title: "Ikigai",
    creator: "Héctor García & Francesc Miralles",
    type: "Book",
    realm: "wisdom",
    status: "Completed",
    rating: 0,
    genres: ["Philosophy", "Self-improvement"],
    synopsis:
      "A look at the Japanese secret to a long and happy life — finding the reason you get up in the morning.",
    notes: "Small book, big perspective shift.",
    cover: "https://m.media-amazon.com/images/I/81l3rZK4lnL._AC_UF1000,1000_QL80_.jpg",
  },
];
