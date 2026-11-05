# Sathvika V P — "The Curious Builder" Portfolio

> **"Curious by nature. Builder by habit."**  
> A personal portfolio website for **Sathvika V P**, a 2nd-year B.Tech Artificial Intelligence & Data Science student at **R.M.K. Engineering College**.

[![Built with HTML5, CSS3, Vanilla JS](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-FF6B4A?style=for-the-badge)](https://developer.mozilla.org/)
[![Deployment - AWS Amplify](https://img.shields.io/badge/Deploy-AWS%20Amplify%20Hosting-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/amplify/hosting/)
[![License - MIT](https://img.shields.io/badge/License-MIT-10B981?style=for-the-badge)](LICENSE)

---

## 🌟 Overview & Philosophy

This portfolio embodies the spirit of **"The Curious Builder"**: someone who actively collects challenges, constructs full-stack and Generative AI systems, uncovers insights from complex datasets, crafts visual stories through video editing, and embraces lifelong learning through the Japanese philosophy of *Kaizen* (continuous improvement).

### Architecture Highlights
- **100% Plain Vanilla Web**: Built with pure HTML5, modern CSS3, and vanilla ES6+ JavaScript. **Zero build steps, zero external runtime frameworks, zero backend dependencies.**
- **AWS Amplify Hosting Ready**: Deploys straight from the root directory (`index.html` at repository root).
- **Lightweight & High-Performance**: Minimal resource footprint, lazy-loaded images, video with `preload="none"`, and a zero-dependency pure JavaScript/Canvas celebratory confetti engine.
- **Fully Responsive**: Optimized for viewports from mobile (375px), tablets (768px), up to wide desktop displays (1280px+). Zero horizontal scroll.
- **Accessible & Mindful**: Semantic HTML tags, ARIA attributes, keyboard focus states (`:focus-visible`), high-contrast color palette, and full support for `prefers-reduced-motion`.

---

## 🚀 Key Features & Sections

### 1. Sticky Navigation & Theme Toggle
- Clean sticky top bar with brand badge `</>`, smooth scroll links, and responsive hamburger drawer on mobile.
- **Light / Dark Mode Toggle**: Defaults to deep midnight indigo (`#0B0F19`) with warm coral (`#FF6B4A`) and amber accents, with persistent preference saved to `localStorage`.

### 2. Hero & Video Introduction
- Animated typing effect for Sathvika's name.
- Tagline: *"Curious by nature. Builder by habit."*
- Click-to-play video slot with poster image, preload optimization, and quick-scroll hook.

### 3. Creative Feature A: Interactive Terminal (`sathvika@portfolio:~$`)
Located directly in the hero area with a clear hint banner (*"Type 'help' to explore me, or tap a command below"*):
- **Command History**: Navigate previous commands with <kbd>↑</kbd> and <kbd>↓</kbd> arrow keys.
- **Tab Autocomplete**: Auto-completes available commands.
- **Focus Safety**: Press <kbd>Esc</kbd> to blur input; never traps focus or jerks page scroll.
- **Mobile Friendly**: Quick-tap suggestion buttons beneath the terminal so mobile users never need an onscreen keyboard.
- **Commands**:
  - `help` — Manual of all available commands.
  - `about` — Background & engineering philosophy.
  - `skills` — Martial-arts belt ranking summary.
  - `projects` — Featured builds and GitHub repositories.
  - `challenges` / `passport` — Curiosity passport progress and status.
  - `passport <name>` — Stamps a challenge directly from the terminal (e.g., `passport gcloud`, `passport dev`).
  - `japanese` — Prints a random beginner Japanese phrase (Kanji/Kana, Romaji, English meaning, and cultural insight).
  - `video` — Smoothly scrolls to and toggles the intro video.
  - `contact` — Directory of social channels, email, and resume download.
  - `theme` — Toggles light/dark portfolio theme dynamically.
  - `clear` — Clears terminal window.
  - `sudo hire-sathvika` — **Hidden Easter Egg**: Prints permission-granted ASCII art and triggers celebratory confetti!

### 4. About Me
- Concise narrative highlighting Sathvika's journey in B.Tech AI & DS, hands-on challenge collection, healthcare analytics internship, video editing passion, and Japanese language curiosity.
- Placeholder image slot at `assets/profile.jpg`.

### 5. Skills & Tech Superpowers (Martial-Arts Belt System)
Organized according to Japanese martial arts *Obi* belt rankings, celebrating hands-on craft:
- **Green Belt (緑帯 - Proficient / Practical Builds)**:
  - Python, NLP & RAG Systems (88%)
  - GenAI & LLM Frameworks — LangChain, ChromaDB, FAISS, Ollama, Gemini API (85%)
  - HTML, CSS, JavaScript & Streamlit Dashboards (85%)
  - Data Analytics — Healthcare cleaning & visualization (85%)
  - Database Management Systems (DBMS / SQL / Supabase) (80%)
- **Yellow Belt (黄帯 - Basics / Core OOP & Problem Solving)**:
  - Java (65%)
  - C++ & C (62%)
- **Blue Belt (青帯 - Advanced / High Fluency & Flow)**:
  - Video Editing & Motion Storytelling (90%)
  - Developer Tools — Git, GitHub, VS Code, Jupyter (86%)
- **White Belt (白帯 - Beginner / Active Curiosity)**:
  - Japanese Language (42%)
- Includes a dedicated legend explaining belt levels and philosophy.

### 6. Projects & Experience
Rich interactive cards with tech tags, feature bullet points, and repository/demo buttons:
1. **FileBot – RAG Chatbot**: Conversational document intelligence chatbot answering questions from uploaded PDF documents using text chunking, embedding generation, vector databases (ChromaDB & FAISS), and LLM integration. (Python, RAG, LangChain, ChromaDB, FAISS, Streamlit, Ollama).
2. **Resume Ranking System**: AI-powered resume screening and ranking system evaluating candidate profiles with NLP semantic similarity, automated score breakdowns, and an interactive recruiter dashboard. (Python, NLP, Semantic Similarity, Streamlit, Pandas).
3. **AgriConnect** (*"Connect. Trade. Grow."*): A "LinkedIn for Agriculture" connecting farmers to verified bulk buyers with crop listings, multi-criteria matching, restock alerts, multilingual UI (English, Hindi, Bengali, Telugu, Marathi, Tamil), voice assistance, and AI agricultural copilot. (React, Node.js, Supabase, Gemini API, LangChain, ChromaDB).
4. **Healthcare & Pharmacy Data Analytics Internship**: 155-hour completed internship at VirtualWorks Lab by Emogi (Jul–Aug 2026). Predictive pharmacy sales, adverse drug reaction (ADR) analysis, and automated data cleaning pipeline. ([GitHub Repository](https://github.com/sathvika1138/medical-dataset-cleaning-pipeline)).
5. **EventPilot**: GenAI event planning assistant for weddings, birthdays, and community gatherings with budget planners, vendor checklists, roadmaps, run of show, guest matrix, and PDF exports. (JavaScript, GenAI).
6. **Ghost in the Machine (Hacktoberfest Open-Source Challenge)**: Halloween AI chat website on DEV platform exploring AI personas, eerie conversational prompts, and retro styling.

### 7. Creative Feature B: Curiosity Passport (Challenges)
A physical-style logbook grid of 8 challenge stamps:
1. **Google Cloud Arcade** (Compute, storage & cloud architecture)
2. **Salesforce Trailhead** (CRM schema design & workflow triggers)
3. **PromptVirtual Wars** (Token efficiency & multi-step chain-of-thought)
4. **Google Skills Communities** (Study jams & peer open-source sprints)
5. **Microsoft Events & Courses** (Azure fundamentals & data engineering)
6. **GenAI APAC** (Frontier LLMs & localized AI solutions)
7. **Hacktoberfest** (Git hygiene, pull requests & open-source collaboration)
8. **DEV Community** (Ghost in the Machine Halloween challenge)

- **Interactive Ink Stamping**: Clicking any stamp triggers an authentic rotating ink pop animation and opens an inspection modal with *"What it was"* and *"What I learned"*.
- **Progress Counter**: Tracks collected stamps (e.g. `3/8 stamps collected`) and persists state in `localStorage` wrapped in defensive `try/catch`.
- **Celebration Trigger**: When all 8 stamps are collected, unlocks a special card:
  > *"Curiosity collected. Thanks for exploring, I'd love to build something with you."*  
  followed by an explosion of multi-colored confetti!
- **Reset Button**: Easily reset progress anytime to re-experience the stamps.

### 8. Contact & Resume
- GitHub: [github.com/sathvika1138](https://github.com/sathvika1138)
- LinkedIn: [linkedin.com/in/sathvika-v-p-6172a7399](https://www.linkedin.com/in/sathvika-v-p-6172a7399)
- Email: [sathvikavp2020@gmail.com](mailto:sathvikavp2020@gmail.com)
- Resume: Direct download link for `assets/resume.pdf`

---

## 📁 Project Directory Structure

```text
TASK/
├── index.html            # Main semantic HTML structure & layout
├── css/
│   └── style.css         # Complete responsive design system, theme tokens & animations
├── js/
│   ├── main.js           # Theme toggle, typing animation, navigation & confetti engine
│   ├── terminal.js       # Interactive CLI terminal, commands, autocomplete & easter eggs
│   └── passport.js       # Curiosity Passport stamps data, localStorage & modal controller
├── assets/
│   ├── favicon.svg       # Custom vector SVG favicon (Terminal / Builder icon)
│   ├── profile.jpg       # Profile photo placeholder
│   ├── intro-poster.jpg  # Intro video thumbnail poster
│   ├── intro.mp4         # Sample intro video placeholder (playable 3s clip)
│   └── resume.pdf        # Clean placeholder resume PDF
└── README.md             # Project documentation & deployment guide
```

---

## 💻 Running the Project Locally

Because this project uses vanilla HTML, CSS, and JavaScript with no build steps or dependencies, you can run it immediately using any local static web server:

### Option 1: Python 3 (Recommended)
Open a terminal in the project directory and run:
```bash
python -m http.server 8000
```
Then navigate to: [http://localhost:8000](http://localhost:8000)

### Option 2: Node.js `npx serve`
```bash
npx serve .
```

### Option 3: VS Code Live Server
1. Install the **Live Server** extension in VS Code.
2. Right-click on `index.html` and select **"Open with Live Server"**.

---

## ☁️ Deploying to AWS Amplify Hosting

AWS Amplify Hosting makes deploying static portfolio sites seamless and lightning fast with global CDN distribution.

### Method 1: Git-Based Continuous Deployment (Recommended)

1. **Push your code to a new GitHub repository**:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit of Sathvika V P personal portfolio"
   git branch -M main
   git remote add origin https://github.com/sathvika1138/portfolio.git
   git push -u origin main
   ```

2. **Connect to AWS Amplify**:
   - Open the [AWS Management Console](https://console.aws.amazon.com/) and navigate to **AWS Amplify**.
   - Click **Deploy an app** (or **New app** > **Host web app**).
   - Select **GitHub** as your Git provider and click **Next**.
   - Authorize AWS Amplify to access your GitHub repositories and choose your `portfolio` repository and `main` branch.

3. **Configure Build Settings**:
   - Amplify will automatically detect that this is a **static web application without a build step**.
   - In the build settings, ensure the build output directory is set to `.` (the repository root):
     ```yaml
     version: 1
     frontend:
       phases:
         build:
           commands: []
       artifacts:
         baseDirectory: /
         files:
           - '**/*'
       cache:
         paths: []
     ```
   - Click **Next**, review the configuration, and click **Save and deploy**.

4. **Live URL**:
   - Amplify will build and deploy your site in ~60 seconds and provide a custom SSL domain (e.g., `https://main.d123456789.amplifyapp.com`).
   - You can connect your custom domain (e.g. `sathvika.dev`) under **App settings > Domain management**.

---

### Method 2: Manual Drag & Drop (Instant Deployment without Git)

1. Compress the project folder into a `.zip` archive (ensure `index.html` is at the root of the zip).
2. Go to AWS Amplify Console > **Deploy without Git provider**.
3. Enter an app name (e.g. `sathvika-portfolio`), choose **Drag and drop**, select your `.zip` file, and click **Save and deploy**.

---

## ✏️ How to Customize Content

All dynamic content is organized in clearly commented data arrays at the top of their respective files:

| Content to Edit | File Location | Variable / Tag |
|---|---|---|
| **Skills & Belt Levels** | `js/main.js` | `SKILLS_DATA` array |
| **Curiosity Passport Stamps** | `js/passport.js` | `PASSPORT_STAMPS` array |
| **Japanese Phrases** | `js/terminal.js` | `JAPANESE_PHRASES` array |
| **Projects & Links** | `index.html` | `<section id="projects">` |
| **Profile Photo** | `assets/profile.jpg` | Replace with your portrait image |
| **Intro Video & Poster** | `assets/intro.mp4`, `assets/intro-poster.jpg` | Replace with your video & thumbnail |
| **Resume PDF** | `assets/resume.pdf` | Replace with your actual resume PDF |

---

## 📝 Remaining Optional Customizations

Before public launch, you may replace the following remaining media and project links:

- [x] **LinkedIn URL**: Configured to `https://www.linkedin.com/in/sathvika-v-p-6172a7399`.
- [x] **Email Address**: Configured to `sathvikavp2020@gmail.com`.
- [x] **GitHub Profile**: Configured to `https://github.com/sathvika1138`.
- [x] **Resume PDF**: Generated formatted resume PDF at `assets/resume.pdf` with education, skills, projects, and coursework.
- [ ] **Profile Photo**: Replace `assets/profile.jpg` with your own portrait photograph.
- [ ] **Intro Video**: Replace `assets/intro.mp4` and `assets/intro-poster.jpg` with your personal video pitch.
- [ ] **FileBot Live Demo & GitHub**: Add your demo and repository URLs in `index.html`.
- [ ] **Resume Ranking System Live Demo & GitHub**: Add your demo and repository URLs in `index.html`.
- [ ] **AgriConnect Live Demo & GitHub**: Add your demo and repository URLs in `index.html`.
- [ ] **EventPilot Live Demo & GitHub**: Add your demo and repository URLs in `index.html`.
- [ ] **Ghost in the Machine Live Demo & GitHub**: Add your demo and repository URLs in `index.html`.

---

## 📜 License
This project is open-source and available under the [MIT License](LICENSE). Built with curiosity by Sathvika V P.

