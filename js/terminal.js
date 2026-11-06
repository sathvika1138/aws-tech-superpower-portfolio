/**
 * ============================================================================
 * INTERACTIVE TERMINAL COMPONENT (js/terminal.js)
 * ============================================================================
 * EDITABLE CONTENT:
 * Edit the JAPANESE_PHRASES and TERMINAL_COMMANDS below to customize
 * terminal output, phrases, and custom responses.
 * ============================================================================
 */

const JAPANESE_PHRASES = [
  {
    kanji: "ありがとうございます",
    romaji: "Arigatou gozaimasu",
    english: "Thank you very much (polite)",
    note: "The heartbeat of Japanese courtesy. Gratitude opens every door!"
  },
  {
    kanji: "よろしくお願いします",
    romaji: "Yoroshiku onegaishimasu",
    english: "Please treat me well / Looking forward to working with you",
    note: "Said before embarking on any collaboration or new project."
  },
  {
    kanji: "頑張ってください",
    romaji: "Ganbatte kudasai",
    english: "Do your best! / You can do it!",
    note: "Encouragement when facing tough challenges or learning new skills."
  },
  {
    kanji: "改善",
    romaji: "Kaizen",
    english: "Continuous improvement / Change for the better",
    note: "A guiding philosophy for engineering and lifelong curiosity."
  },
  {
    kanji: "好奇心",
    romaji: "Koukishin",
    english: "Curiosity / Inquisitive spirit",
    note: "The exact spirit behind 'The Curious Builder'!"
  },
  {
    kanji: "一期一会",
    romaji: "Ichi-go ichi-e",
    english: "One time, one meeting / Treasure every encounter",
    note: "Every connection with a fellow builder is unique and valuable."
  },
  {
    kanji: "七転び八起き",
    romaji: "Nana korobi ya oki",
    english: "Fall seven times, stand up eight",
    note: "The ultimate resilience mantra for debugging and building."
  }
];

class PortfolioTerminal {
  constructor() {
    this.history = [];
    this.historyIndex = -1;
    this.commands = [
      "help",
      "about",
      "skills",
      "projects",
      "challenges",
      "passport",
      "japanese",
      "video",
      "contact",
      "theme",
      "clear",
      "sudo hire-sathvika"
    ];

    this.container = document.getElementById("terminal-output");
    this.input = document.getElementById("terminal-input");
    this.chipContainer = document.getElementById("terminal-chips");
    this.init();
  }

  init() {
    if (!this.input || !this.container) return;

    // Welcome banner in terminal
    this.printInitialGreeting();

    // Input listeners
    this.input.addEventListener("keydown", (e) => this.handleKeyDown(e));

    // Escape key blurs terminal without hijacking navigation
    this.input.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        this.input.blur();
      }
    });

    // Setup clickable chips underneath terminal
    this.setupChips();

    // Clear button on window header
    const clearBtn = document.getElementById("terminal-clear-action");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => this.clearTerminal());
    }

    // Clicking anywhere inside terminal box focuses input smoothly without page jump
    const terminalBox = document.getElementById("terminal-window");
    if (terminalBox) {
      terminalBox.addEventListener("click", (e) => {
        if (!e.target.closest("button") && !e.target.closest("a")) {
          this.input.focus({ preventScroll: true });
        }
      });
    }
  }

  printInitialGreeting() {
    const greeting = `
<div class="term-greeting">
  <span class="term-dim">Last login: Today from curious-builder-node.local</span>
  <span class="term-accent">Welcome to Sathvika's interactive workspace!</span>
  <span>Type <span class="term-highlight">'help'</span> to see all commands, or tap any shortcut button below.</span>
</div>`;
    this.printHTML(greeting);
  }

  setupChips() {
    if (!this.chipContainer) return;
    const chips = [
      "help",
      "about",
      "skills",
      "projects",
      "challenges",
      "passport",
      "japanese",
      "video",
      "contact",
      "theme",
      "sudo hire-sathvika"
    ];

    this.chipContainer.innerHTML = "";
    chips.forEach((cmd) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "terminal-chip-btn";
      btn.textContent = cmd;
      btn.setAttribute("aria-label", `Run command ${cmd}`);
      btn.addEventListener("click", () => {
        this.executeCommand(cmd);
        this.input.focus({ preventScroll: true });
      });
      this.chipContainer.appendChild(btn);
    });
  }

  handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const rawCmd = this.input.value;
      this.input.value = "";
      this.executeCommand(rawCmd);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (this.history.length > 0 && this.historyIndex > 0) {
        this.historyIndex--;
        this.input.value = this.history[this.historyIndex];
      } else if (this.history.length > 0 && this.historyIndex === -1) {
        this.historyIndex = this.history.length - 1;
        this.input.value = this.history[this.historyIndex];
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (this.historyIndex !== -1 && this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
        this.input.value = this.history[this.historyIndex];
      } else {
        this.historyIndex = -1;
        this.input.value = "";
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      this.handleTabAutocomplete();
    }
  }

  handleTabAutocomplete() {
    const current = this.input.value.trim().toLowerCase();
    if (!current) return;

    const matches = this.commands.filter((c) => c.startsWith(current));
    if (matches.length === 1) {
      this.input.value = matches[0];
    } else if (matches.length > 1) {
      this.printLine(`sathvika@portfolio:~$ ${current}`, "term-prompt-line");
      this.printHTML(`<span class="term-dim">Suggestions: ${matches.join("  |  ")}</span>`);
    }
  }

  executeCommand(rawCmd) {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    // Save to history
    this.history.push(trimmed);
    this.historyIndex = -1;

    // Print command line
    this.printLine(`sathvika@portfolio:~$ ${trimmed}`, "term-prompt-echo");

    const parts = trimmed.split(/\s+/);
    const mainCmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ").toLowerCase();

    // Check special multi-word command "sudo hire-sathvika"
    if (trimmed.toLowerCase() === "sudo hire-sathvika" || (mainCmd === "sudo" && arg.includes("hire"))) {
      this.handleSudoHire();
      return;
    }

    switch (mainCmd) {
      case "help":
        this.handleHelp();
        break;
      case "about":
        this.handleAbout();
        break;
      case "skills":
        this.handleSkills();
        break;
      case "projects":
        this.handleProjects();
        break;
      case "challenges":
        this.handleChallenges();
        break;
      case "passport":
        this.handlePassport(arg);
        break;
      case "japanese":
        this.handleJapanese();
        break;
      case "video":
        this.handleVideo();
        break;
      case "contact":
        this.handleContact();
        break;
      case "theme":
        this.handleTheme();
        break;
      case "clear":
        this.clearTerminal();
        break;
      default:
        this.handleUnknown(trimmed);
        break;
    }

    this.scrollToBottom();
  }

  handleHelp() {
    const text = `
<div class="term-box">
  <span class="term-bold term-accent">AVAILABLE COMMANDS:</span>
  <ul class="term-cmd-list">
    <li><span class="term-cmd">help</span> · Show this manual of commands</li>
    <li><span class="term-cmd">about</span> · Overview of Sathvika & background</li>
    <li><span class="term-cmd">skills</span> · View martial-arts belt ranked skill set</li>
    <li><span class="term-cmd">projects</span> · Featured full-stack, GenAI & analytics builds</li>
    <li><span class="term-cmd">challenges</span> · View curiosity passport status</li>
    <li><span class="term-cmd">passport &lt;name&gt;</span> · Stamp a challenge (e.g. 'passport gcloud')</li>
    <li><span class="term-cmd">japanese</span> · Learn a random Japanese phrase & meaning</li>
    <li><span class="term-cmd">video</span> · Scroll to & play the intro video</li>
    <li><span class="term-cmd">contact</span> · View GitHub, LinkedIn, email & resume</li>
    <li><span class="term-cmd">theme</span> · Toggle light/dark portfolio mode</li>
    <li><span class="term-cmd">clear</span> · Clear terminal screen</li>
    <li><span class="term-cmd">sudo hire-sathvika</span> · ⭐ Secret easter egg</li>
  </ul>
</div>`;
    this.printHTML(text);
  }

  handleAbout() {
    const text = `
<div class="term-box">
  <span class="term-accent term-bold">Sathvika V P</span> — B.Tech AI & Data Science (Class of 2029)
  <span class="term-dim">R.M.K. Engineering College | Chennai, India</span>
  <p>
    "Curious by nature. Builder by habit." Motivated AI & Data Science undergraduate
    building practical machine learning applications, RAG chatbots (FileBot), semantic recruiter
    systems, healthcare data pipelines, and exploring Japanese language & Kaizen.
  </p>
  <span class="term-dim">Shortcut: Tap the 'About' link on the navbar to read more.</span>
</div>`;
    this.printHTML(text);
  }

  handleSkills() {
    const text = `
<div class="term-box">
  <span class="term-accent term-bold">MARTIAL-ARTS BELT SKILL RANKINGS:</span>
  <div class="term-grid">
    <div>🥋 <span class="term-belt-green">GREEN BELT (Proficient)</span>:
      <br/>· Python, NLP & RAG Systems
      <br/>· GenAI & LLM SDKs (LangChain, ChromaDB, FAISS, Ollama)
      <br/>· HTML, CSS, JavaScript & Streamlit
      <br/>· Database Management (DBMS / SQL)
      <br/>· Healthcare Data Analytics & Cleaning
    </div>
    <div>🥋 <span class="term-belt-yellow">YELLOW BELT (Basics)</span>:
      <br/>· Java (Core OOP & Data Structures)
      <br/>· C++ & C (Problem Solving)
    </div>
    <div>🥋 <span class="term-belt-blue">BLUE BELT (Advanced Flow)</span>:
      <br/>· Video Editing & Motion Storytelling
      <br/>· Tools: Git, GitHub, VS Code, Jupyter
    </div>
    <div>🥋 <span class="term-belt-white">WHITE BELT (Active Learning)</span>:
      <br/>· Japanese Language (Beginner)
    </div>
  </div>
</div>`;
    this.printHTML(text);
  }

  handleProjects() {
    const text = `
<div class="term-box">
  <span class="term-accent term-bold">FEATURED PROJECTS & INTERNSHIPS:</span>
  <ol class="term-project-list">
    <li>
      <span class="term-bold">FileBot – RAG Chatbot</span>
      <br/><span class="term-dim">Tech: Python, LangChain, ChromaDB, FAISS, Ollama, Streamlit</span>
      <br/>Conversational document intelligence answering complex natural language queries from uploaded PDFs.
    </li>
    <li>
      <span class="term-bold">Resume Ranking System</span>
      <br/><span class="term-dim">Tech: Python, NLP, Semantic Similarity, Streamlit, Pandas</span>
      <br/>AI recruiter dashboard ranking candidate resumes using semantic cosine similarity.
    </li>
    <li>
      <span class="term-bold">AgriConnect</span> ("Connect. Trade. Grow.")
      <br/><span class="term-dim">Tech: React, Node.js, Supabase, Gemini API, LangChain, ChromaDB</span>
      <br/>LinkedIn for Agriculture connecting farmers to verified bulk commercial buyers.
    </li>
    <li>
      <span class="term-bold">Healthcare & Pharmacy Data Analytics Internship (155h)</span>
      <br/><span class="term-dim">VirtualWorks Lab by Emogi (Jul–Aug 2026) | Python, Pandas, Matplotlib</span>
      <br/>GitHub: <a href="https://github.com/sathvika1138/medical-dataset-cleaning-pipeline" target="_blank" rel="noopener" class="term-link">medical-dataset-cleaning-pipeline</a>
    </li>
    <li>
      <span class="term-bold">Ghost in the Machine</span> (Hacktoberfest DEV Challenge)
      <br/><span class="term-dim">Tech: Generative AI, HTML/CSS/JS</span>
      <br/>Halloween AI interactive persona chat website.
    </li>
  </ol>
</div>`;
    this.printHTML(text);
  }

  handleChallenges() {
    if (window.CuriosityPassport) {
      const status = window.CuriosityPassport.getStatus();
      const listItems = status.list
        .map((s) => `<li>[${s.stamped ? "✓ STAMPED" : "LOCKED"}] <span class="term-cmd">passport ${s.key}</span> · ${s.title}</li>`)
        .join("");
      const text = `
<div class="term-box">
  <span class="term-accent term-bold">CURIOSITY PASSPORT STATUS:</span>
  <span class="term-highlight">${status.collected} / ${status.total} stamps collected</span>
  <ul class="term-stamp-checklist">${listItems}</ul>
  <span class="term-dim">Tip: Type 'passport &lt;key&gt;' to collect any stamp right here!</span>
</div>`;
      this.printHTML(text);
    } else {
      this.printLine("Curiosity Passport is loading...");
    }
  }

  handlePassport(arg) {
    if (!arg) {
      this.handleChallenges();
      return;
    }

    if (window.CuriosityPassport) {
      const stamped = window.CuriosityPassport.stampByKey(arg);
      if (stamped) {
        this.printHTML(`
<div class="term-success">
  <span>🎉 STAMP UNLOCKED: <strong>${stamped.title}</strong> (${stamped.organization})!</span>
  <span>"${stamped.whatILearned}"</span>
</div>`);
      } else {
        this.printHTML(`
<span class="term-warn">Could not find challenge matching '${arg}'. Try:</span>
<span class="term-dim">gcloud, salesforce, promptwars, googleskills, microsoft, genai, hacktoberfest, dev</span>`);
      }
    }
  }

  handleJapanese() {
    const randomIndex = Math.floor(Math.random() * JAPANESE_PHRASES.length);
    const item = JAPANESE_PHRASES[randomIndex];
    const text = `
<div class="term-box term-japanese-box">
  <div class="term-jp-kanji">${item.kanji}</div>
  <div class="term-jp-romaji">${item.romaji}</div>
  <div class="term-jp-english">"${item.english}"</div>
  <div class="term-jp-note">💡 ${item.note}</div>
</div>`;
    this.printHTML(text);
  }

  handleVideo() {
    const videoSection = document.getElementById("intro-video-container");

    if (videoSection) {
      videoSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    if (window.PitchPlayer) {
      if (window.PitchPlayer.isPlaying) {
        window.PitchPlayer.pause();
        this.printHTML("<span class=\"term-dim\">⏸ 60-Second Elevator Pitch paused.</span>");
      } else {
        window.PitchPlayer.play();
        this.printHTML("<span class=\"term-success\">▶ Playing 60-Second Elevator Pitch presentation... Enjoy!</span>");
      }
    } else {
      const video = document.getElementById("intro-video");
      if (video) {
        if (video.paused) {
          video.play().catch(() => {});
          this.printHTML("<span class=\"term-success\">▶ Playing video...</span>");
        } else {
          video.pause();
          this.printHTML("<span class=\"term-dim\">⏸ Video paused.</span>");
        }
      } else {
        this.printLine("Intro video player located in the Hero section.");
      }
    }
  }

  handleContact() {
    const text = `
<div class="term-box">
  <span class="term-accent term-bold">CONTACT DIRECTORY:</span>
  <ul class="term-contact-list">
    <li>💻 GitHub: <a href="https://github.com/sathvika1138" target="_blank" rel="noopener" class="term-link">github.com/sathvika1138</a></li>
    <li>💼 LinkedIn: <a href="https://www.linkedin.com/in/sathvika-v-p-6172a7399" target="_blank" rel="noopener" class="term-link">linkedin.com/in/sathvika-v-p-6172a7399</a></li>
    <li>✉️ Email: <a href="mailto:sathvikavp2020@gmail.com" class="term-link">sathvikavp2020@gmail.com</a></li>
    <li>📄 Resume: <a href="assets/resume.pdf" download class="term-link">Download assets/resume.pdf</a></li>
  </ul>
</div>`;
    this.printHTML(text);
  }

  handleTheme() {
    if (typeof window.toggleThemeMode === "function") {
      const newTheme = window.toggleThemeMode();
      this.printHTML(`<span class="term-success">Switched theme mode to: <strong>${newTheme}</strong></span>`);
    } else {
      this.printLine("Theme toggle initialized.");
    }
  }

  handleSudoHire() {
    const art = `
<pre class="term-ascii">
   ___ _   _ ____   ___   _   _ ___ ____  _____ ____  _ 
  / ___| | | |  _ \\ / _ \\ | | | |_ _|  _ \\| ____|  _ \\| |
  \\___ \\ | | | | | | | | || |_| || || |_) |  _| | | | | |
   ___) | |_| | |_| | |_| ||  _  || ||  _ <| |___| |_| |_|
  |____/ \\___/|____/ \\___/ |_| |_|___|_| \\_\\_____|____/(_)
</pre>
<div class="term-hire-celebration">
  <span class="term-hire-title">🚀 PERMISSION GRANTED: SATHVIKA V P HIRED!</span>
  <p>
    Status: 200 OK — Loading unstoppable curiosity, relentless drive,
    full-stack craft, and AI engineering excellence into your team.
  </p>
  <span class="term-accent">Let's build something phenomenal together! 💫</span>
</div>`;
    this.printHTML(art);

    // Fire confetti celebratory burst
    if (typeof window.fireConfetti === "function") {
      window.fireConfetti(150);
    }
  }

  handleUnknown(cmd) {
    const text = `
<span class="term-error">Command not recognized: '<span class="term-highlight">${this.escapeHTML(cmd)}</span>'</span>
<span class="term-dim">Type <span class="term-highlight">'help'</span> to see valid commands, or tap the quick buttons below.</span>`;
    this.printHTML(text);
  }

  clearTerminal() {
    if (this.container) {
      this.container.innerHTML = "";
      this.printInitialGreeting();
    }
  }

  printLine(text, className = "") {
    const line = document.createElement("div");
    if (className) line.className = className;
    line.textContent = text;
    this.container.appendChild(line);
    this.scrollToBottom();
  }

  printHTML(html) {
    const wrapper = document.createElement("div");
    wrapper.className = "term-entry";
    wrapper.innerHTML = html;
    this.container.appendChild(wrapper);
    this.scrollToBottom();
  }

  escapeHTML(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  scrollToBottom() {
    if (this.container) {
      this.container.scrollTop = this.container.scrollHeight;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.PortfolioTerminal = new PortfolioTerminal();
});

