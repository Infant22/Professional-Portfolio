export interface Project {
  id: string
  title: string
  subtitle?: string
  tagline: string
  category: string
  statusBadge: string
  description: string
  technologies: string[]
  features?: string[]
  liveUrl?: string
  githubUrl?: string
  image: string
  isFeatured: boolean
  hasCaseStudy: boolean
  caseStudy?: {
    overview: string
    architecture: string
    challenges: string[]
    learnings: string[]
  }
}

export interface PortfolioData {
  personal: {
    name: string
    title: string
    specialisations: string[]
    description: string
    availability: string
    location: string
    github: string
    linkedin: string
    resumeUrl: string
    email: string
  }
  featuredProjects: Project[]
  moreProjects: Project[]
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Infant Rojar",
    title: "Software Developer",
    specialisations: ["Frontend Development", "Full Stack Development"],
    description: "I build modern web applications by combining thoughtful frontend experiences with practical backend solutions.",
    availability: "Available for Opportunities",
    location: "India",
    github: "https://github.com/Infant22",
    linkedin: "https://linkedin.com/in/infant-rojar",
    resumeUrl: "/My%20resume/Infant_Rojar_Software_Engineer_Resume%20(2).pdf",
    email: "infantrojar@gmail.com"
  },
  featuredProjects: [
    {
      id: "apply-ai",
      title: "ApplyAI",
      tagline: "Smart AI Job Application Tracker & Career Assistant",
      category: "Full Stack · AI Integration",
      statusBadge: "Deployed",
      description: "An AI-powered job application platform engineered to help candidates organize, track, and accelerate their career search in one unified workspace with contextual AI assistance.",
      technologies: ["Node.js", "Express", "MongoDB", "Google Gemini API", "JWT", "JavaScript", "Cloudinary"],
      features: [
        "Organize applications across stages from applied to offer",
        "Resume management with automated PDF parsing and storage",
        "AI-assisted cover letter and interview question generation"
      ],
      liveUrl: "https://apply-ai-app.netlify.app/",
      githubUrl: "https://github.com/Infant22/ApplyAI",
      image: "/projects/applyai-preview.png",
      isFeatured: true,
      hasCaseStudy: true,
      caseStudy: {
        overview: "Job hunting often leads to scattered notes, lost deadlines, and repetitive cover letter drafting. ApplyAI consolidates job application tracking into a centralized dashboard with integrated AI assistance.",
        architecture: "Express server connected to MongoDB Atlas for structured application persistence. File management utilizes Multer with Cloudinary for secure resume storage and pdf-parse for text extraction. Google Gemini API powers contextual prompt completions for interview prep and application questions.",
        challenges: [
          "Handling multi-part resume file uploads and reliably parsing unstructured text from PDF documents.",
          "Structuring prompt templates for Google Gemini API to return practical, relevant career responses.",
          "Securing authenticated routes using JSON Web Tokens (JWT) and protecting user-specific application records."
        ],
        learnings: [
          "Gained hands-on experience integrating generative AI APIs into practical backend application pipelines.",
          "Strengthened full-stack authentication, cloud file storage, and data isolation practices."
        ]
      }
    },
    {
      id: "page-pulse",
      title: "Page Pulse",
      tagline: "Automated URL Health & Performance Audit Engine",
      category: "Full Stack · Website Auditing",
      statusBadge: "Deployed",
      description: "A website performance and auditing tool designed to inspect web pages for technical health and SEO readiness. It checks meta tags, structural heading hierarchies, and server response headers to provide clear diagnostic insights.",
      technologies: ["React", "TypeScript", "Vite", "Node.js", "Express", "Cheerio", "Zod"],
      features: [
        "URL inspection for meta tags, open-graph data, and titles",
        "Heading structure analysis and image accessibility checks",
        "HTTP status code diagnostics and server response header verification"
      ],
      liveUrl: "https://page-pulse-front-end.vercel.app",
      githubUrl: "https://github.com/Infant22/Page_Pulse-FrontEnd",
      image: "/projects/pagepulse-preview.png",
      isFeatured: true,
      hasCaseStudy: true,
      caseStudy: {
        overview: "Auditing web pages for performance and SEO bottlenecks often requires heavy tools. Page Pulse provides an immediate, low-latency URL health scan extracting essential meta tags, heading hierarchies, accessibility markers, and response headers.",
        architecture: "Decoupled architecture with a React/Vite client and a TypeScript Express backend. Cheerio was chosen over headless browsers to achieve low-latency scraping and minimal resource overhead. Inbound URLs are validated using Zod, and rate-limiting prevents scraping abuse.",
        challenges: [
          "Parsing heterogeneous, malformed HTML across various target websites reliably using Cheerio.",
          "Preventing abuse and SSRF vulnerabilities by validating URL schemes and enforcing strict request timeouts.",
          "Designing an informative dashboard that displays dense technical audit results in an easily scannable format."
        ],
        learnings: [
          "Deepened understanding of HTTP response codes, headers, and SEO DOM structures.",
          "Mastered request validation, structured logging with Winston, and securing Express microservices."
        ]
      }
    },
    {
      id: "world-trends",
      title: "World Trends",
      tagline: "Global Information & Trending Dashboard",
      category: "Real-time Dashboard · API Integration",
      statusBadge: "Deployed",
      description: "A real-time global dashboard that brings together trending information and feeds across different categories. Built with a client-server architecture, it normalizes external data feeds into an interactive, responsive view.",
      technologies: ["TypeScript", "Node.js", "Express", "HTML5", "CSS3", "REST APIs"],
      features: [
        "Aggregated global feeds normalized through a central backend",
        "Shared TypeScript interface contracts across client and server",
        "Interactive dashboard with category filtering and responsive view"
      ],
      liveUrl: "https://world-trends.netlify.app/",
      githubUrl: "https://github.com/Infant22/World-Trends",
      image: "/projects/worldtrends-preview.png",
      isFeatured: true,
      hasCaseStudy: true,
      caseStudy: {
        overview: "Aggregating global trends and data feeds into a unified dashboard requires an efficient client-server flow and responsive presentation layer.",
        architecture: "Built with TypeScript and Node.js implementing a client-server architecture. The backend manages external data retrieval and payload normalization, while the frontend renders an interactive information dashboard.",
        challenges: [
          "Structuring clean TypeScript contracts shared across client and server logic.",
          "Designing responsive layouts to display multifaceted trending metrics without clutter.",
          "Handling varying API data structures gracefully with robust fallback states."
        ],
        learnings: [
          "Strengthened proficiency in TypeScript typing across full-stack applications.",
          "Practiced building decoupled, maintainable client-server dashboards."
        ]
      }
    },
    {
      id: "sweety-glucose-tracker",
      title: "Sweety",
      subtitle: "Blood Glucose Tracker",
      tagline: "Relational Health Management & Multi-Slot Glucose Tracker",
      category: "Full Stack · Blood Glucose Tracking",
      statusBadge: "Local Project",
      description: "A personal blood glucose tracking application designed to help individuals record and monitor daily blood sugar levels. It provides structured logging across four mealtime windows, secure user authentication, and clear progress reporting.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "Prisma ORM", "JWT"],
      features: [
        "Four dedicated daily mealtime reading slots",
        "Relational PostgreSQL database persistence modeled with Prisma ORM",
        "JWT-authenticated user sessions ensuring complete data isolation"
      ],
      githubUrl: "https://github.com/Infant22/sweety-glucose-tracker",
      image: "/projects/sweety-preview.png",
      isFeatured: true,
      hasCaseStudy: true,
      caseStudy: {
        overview: "Patients with diabetes require strict, consistent daily glucose monitoring tied to specific mealtime windows. Sweety was designed to offer an intuitive interface for recording up to four distinct meal readings per day with aggregated reporting.",
        architecture: "Built with Node.js/Express and a relational PostgreSQL database queried via Prisma ORM. Utilizes a strict schema with a ReadingSlot enum ('MORNING', 'AFTER_BREAKFAST', 'AFTER_LUNCH', 'AFTER_DINNER'). Features per-user data isolation enforced via JWT middleware.",
        challenges: [
          "Enforcing unique constraints per user and mealtime slot to avoid accidental duplicate readings on the same date.",
          "Structuring efficient Prisma aggregation queries for daily averages and month-to-date reporting.",
          "Creating a friendly, accessible React interface tailored for simple daily patient logging."
        ],
        learnings: [
          "Deepened expertise in PostgreSQL relational database design, migrations, and Prisma ORM client usage.",
          "Practiced strict backend data segregation and authentication security patterns."
        ]
      }
    }
  ],
  moreProjects: [
    {
      id: "deepfake-detection",
      title: "Deepfake Detection",
      tagline: "CNN-Based Facial Image Classification System",
      category: "AI / ML · Academic Capstone",
      statusBadge: "Academic Project",
      description: "A computer vision system that analyzes facial images to detect digital manipulations and synthetic media. Built with a custom Convolutional Neural Network (CNN) and OpenCV preprocessing, featuring a standalone desktop interface.",
      technologies: ["Python", "TensorFlow", "Keras", "OpenCV", "PyQt5"],
      features: [
        "Automated facial region extraction & normalization using OpenCV",
        "Custom Convolutional Neural Network (CNN) architecture in TensorFlow/Keras",
        "Standalone PyQt5 desktop application interface for local file inspection"
      ],
      image: "/projects/deepfake-preview.png",
      isFeatured: false,
      hasCaseStudy: true,
      caseStudy: {
        overview: "The rise of synthetic media poses significant challenges for digital authenticity. This academic capstone project investigated facial feature manipulation detection using Convolutional Neural Networks.",
        architecture: "Image preprocessing and face localization handled via OpenCV. A custom CNN architecture implemented in TensorFlow and Keras analyzes extracted facial regions to classify them as authentic or manipulated. A standalone desktop interface built with PyQt5 provides image upload and classification feedback.",
        challenges: [
          "Preprocessing varied image formats, lighting conditions, and resolutions to consistently isolate facial bounding boxes.",
          "Balancing model layers to avoid overfitting while retaining sensitivity to subtle compression and synthesis artifacts.",
          "Connecting model inference routines smoothly into the PyQt5 GUI event loop without freezing the interface."
        ],
        learnings: [
          "Gained practical experience with computer vision workflows, convolutional feature extractors, and neural network training.",
          "Learned the fundamentals of deploying machine learning models into interactive desktop applications."
        ]
      }
    },
    {
      id: "atmos-weather",
      title: "Atmos – Weather App",
      tagline: "Real-Time Client-Side Weather Dashboard",
      category: "Frontend Development",
      statusBadge: "Frontend Project",
      description: "A client-side weather application delivering real-time meteorological conditions, hourly forecasts, and multi-day projections. Features interactive temperature trend charts and animated visual weather indicators.",
      technologies: ["JavaScript", "HTML5", "CSS3", "REST APIs"],
      features: [
        "Live weather telemetry and multi-day projections via OpenWeatherMap API",
        "Interactive temperature trend visualization rendered with Chart.js",
        "Zero-dependency vanilla JavaScript architecture with responsive CSS3 layout"
      ],
      githubUrl: "https://github.com/Infant18/Weather-app",
      image: "/projects/atmos-preview.png",
      isFeatured: false,
      hasCaseStudy: true,
      caseStudy: {
        overview: "Weather forecast applications often rely on heavy frameworks. Atmos demonstrates a zero-dependency Vanilla JavaScript architecture providing hyper-local meteorological updates, interactive charts, and animated visual icons.",
        architecture: "Modular client-side architecture using Vanilla JavaScript (ES6+). Communicates asynchronously with OpenWeatherMap REST endpoints for current weather and multi-day projections. Renders interactive temperature trend curves via Chart.js and generates animated weather icons on HTML5 Canvas.",
        challenges: [
          "Coordinating parallel asynchronous requests to multiple OpenWeatherMap API endpoints while gracefully handling rate limits and invalid city queries.",
          "Designing responsive, smooth Chart.js temperature curves that re-scale dynamically across mobile and desktop viewport widths.",
          "Creating procedural, animated weather icons on HTML5 Canvas with smooth frame request loops."
        ],
        learnings: [
          "Mastered native DOM manipulation, asynchronous JavaScript fetch flows, and error handling without external UI frameworks.",
          "Strengthened practical expertise in HTML5 Canvas graphics programming and Chart.js customization."
        ]
      }
    },
    {
      id: "voice-based-email",
      title: "Voice-Based Email",
      tagline: "Accessible Voice-Controlled Email System",
      category: "Python · Academic Project",
      statusBadge: "Academic Project",
      description: "An accessible voice-guided email system created to assist visually impaired and illiterate individuals. Enables users to compose, listen to, and dispatch emails entirely through spoken voice commands.",
      technologies: ["Python", "REST APIs"],
      features: [
        "Hands-free voice recognition loop powered by Python SpeechRecognition",
        "Text-to-speech spoken audio prompts for system guidance via pyttsx3",
        "Automated SMTP mail dispatch with conversational confirmation checks"
      ],
      githubUrl: "https://github.com/Infant18/Voice-Based-Email-for-blind-and-illiterate-people",
      image: "/projects/voiceemail-preview.png",
      isFeatured: false,
      hasCaseStudy: true,
      caseStudy: {
        overview: "Standard email clients require visual acuity and keyboard navigation, creating high accessibility barriers for visually impaired or illiterate users. This college mini project provides a fully voice-guided interface where users interact exclusively through speech prompts and audio feedback.",
        architecture: "Built in Python using the SpeechRecognition library for speech-to-text input paired with PyAudio microphone stream capture. System feedback and prompts are converted to synthesized speech using pyttsx3. Email transmission is routed securely over SMTP servers using Python's standard email modules.",
        challenges: [
          "Calibrating microphone ambient noise thresholds to prevent background speech interference.",
          "Structuring conversational confirmation prompts before dispatching emails to avoid accidental transmissions.",
          "Ensuring consistent, offline text-to-speech feedback via pyttsx3 across system audio devices."
        ],
        learnings: [
          "Practiced assistive technology design principles and hands-free UX patterns.",
          "Mastered audio stream processing, speech-to-text parsing, and SMTP client routing in Python."
        ]
      }
    }
  ]
}
