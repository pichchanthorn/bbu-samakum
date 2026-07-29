export const idCardMember = {
  initials: "SD",
  name: "Sok Dara",
  department: "Department of Information Technology • Year 3",
  idNumber: "BBU-2024-00147",
  verifiedNote: "Verified via university email pp.bbu.edu.kh • Valid Gen 25 – 2028",
};

export const homeStats = [
  { num: "420+", label: "Registered members" },
  { num: "4", label: "Year levels, Year 1–4" },
  { num: "12", label: "Active discussion groups" },
];

export const infoPanel = {
  name: "BBU Samakum",
  tagline:
    "BBU Samakum is the IT Department's verified community — bringing together students and lecturers to learn, share, and grow together.",
  stats: [
    { num: "420+", label: "MEMBERS" },
    { num: "12", label: "DISCUSSIONS" },
    { num: "4", label: "YEAR LEVELS" },
    { num: "100%", label: "VERIFIED" },
  ],
  note: "New posts from verified members appear at the top of this feed.",
};

export const feedPosts = [
  {
    id: "feed-1",
    authorInitials: "CP",
    author: "Chan Thorn Pich",
    meta: "IT • Year 3 · 2h ago",
    cover: "cover-a",
    icon: "arrows",
    title: "5 mistakes first-year IT students always make",
    excerpt:
      "Sharing personal experience and how to avoid common mistakes when starting to learn programming.",
    likes: 32,
    comments: 7,
    views: 210,
  },
  {
    id: "feed-2",
    authorInitials: "RS",
    author: "Rithy Sok",
    meta: "Lecturer • IT Department · Yesterday",
    cover: "cover-b",
    icon: "laptop",
    title: "A quick debugging checklist for beginners",
    excerpt: "Simple checks to run before you assume it's a compiler bug.",
    likes: 21,
    comments: 4,
    views: 158,
  },
  {
    id: "feed-3",
    authorInitials: "VU",
    author: "Vanna Ung",
    meta: "IT • Year 3 · 5d ago",
    cover: "cover-c",
    icon: "grid",
    title: "Smart Attendance QR",
    excerpt:
      "A QR-based attendance system built to speed up roll call in large lecture halls.",
    likes: 27,
    comments: 4,
    views: 176,
  },
];

export const joinSteps = [
  {
    num: "1",
    title: "Enter your university email",
    desc: "Use an email ending in @pp.bbu.edu.kh, issued by BBU",
  },
  {
    num: "2",
    title: "Confirm the OTP code",
    desc: "We send a code to your email — enter it to confirm",
  },
  {
    num: "3",
    title: "Your account is verified",
    desc: "Start posting, discussing, and connecting right away",
  },
];

export const departments = [
  {
    id: "it",
    name: "Faculty of Sciences and Technology — IT Department",
    desc: "Students and lecturers in Information Technology. Verified sign-up, feed, and member directory all work here.",
    active: true,
    statusLabel: "Active",
  },
  {
    id: "business",
    name: "Faculty of Business Management",
    desc: "Accounting, finance, HR, and marketing programs.",
    active: false,
    statusLabel: "Coming soon",
  },
  {
    id: "tourism",
    name: "Faculty of Tourism and Hospitality",
    desc: "Tourism management and hospitality management programs.",
    active: false,
    statusLabel: "Coming soon",
  },
  {
    id: "education",
    name: "Faculty of Education and Languages",
    desc: "Teacher training and language programs.",
    active: false,
    statusLabel: "Coming soon",
  },
  {
    id: "law",
    name: "Faculty of Law and Sciences",
    desc: "Legal studies and general sciences programs.",
    active: false,
    statusLabel: "Coming soon",
  },
  {
    id: "foundation",
    name: "Department of Foundation Year",
    desc: "Preparatory year for incoming students.",
    active: false,
    statusLabel: "Coming soon",
  },
];

export const showcaseFilters = ["All", "Web Dev", "Mobile", "Data & AI", "Networking"];

export const showcaseItems = [
  {
    id: "showcase-1",
    authorInitials: "RC",
    author: "Ratanak Chea",
    meta: "IT • Year 4",
    title: "Campus Bus Tracker",
    excerpt:
      "A live bus-tracking prototype built for the BBU shuttle route, showing real-time position on a campus map.",
    tags: ["React", "Leaflet"],
    likes: 41,
    comments: 9,
    time: "1d ago",
  },
  {
    id: "showcase-2",
    authorInitials: "CP",
    author: "Chan Thorn Pich",
    meta: "IT • Year 3",
    title: "5 mistakes first-year IT students always make",
    excerpt:
      "Sharing personal experience and how to avoid common mistakes when starting to learn programming.",
    tags: ["Article"],
    likes: 32,
    comments: 7,
    time: "2h ago",
  },
  {
    id: "showcase-3",
    authorInitials: "VU",
    author: "Vanna Ung",
    meta: "IT • Year 3",
    title: "Smart Attendance QR",
    excerpt:
      "A QR-based attendance system built to speed up roll call in large lecture halls.",
    tags: ["Python", "QR Code"],
    likes: 27,
    comments: 4,
    time: "5d ago",
  },
  {
    id: "showcase-4",
    authorInitials: "RS",
    author: "Rithy Sok",
    meta: "Lecturer • IT Department",
    title: "A quick debugging checklist for beginners",
    excerpt: "Simple checks to run before you assume it's a compiler bug.",
    tags: ["Article"],
    likes: 21,
    comments: 4,
    time: "Yesterday",
  },
  {
    id: "showcase-5",
    authorInitials: "SL",
    author: "Sokha Ly",
    meta: "IT • Year 2",
    title: "Building my first REST API with Node.js",
    excerpt:
      "Notes from my first backend project, including the routing mistakes I had to fix twice.",
    tags: ["Node.js", "Express"],
    likes: 16,
    comments: 3,
    time: "1w ago",
  },
  {
    id: "showcase-6",
    authorInitials: "BP",
    author: "Bunthoeun Prak",
    meta: "IT • Year 4",
    title: "Comparing SQL vs NoSQL for our capstone project",
    excerpt:
      "Why our team switched schemas halfway through the semester, and what we'd do differently.",
    tags: ["Database", "Capstone"],
    likes: 19,
    comments: 6,
    time: "2w ago",
  },
];

export const members = [
  {
    id: "member-1",
    initials: "SD",
    name: "Sok Dara",
    role: "Information Technology",
    batch: "Gen 25 · Year 3",
  },
  {
    id: "member-2",
    initials: "CP",
    name: "Chan Thorn Pich",
    role: "Information Technology",
    batch: "Gen 25 · Year 3",
  },
  {
    id: "member-3",
    initials: "RC",
    name: "Ratanak Chea",
    role: "Information Technology",
    batch: "Gen 23 · Year 4",
  },
  {
    id: "member-4",
    initials: "VU",
    name: "Vanna Ung",
    role: "Information Technology",
    batch: "Gen 25 · Year 3",
  },
  {
    id: "member-5",
    initials: "RS",
    name: "Rithy Sok",
    role: "Lecturer · IT Department",
    batch: "Faculty",
  },
  {
    id: "member-6",
    initials: "SL",
    name: "Sokha Ly",
    role: "Information Technology",
    batch: "Gen 26 · Year 2",
  },
  {
    id: "member-7",
    initials: "BP",
    name: "Bunthoeun Prak",
    role: "Information Technology",
    batch: "Gen 23 · Year 4",
  },
  {
    id: "member-8",
    initials: "CM",
    name: "Chenda Mao",
    role: "Information Technology",
    batch: "Gen 27 · Year 1",
  },
];

export const missionValues = [
  {
    id: "verified",
    title: "Verified by design",
    desc: "Every account is tied to a real university email, checked before the first post.",
  },
  {
    id: "spam-free",
    title: "Built to stay quiet on spam",
    desc: "No open sign-up means no bots, no resellers, no noise in your feed.",
  },
  {
    id: "classmates",
    title: "Real classmates in your own department",
    desc: "Find people in your own year, batch, or discussion group — not strangers.",
  },
];

export const navItems = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/departments", label: "Departments", icon: "grid" },
  { href: "/showcase", label: "Showcase", icon: "showcase" },
  { href: "/members", label: "Members", icon: "members" },
  { href: "/about", label: "About", icon: "about" },
];
