/**
 * ============================================================================
 * MAIN PORTFOLIO CONTROLLER (js/main.js)
 * ============================================================================
 * Contains theme switching, navigation, typing animation, scroll observers,
 * and the zero-dependency celebratory confetti engine.
 * ============================================================================
 */

// ==========================================
// 1. EDITABLE SKILLS & PROJECTS DATA SOURCE
// ==========================================
const SKILLS_DATA = [
  {
    category: "AI & Machine Learning",
    name: "Python, NLP & RAG",
    belt: "green",
    beltTitle: "Green Belt (Proficient)",
    proficiency: "88%",
    description: "Hands-on machine learning, document chunking, semantic similarity, FAISS/ChromaDB vector stores."
  },
  {
    category: "Generative AI",
    name: "GenAI & LLM Frameworks",
    belt: "green",
    beltTitle: "Green Belt (Proficient)",
    proficiency: "85%",
    description: "LangChain, ChromaDB, FAISS, Ollama, Google Generative AI SDK, prompt engineering."
  },
  {
    category: "Web & UI Frameworks",
    name: "HTML, CSS, JavaScript & Streamlit",
    belt: "green",
    beltTitle: "Green Belt (Proficient)",
    proficiency: "85%",
    description: "Semantic web architecture, responsive CSS layout, vanilla JavaScript, interactive recruiter dashboards."
  },
  {
    category: "Data Science & Analytics",
    name: "Data Analytics & Cleaning",
    belt: "green",
    beltTitle: "Green Belt (Proficient)",
    proficiency: "85%",
    description: "Pandas, NumPy, automated data cleaning pipelines, adverse drug reaction trends, exploratory viz."
  },
  {
    category: "Databases & Systems",
    name: "Database Management (DBMS)",
    belt: "green",
    beltTitle: "Green Belt (Proficient)",
    proficiency: "80%",
    description: "Relational data schema design, SQL querying, Supabase & PostgreSQL cloud integration."
  },
  {
    category: "Core Programming",
    name: "Java",
    belt: "yellow",
    beltTitle: "Yellow Belt (Basics)",
    proficiency: "65%",
    description: "Object-oriented programming (OOP), core data structures, algorithms, foundational logic."
  },
  {
    category: "Systems Programming",
    name: "C++ & C",
    belt: "yellow",
    beltTitle: "Yellow Belt (Basics)",
    proficiency: "62%",
    description: "Algorithmic problem solving, pointer concepts, standard template library (STL)."
  },
  {
    category: "Creative Media",
    name: "Video Editing",
    belt: "blue",
    beltTitle: "Blue Belt (Advanced)",
    proficiency: "90%",
    description: "Dynamic pacing, motion storytelling, visual rhythm, audio synchronization & color grading."
  },
  {
    category: "Developer Tools",
    name: "Git, GitHub & VS Code",
    belt: "blue",
    beltTitle: "Blue Belt (Advanced)",
    proficiency: "86%",
    description: "Version control hygiene, branch workflows, open-source PRs, Jupyter Notebooks."
  },
  {
    category: "Languages & Culture",
    name: "Japanese (日本語)",
    belt: "white",
    beltTitle: "White Belt (Learning)",
    proficiency: "42%",
    description: "Hiragana, Katakana, beginner Kanji, conversational phrases, embracing the Kaizen philosophy."
  }
];

// ==========================================
// 2. THEME CONTROLLER (LIGHT / DARK)
// ==========================================
const THEME_STORAGE_KEY = "sathvika_portfolio_theme_v1";

function getInitialTheme() {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch (e) {
    console.warn("Theme storage read warning:", e);
  }
  // Default to dark theme as requested
  return "dark";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const themeBtn = document.getElementById("theme-toggle-btn");
  if (themeBtn) {
    const isDark = theme === "dark";
    themeBtn.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    themeBtn.setAttribute("title", isDark ? "Switch to light theme" : "Switch to dark theme");
    const icon = themeBtn.querySelector(".theme-icon");
    if (icon) {
      icon.textContent = isDark ? "☀️" : "🌙";
    }
  }
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (e) {
    console.warn("Theme storage save warning:", e);
  }
}

window.toggleThemeMode = function () {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  return next;
};

// ==========================================
// 3. TYPING ANIMATION IN HERO
// ==========================================
function initTypingAnimation() {
  const el = document.getElementById("typing-name");
  if (!el) return;

  const textToType = "Sathvika V P";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion) {
    el.textContent = textToType;
    return;
  }

  el.textContent = "";
  let charIndex = 0;
  const speed = 110; // ms per char

  function typeChar() {
    if (charIndex < textToType.length) {
      el.textContent += textToType.charAt(charIndex);
      charIndex++;
      setTimeout(typeChar, speed);
    }
  }

  // Brief initial pause before typing starts
  setTimeout(typeChar, 350);
}

// ==========================================
// 4. NAVIGATION & MOBILE MENU
// ==========================================
function initNavigation() {
  const navToggle = document.getElementById("mobile-nav-toggle");
  const navMenu = document.getElementById("primary-nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const header = document.querySelector(".site-header");

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.contains("is-open");
      navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", !isOpen);
      navToggle.classList.toggle("is-active");
    });

    // Close menu when clicking any nav link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.classList.remove("is-active");
      });
    });

    // Close on click outside
    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains("is-open")) {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.classList.remove("is-active");
      }
    });

    // Close on Escape
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("is-open")) {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.classList.remove("is-active");
        navToggle.focus();
      }
    });
  }

  // Header scroll shadow
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  }, { passive: true });

  // Scrollspy for active nav link
  const sections = document.querySelectorAll("section[id]");
  const observerOptions = {
    rootMargin: "-25% 0px -65% 0px"
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((sec) => sectionObserver.observe(sec));
}

// ==========================================
// 5. SCROLL FADE-IN ANIMATIONS
// ==========================================
function initScrollAnimations() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) {
    document.querySelectorAll(".fade-on-scroll").forEach((el) => {
      el.classList.add("fade-in-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".fade-on-scroll").forEach((el) => observer.observe(el));
}

// ==========================================
// 6. RENDER SKILLS WITH MARTIAL-ARTS BELTS
// ==========================================
function renderSkills() {
  const container = document.getElementById("skills-grid");
  if (!container) return;

  container.innerHTML = "";

  SKILLS_DATA.forEach((skill) => {
    const card = document.createElement("div");
    card.className = `skill-card belt-border-${skill.belt} fade-on-scroll`;
    card.setAttribute("tabindex", "0");

    card.innerHTML = `
      <div class="skill-card-top">
        <span class="belt-badge belt-${skill.belt}">
          <span class="belt-knot" aria-hidden="true"></span>
          ${skill.beltTitle}
        </span>
        <span class="skill-cat-pill">${skill.category}</span>
      </div>
      <h3 class="skill-title">${skill.name}</h3>
      <p class="skill-desc">${skill.description}</p>
      <div class="skill-progress-wrap">
        <div class="skill-progress-bar">
          <div class="skill-progress-fill progress-${skill.belt}" style="width: ${skill.proficiency};" role="progressbar" aria-valuenow="${parseInt(skill.proficiency, 10)}" aria-valuemin="0" aria-valuemax="100" aria-label="${skill.name} proficiency"></div>
        </div>
        <span class="skill-percent">${skill.proficiency}</span>
      </div>
    `;

    container.appendChild(card);
  });
}

// ==========================================
// 7. PURE JS/CANVAS CONFETTI ENGINE
// ==========================================
window.fireConfetti = function (particleCount = 100) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) return;

  let canvas = document.getElementById("confetti-canvas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "confetti-canvas";
    canvas.className = "confetti-canvas";
    document.body.appendChild(canvas);
  }

  const ctx = canvas.getContext("2d");
  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  const colors = ["#FF6B4A", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6", "#EC4899", "#F8FAFC"];
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: width * (0.3 + Math.random() * 0.4),
      y: height * (0.4 + Math.random() * 0.2),
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.9) * 18,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      gravity: 0.35,
      friction: 0.98,
      alpha: 1,
      decay: Math.random() * 0.015 + 0.008
    });
  }

  let animationFrameId;

  function render() {
    ctx.clearRect(0, 0, width, height);

    let activeParticles = 0;

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= p.friction;
      p.vy *= p.friction;
      p.rotation += p.rotationSpeed;
      p.alpha -= p.decay;

      if (p.alpha > 0) {
        activeParticles++;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }
    });

    if (activeParticles > 0) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, width, height);
      cancelAnimationFrame(animationFrameId);
    }
  }

  render();
};

// ==========================================
// 8. TODO PLACEHOLDER MODAL / TOOLTIP
// ==========================================
function initTodoButtons() {
  document.querySelectorAll("[data-todo]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const message = btn.getAttribute("data-todo") || "Link placeholder: please configure your URL.";
      alert(`[TODO Placeholder]\n${message}\n\nYou can easily update this in index.html!`);
    });
  });
}

// ==========================================
// 9. 60-SECOND VIRTUAL PITCH & VIDEO CONTROLLER
// ==========================================
class PitchPlayerController {
  constructor() {
    this.playerEl = document.getElementById("pitch-player");
    this.videoEl = document.getElementById("intro-video");
    this.playOverlay = document.getElementById("pitch-play-overlay");
    this.playToggleBtn = document.getElementById("pitch-play-toggle");
    this.timelineBar = document.getElementById("pitch-timeline");
    this.progressBar = document.getElementById("pitch-progress");
    this.timerEl = document.getElementById("pitch-timer");
    this.voiceToggleBtn = document.getElementById("pitch-voice-toggle");
    this.restartBtn = document.getElementById("pitch-restart-btn");
    this.chapterText = document.getElementById("pitch-chapter-text");
    this.subtitlesText = document.getElementById("pitch-subtitles-text");
    this.modeToggleBtn = document.getElementById("video-mode-toggle");
    this.captionLabel = document.getElementById("video-caption-label");

    this.isPlaying = false;
    this.currentTime = 0; // 0 to 60 seconds
    this.totalDuration = 60; // 60 seconds
    this.timerInterval = null;
    this.voiceEnabled = true;
    this.currentMode = "pitch"; // "pitch" or "mp4"

    this.chapters = [
      {
        start: 0,
        end: 12,
        title: "CH 1: INTRODUCTION",
        slide: 1,
        speech: "Hello, I am Sathvika V P, an Artificial Intelligence and Data Science undergraduate at R M K Engineering College, graduating class of 2029. Curious by nature, builder by habit."
      },
      {
        start: 12,
        end: 24,
        title: "CH 2: AI & RAG SYSTEMS",
        slide: 2,
        speech: "I build practical AI applications, including FileBot, a retrieval augmented generation chatbot for document intelligence, and automated resume ranking engines using semantic similarity."
      },
      {
        start: 24,
        end: 36,
        title: "CH 3: HEALTHCARE ANALYTICS",
        slide: 3,
        speech: "I completed an intensive 155-hour healthcare data analytics internship at VirtualWorks Lab by Emogi, developing predictive models for pharmacy sales and automated data cleaning."
      },
      {
        start: 36,
        end: 48,
        title: "CH 4: MEDIA & KAIZEN",
        slide: 4,
        speech: "Beyond code, I love dynamic video editing and motion storytelling, and I am learning beginner Japanese while embracing continuous improvement, or Kaizen."
      },
      {
        start: 48,
        end: 60,
        title: "CH 5: LET'S COLLABORATE",
        slide: 5,
        speech: "I love collecting engineering challenges and collaborating with fellow builders. Connect with me on LinkedIn, GitHub, or email at sathvikavp2020@gmail.com!"
      }
    ];

    this.slides = document.querySelectorAll(".pitch-slide");
    this.init();
  }

  init() {
    if (!this.playerEl) return;

    // Overlay play click
    if (this.playOverlay) {
      this.playOverlay.addEventListener("click", () => this.play());
    }

    // Toggle button click
    if (this.playToggleBtn) {
      this.playToggleBtn.addEventListener("click", () => this.togglePlay());
    }

    // Timeline scrubber click
    if (this.timelineBar) {
      this.timelineBar.addEventListener("click", (e) => this.handleTimelineClick(e));
    }

    // Voice toggle
    if (this.voiceToggleBtn) {
      this.voiceToggleBtn.addEventListener("click", () => this.toggleVoice());
    }

    // Restart button
    if (this.restartBtn) {
      this.restartBtn.addEventListener("click", () => this.restart());
    }

    // Mode Switcher (Interactive Pitch vs Raw MP4)
    if (this.modeToggleBtn) {
      this.modeToggleBtn.addEventListener("click", () => this.toggleMode());
    }

    // Video error handling for raw mp4 mode
    if (this.videoEl) {
      this.videoEl.addEventListener("error", () => {
        console.info("Notice: assets/intro.mp4 placeholder is ready for your uploaded H.264 video.");
      });
    }

    // Render initial state
    this.updateUI();
  }

  play() {
    if (this.currentMode === "mp4" && this.videoEl) {
      this.videoEl.play().catch(() => {});
      return;
    }

    this.isPlaying = true;
    this.playerEl.classList.add("is-playing");
    if (this.playToggleBtn) this.playToggleBtn.textContent = "⏸";

    if (this.currentTime >= this.totalDuration) {
      this.currentTime = 0;
    }

    // Start playback interval (every 250ms = 0.25s)
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.currentTime += 0.25;
      if (this.currentTime >= this.totalDuration) {
        this.currentTime = this.totalDuration;
        this.pause();
      }
      this.updateUI();
    }, 250);

    this.speakCurrentChapter();
    this.playSynthTone(440, 0.1);
  }

  pause() {
    this.isPlaying = false;
    clearInterval(this.timerInterval);
    if (this.playerEl) this.playerEl.classList.remove("is-playing");
    if (this.playToggleBtn) this.playToggleBtn.textContent = "▶";

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  restart() {
    this.currentTime = 0;
    this.updateUI();
    this.play();
  }

  handleTimelineClick(e) {
    const rect = this.timelineBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    this.currentTime = Math.round(ratio * this.totalDuration);
    this.updateUI();
    if (this.isPlaying) {
      this.speakCurrentChapter();
    }
  }

  toggleVoice() {
    this.voiceEnabled = !this.voiceEnabled;
    if (this.voiceToggleBtn) {
      this.voiceToggleBtn.textContent = this.voiceEnabled ? "🔊 Voice On" : "🔇 Voice Off";
    }
    if (!this.voiceEnabled && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    } else if (this.voiceEnabled && this.isPlaying) {
      this.speakCurrentChapter();
    }
  }

  toggleMode() {
    if (this.currentMode === "pitch") {
      this.pause();
      this.currentMode = "mp4";
      this.playerEl.style.display = "none";
      if (this.videoEl) {
        this.videoEl.style.display = "block";
        this.videoEl.play().catch(() => {});
      }
      if (this.modeToggleBtn) this.modeToggleBtn.textContent = "Switch to 60s Pitch Mode";
      if (this.captionLabel) this.captionLabel.textContent = "🎬 Raw MP4 Video Player (assets/intro.mp4)";
    } else {
      if (this.videoEl) {
        this.videoEl.pause();
        this.videoEl.style.display = "none";
      }
      this.currentMode = "pitch";
      this.playerEl.style.display = "flex";
      if (this.modeToggleBtn) this.modeToggleBtn.textContent = "Switch to MP4 Video";
      if (this.captionLabel) this.captionLabel.textContent = "🎬 60-Second Interactive Elevator Pitch";
      this.updateUI();
    }
  }

  updateUI() {
    // Progress %
    const pct = Math.min(100, (this.currentTime / this.totalDuration) * 100);
    if (this.progressBar) {
      this.progressBar.style.width = `${pct}%`;
    }

    // Time text
    const secs = Math.floor(this.currentTime);
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    const formatted = `${String(mins).padStart(2, "0")}:${String(remSecs).padStart(2, "0")}`;
    if (this.timerEl) {
      this.timerEl.textContent = `${formatted} / 01:00`;
    }

    // Find current chapter
    const currentChapter = this.chapters.find(
      (c) => this.currentTime >= c.start && this.currentTime < c.end
    ) || this.chapters[this.chapters.length - 1];

    if (this.chapterText && currentChapter) {
      this.chapterText.textContent = currentChapter.title;
    }

    if (this.subtitlesText && currentChapter) {
      this.subtitlesText.textContent = `"${currentChapter.speech}"`;
    }

    // Active slide
    if (currentChapter) {
      this.slides.forEach((s) => {
        const slideIdx = parseInt(s.getAttribute("data-slide"), 10);
        if (slideIdx === currentChapter.slide) {
          s.classList.add("is-active");
        } else {
          s.classList.remove("is-active");
        }
      });
    }
  }

  speakCurrentChapter() {
    if (!this.voiceEnabled || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const currentChapter = this.chapters.find(
      (c) => this.currentTime >= c.start && this.currentTime < c.end
    );

    if (!currentChapter) return;

    const utterance = new SpeechSynthesisUtterance(currentChapter.speech);
    utterance.rate = 1.05;
    utterance.pitch = 1.05;
    window.speechSynthesis.speak(utterance);
  }

  playSynthTone(freq = 520, duration = 0.08) {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // AudioContext policy on unmuted interaction
    }
  }
}

function initVideoPlayer() {
  window.PitchPlayer = new PitchPlayerController();
}

window.playIntroPitch = function () {
  if (window.PitchPlayer) {
    window.PitchPlayer.play();
  }
};

window.pauseIntroPitch = function () {
  if (window.PitchPlayer) {
    window.PitchPlayer.pause();
  }
};

// ==========================================
// DOM READY INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // Theme init
  const initialTheme = getInitialTheme();
  applyTheme(initialTheme);

  const themeBtn = document.getElementById("theme-toggle-btn");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => window.toggleThemeMode());
  }

  // Core behaviors
  initTypingAnimation();
  initNavigation();
  renderSkills();
  initScrollAnimations();
  initTodoButtons();
  initVideoPlayer();

  // Resize listener for confetti canvas
  window.addEventListener("resize", () => {
    const canvas = document.getElementById("confetti-canvas");
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }, { passive: true });
});

