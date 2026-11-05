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
    category: "Languages & Frameworks",
    name: "HTML, CSS, JavaScript",
    belt: "green",
    beltTitle: "Green Belt (Proficient)",
    proficiency: "85%",
    description: "Modern semantic HTML5, responsive CSS grid/flexbox, ES6+ JavaScript, DOM architecture."
  },
  {
    category: "Databases & Cloud",
    name: "Database Management",
    belt: "green",
    beltTitle: "Green Belt (Proficient)",
    proficiency: "80%",
    description: "Relational data schema design, SQL querying, Supabase & PostgreSQL integration."
  },
  {
    category: "Data Science & AI",
    name: "Data Analytics (Healthcare & Viz)",
    belt: "green",
    beltTitle: "Green Belt (Proficient)",
    proficiency: "85%",
    description: "Pandas, NumPy, data cleaning pipelines, adverse drug reaction trends & predictive analytics."
  },
  {
    category: "Generative AI",
    name: "GenAI & Prompt Engineering",
    belt: "green",
    beltTitle: "Green Belt (Proficient)",
    proficiency: "82%",
    description: "Gemini API, LangChain, ChromaDB embeddings, chain-of-thought prompt optimization."
  },
  {
    category: "Core Programming",
    name: "Java",
    belt: "yellow",
    beltTitle: "Yellow Belt (Basics)",
    proficiency: "65%",
    description: "Object-oriented programming, core data structures, algorithms, foundational logic."
  },
  {
    category: "Systems & Logic",
    name: "C++",
    belt: "yellow",
    beltTitle: "Yellow Belt (Basics)",
    proficiency: "60%",
    description: "Algorithmic problem solving, memory concepts, standard template library (STL)."
  },
  {
    category: "Creative Media",
    name: "Video Editing",
    belt: "blue",
    beltTitle: "Blue Belt (Advanced)",
    proficiency: "90%",
    description: "Dynamic pacing, motion graphics, storytelling, audio synchronization & color grading."
  },
  {
    category: "Languages & Culture",
    name: "Japanese (日本語)",
    belt: "white",
    beltTitle: "White Belt (Learning)",
    proficiency: "40%",
    description: "Hiragana, Katakana, beginner Kanji, conversational phrases & grammar fundamentals."
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
// 9. VIDEO PLACEHOLDER HANDLING
// ==========================================
function initVideoPlayer() {
  const video = document.getElementById("intro-video");
  if (!video) return;

  // Graceful error fallback if user has not yet placed their mp4 video
  video.addEventListener("error", () => {
    console.info("Intro video file placeholder active at assets/intro.mp4. Replace with your actual video when ready!");
  });
}

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
