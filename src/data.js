export const profile = {
  name: "Soumyajit Saha",
  role: "Java Backend Developer",
  education: "B.Tech in Information Technology",

  summary:
    "B.Tech IT student focused on Java backend development, Data Structures & Algorithms, databases, secure systems, cybersecurity, and blockchain/Web3.",

  github: "https://github.com/SOUMYAJIT200515",
  leetcode: "https://leetcode.com/u/soumyajit_saha",
  linkedin: "https://www.linkedin.com/in/soumyajit-saha-958639338/",
  email: "soumyajitsaha.miit@gmail.com"
};


export const projects = [

  {
    id: "movie-ticket-booking",
    name: "Movie Ticket Booking System",
    icon: "🎬",
    category: "featured",

    description:
      "A full-stack movie ticket booking system designed around movie browsing, show selection, interactive seat booking, payment flow, QR tickets, and administration.",

    technologies: [
      "Java",
      "Spring Boot",
      "MySQL",
      "Redis",
      "JavaScript"
    ],

    features: [
      "Movie and show browsing",
      "Interactive seat selection",
      "Temporary seat locking",
      "Payment-aware booking flow",
      "QR ticket generation",
      "Admin functionality",
      "Booking management"
    ],

    github:
      "https://github.com/SOUMYAJIT200515/ticket_booking",

    demo: "",

    status: "Development"
  },


  {
    id: "civicchain",
    name: "CIVICCHAIN",
    icon: "🗳️",
    category: "featured",

    description:
      "A secure voting application implementing voter authentication, OTP verification, REST APIs, administration, and a protected voting workflow.",

    technologies: [
      "Java",
      "Spring Boot",
      "MongoDB",
      "REST API",
      "OTP",
      "JavaScript"
    ],

    features: [
      "Voter authentication",
      "OTP verification",
      "Admin dashboard",
      "Voting workflow",
      "REST APIs",
      "Protected API access",
      "Voter management"
    ],

    github:
      "https://github.com/SOUMYAJIT200515/CIVICCHAIN",

    demo:
      "https://civicchain-neon.vercel.app/",

    status: "Live Demo"
  },


  {
    id: "resqlearn",
    name: "ResQLearn",
    icon: "🚨",
    category: "featured",

    description:
      "A disaster preparedness and response education platform designed for schools and colleges, providing structured learning modules, courses, and quizzes.",

    technologies: [
      "Next.js",
      "MongoDB",
      "JavaScript",
      "Tailwind CSS",
      "MERN"
    ],

    features: [
      "Disaster preparedness learning",
      "Learning modules",
      "Courses",
      "Interactive quizzes",
      "Student-oriented learning",
      "Admin functionality",
      "Educational content management"
    ],

    github:
      "https://github.com/SOUMYAJIT200515/ResQLearn2",

    demo: "",

    status: "Development"
  },


  {
    id: "blockchain-digital-assets",
    name: "Blockchain Digital Asset Management",
    icon: "⛓️",
    category: "featured",

    description:
      "A security-focused blockchain project concept for identity, access control, and digital asset management using WebAuthn, cryptographic identity, and smart contracts.",

    technologies: [
      "Java",
      "Spring Boot",
      "WebAuthn",
      "Blockchain",
      "Solidity",
      "Ethereum"
    ],

    features: [
      "WebAuthn authentication",
      "Cryptographic identity",
      "Role-based access control",
      "Digital asset ownership",
      "Smart contract interaction",
      "Secure asset transfer",
      "Blockchain-based audit concepts"
    ],

    github: "",

    demo: "",

    status: "In Development"
  },


  /* =========================
     OTHER PROJECTS
     ========================= */

  {
    id: "coding-guide",
    name: "Coding Guide App",
    icon: "💻",
    category: "other",

    description:
      "A web application designed to provide programming and development guidance with a backend API and database integration.",

    technologies: [
      "JavaScript",
      "Node.js",
      "Express",
      "MongoDB"
    ],

    features: [
      "Programming resources",
      "Backend REST APIs",
      "MongoDB integration",
      "User-focused content",
      "API-based architecture"
    ],

    github:
      "https://github.com/SOUMYAJIT200515/coding-guide-app",

    demo: "",

    status: "Project"
  },


  {
    id: "hologram-engine",
    name: "Hologram Engine",
    icon: "🌌",
    category: "other",

    description:
      "An experimental interactive 3D project exploring browser-based graphics, visual effects, and immersive interfaces.",

    technologies: [
      "JavaScript",
      "Three.js",
      "WebGL",
      "HTML",
      "CSS"
    ],

    features: [
      "3D graphics",
      "Interactive visual effects",
      "Browser-based rendering",
      "Immersive interface"
    ],

    github: "",

    demo: "",

    status: "Experimental"
  },


  {
    id: "galactic-conqueror",
    name: "Galactic Conqueror",
    icon: "🚀",
    category: "other",

    description:
      "An interactive browser-based space experience developed as an experimental game and 3D graphics project.",

    technologies: [
      "JavaScript",
      "Three.js",
      "WebGL",
      "HTML",
      "CSS"
    ],

    features: [
      "Interactive gameplay",
      "3D environment",
      "Space-themed interface",
      "Browser-based rendering"
    ],

    github: "",

    demo: "",

    status: "Experimental"
  },


  {
    id: "java-music-player",
    name: "Java Music Player",
    icon: "🎵",
    category: "other",

    description:
      "A Java-based music player project created to explore application development, file handling, and media playback.",

    technologies: [
      "Java",
      "File I/O",
      "Java GUI"
    ],

    features: [
      "Music playback",
      "File handling",
      "Desktop application concepts",
      "Java-based implementation"
    ],

    github: "",

    demo: "",

    status: "Academic Project"
  },


  {
    id: "jarvis",
    name: "Jarvis AI Assistant",
    icon: "🤖",
    category: "other",

    description:
      "An experimental Python-based personal assistant project exploring voice interaction, automation, and command processing.",

    technologies: [
      "Python",
      "Speech Recognition",
      "Automation",
      "OpenCV"
    ],

    features: [
      "Voice interaction",
      "Command processing",
      "Automation experiments",
      "Computer vision experiments"
    ],

    github: "",

    demo: "",

    status: "Experimental"
  }

];


/* =========================================================
   PROJECT HELPERS
   These make it easy for the Projects app to create
   separate Featured / Other / Live Demo sections.
   ========================================================= */

export const featuredProjects = projects.filter(
  (project) => project.category === "featured"
);

export const otherProjects = projects.filter(
  (project) => project.category === "other"
);

export const liveProjects = projects.filter(
  (project) => project.demo && project.demo.trim() !== ""
);


/* =========================================================
   SKILLS
   ========================================================= */

export const skills = {

  Programming: [
    "Java",
    "JavaScript",
    "C",
    "Python"
  ],

  Backend: [
    "Spring Boot",
    "Node.js",
    "Express.js",
    "REST APIs",
    "JDBC",
    "JWT",
    "Backend Architecture"
  ],

  Databases: [
    "MySQL",
    "MongoDB",
    "SQL"
  ],

  Web: [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Next.js",
    "Tailwind CSS"
  ],

  "Computer Science": [
    "Data Structures & Algorithms",
    "Operating Systems",
    "DBMS",
    "Computer Networks",
    "Compiler Design",
    "Software Engineering"
  ],

  "Security & Web3": [
    "Cybersecurity Fundamentals",
    "Cryptography",
    "WebAuthn",
    "Blockchain",
    "Smart Contracts",
    "Solidity",
    "Ethereum"
  ],

  Tools: [
    "Git",
    "GitHub",
    "VS Code",
    "Postman",
    "Vercel",
    "MongoDB Compass",
    "MySQL",
    "Railway",
    "Render",
    "Docker"
  ]
};


/* =========================================================
   PORTFOLIO APPS
   ========================================================= */

export const apps = [

  {
    id: "about",
    name: "About Me",
    icon: "👨‍💻"
  },

  {
    id: "projects",
    name: "Projects",
    icon: "📁"
  },

  {
    id: "skills",
    name: "Skills",
    icon: "🧰"
  },

  {
    id: "github",
    name: "GitHub",
    icon: "🐙"
  },

  {
    id: "leetcode",
    name: "LeetCode",
    icon: "🧠"
  },

  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "💼"
  },

  {
    id: "resume",
    name: "Resume",
    icon: "📄"
  },

  {
    id: "terminal",
    name: "Terminal",
    icon: "⌨️"
  },

  {
    id: "browser",
    name: "Browser",
    icon: "🌐"
  },

  {
    id: "contact",
    name: "Contact",
    icon: "📨"
  },

  {
    id: "email",
    name: "Email",
    icon: "✉️"
  },

  {
    id: "settings",
    name: "Settings",
    icon: "⚙️"
  },

  {
    id: "snake",
    name: "Snake",
    icon: "🐍"
  },

  {
    id: "minesweeper",
    name: "Minesweeper",
    icon: "💣"
  }
];
