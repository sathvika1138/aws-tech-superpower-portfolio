/**
 * ============================================================================
 * CURIOSITY PASSPORT DATA & LOGIC (js/passport.js)
 * ============================================================================
 * EDITABLE CONTENT:
 * Edit the PASSPORT_STAMPS array below to customize challenge descriptions,
 * takeaways ("what I learned"), and badge metadata.
 * ============================================================================
 */

const PASSPORT_STAMPS = [
  {
    id: "gcloud-arcade",
    key: "gcloud",
    title: "Google Cloud Arcade",
    organization: "Google Cloud",
    badgeDate: "2024 - 2026",
    color: "#4285F4",
    icon: "☁️",
    kanji: "雲", // Cloud
    whatItWas: "Hands-on cloud skill badges covering compute, storage, security, and cloud architecture via interactive Qwiklabs/Cloud Skills Boost challenges.",
    whatILearned: "Mastered cloud deployment essentials, IAM role governance, and serverless compute workflows."
  },
  {
    id: "salesforce-trailhead",
    key: "salesforce",
    title: "Salesforce Trailhead",
    organization: "Salesforce",
    badgeDate: "2024 - 2026",
    color: "#00A1E0",
    icon: "⚡",
    kanji: "道", // Path / Trail
    whatItWas: "Gamified learning quests tackling CRM ecosystems, relational data schemas, workflow automation, and enterprise business processes.",
    whatILearned: "Understood data modeling at enterprise scale and how automated triggers streamline user operations."
  },
  {
    id: "prompt-virtual-wars",
    key: "promptwars",
    title: "PromptVirtual Wars",
    organization: "AI Hackathons & Challenges",
    badgeDate: "2025 - 2026",
    color: "#8B5CF6",
    icon: "⚔️",
    kanji: "創", // Creation / Innovation
    whatItWas: "Competitive prompt engineering and GenAI problem-solving showdown optimizing token efficiency, chain-of-thought, and output constraints.",
    whatILearned: "Gained precision in multi-step LLM prompting, system instruction steering, and hallucination reduction."
  },
  {
    id: "google-skills",
    key: "googleskills",
    title: "Google Skills Communities",
    organization: "Google Developer Groups",
    badgeDate: "2024 - 2026",
    color: "#EA4335",
    icon: "👥",
    kanji: "友", // Fellowship / Community
    whatItWas: "Collaborative developer study jams, code sprints, and technical workshops focused on emerging AI tools and open platforms.",
    whatILearned: "Learned the value of community-driven open source problem-solving and rapid peer code reviews."
  },
  {
    id: "microsoft-events",
    key: "microsoft",
    title: "Microsoft Events & Courses",
    organization: "Microsoft Learn",
    badgeDate: "2024 - 2026",
    color: "#00A4EF",
    icon: "💻",
    kanji: "礎", // Foundation
    whatItWas: "Technical event series and learning paths spanning foundational data engineering, Azure fundamentals, and Copilot integrations.",
    whatILearned: "Acquired structured principles for robust data pipelines and scalable cloud-based ML services."
  },
  {
    id: "genai-apac",
    key: "genai",
    title: "GenAI APAC",
    organization: "APAC AI Initiative",
    badgeDate: "2025 - 2026",
    color: "#EC4899",
    icon: "🌏",
    kanji: "智", // Intelligence
    whatItWas: "Regional Asia-Pacific summit and coding challenges focusing on frontier Generative AI models, multimodal reasoning, and localized AI solutions.",
    whatILearned: "Discovered how to bridge foundational LLMs with local cultural nuances and real-world domain constraints."
  },
  {
    id: "hacktoberfest",
    key: "hacktoberfest",
    title: "Hacktoberfest",
    organization: "DigitalOcean & Open Source",
    badgeDate: "October 2024 / 2025",
    color: "#FF7849",
    icon: "🎃",
    kanji: "祭", // Festival / Celebration
    whatItWas: "Global month-long celebration of open-source software, encouraging quality pull requests and collaborative repository contributions.",
    whatILearned: "Cultivated Git hygiene, branch management, collaborative issue resolution, and open-source etiquette."
  },
  {
    id: "dev-community",
    key: "dev",
    title: "DEV Community",
    organization: "Forem / DEV.to",
    badgeDate: "2025 - 2026",
    color: "#10B981",
    icon: "👻",
    kanji: "匠", // Artisan / Craftsman
    whatItWas: "Open-source AI challenge on DEV platform, building the Halloween-inspired 'Ghost in the Machine' AI interactive chat website.",
    whatILearned: "Transformed creative thematic concepts into living web apps with rapid prompt crafting and vanilla UI interactions."
  }
];

class CuriosityPassport {
  constructor() {
    this.storageKey = "sathvika_curiosity_passport_v1";
    this.stamps = PASSPORT_STAMPS;
    this.stampedIds = this.loadProgress();
    this.modalEl = null;
    this.init();
  }

  loadProgress() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return new Set(parsed);
        }
      }
    } catch (e) {
      console.warn("Could not read passport progress from localStorage:", e);
    }
    // Default: 3 initial stamps already unlocked to make the passport instantly engaging!
    return new Set(["gcloud-arcade", "hacktoberfest", "dev-community"]);
  }

  saveProgress() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify([...this.stampedIds]));
    } catch (e) {
      console.warn("Could not persist passport progress to localStorage:", e);
    }
  }

  init() {
    this.renderPassport();
    this.setupModal();
    this.updateCounter();

    // Reset button handler
    const resetBtn = document.getElementById("passport-reset-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => this.resetStamps());
    }

    // Collect all button handler
    const collectAllBtn = document.getElementById("passport-collect-all-btn");
    if (collectAllBtn) {
      collectAllBtn.addEventListener("click", () => this.stampAll());
    }
  }

  renderPassport() {
    const grid = document.getElementById("passport-grid");
    if (!grid) return;

    grid.innerHTML = "";
    this.stamps.forEach((stamp, index) => {
      const isStamped = this.stampedIds.has(stamp.id);
      const card = document.createElement("article");
      card.className = `passport-stamp-card ${isStamped ? "is-stamped" : "is-locked"}`;
      card.id = `stamp-card-${stamp.id}`;
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `${stamp.title} (${isStamped ? "Collected" : "Locked - click to collect"})`);

      // Varied rotation angles for genuine physical stamp look
      const rotations = [-4, 3, -2, 5, -3, 4, -5, 2];
      const rotation = rotations[index % rotations.length];

      card.innerHTML = `
        <div class="stamp-seal" style="--stamp-color: ${stamp.color}; --stamp-rot: ${rotation}deg;">
          <div class="seal-inner">
            <span class="seal-kanji" aria-hidden="true">${stamp.kanji}</span>
            <span class="seal-icon">${stamp.icon}</span>
            <span class="seal-org">${stamp.organization}</span>
            <span class="seal-badge-title">${stamp.title}</span>
            <span class="seal-status-tag">${isStamped ? "VERIFIED ✓" : "LOCKED 🔒"}</span>
          </div>
        </div>
        <div class="stamp-info">
          <h3 class="stamp-title">${stamp.title}</h3>
          <p class="stamp-org">${stamp.organization} · <span class="stamp-date">${stamp.badgeDate}</span></p>
          <div class="stamp-action-row">
            <span class="stamp-status-pill ${isStamped ? "pill-collected" : "pill-locked"}">
              ${isStamped ? "✓ Stamped & Inspected" : "Tap to Stamp ✦"}
            </span>
          </div>
        </div>
      `;

      // Event listeners
      const handleAction = () => {
        this.stampAndInspect(stamp.id);
      };

      card.addEventListener("click", handleAction);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleAction();
        }
      });

      grid.appendChild(card);
    });
  }

  stampAndInspect(id, triggerConfettiOnComplete = true) {
    const stamp = this.stamps.find((s) => s.id === id || s.key === id);
    if (!stamp) return null;

    const wasAlreadyStamped = this.stampedIds.has(stamp.id);
    this.stampedIds.add(stamp.id);
    this.saveProgress();

    // Update UI card
    const card = document.getElementById(`stamp-card-${stamp.id}`);
    if (card) {
      card.classList.remove("is-locked");
      card.classList.add("is-stamped");
      card.setAttribute("aria-label", `${stamp.title} (Collected)`);
      
      const seal = card.querySelector(".stamp-seal");
      if (seal && !wasAlreadyStamped) {
        seal.classList.remove("stamp-pop");
        // Force reflow
        void seal.offsetWidth;
        seal.classList.add("stamp-pop");
      }

      const statusTag = card.querySelector(".seal-status-tag");
      if (statusTag) statusTag.textContent = "VERIFIED ✓";

      const pill = card.querySelector(".stamp-status-pill");
      if (pill) {
        pill.className = "stamp-status-pill pill-collected";
        pill.textContent = "✓ Stamped & Inspected";
      }
    }

    this.updateCounter(triggerConfettiOnComplete);
    this.openModal(stamp);
    return stamp;
  }

  stampByKey(keyOrName) {
    const clean = keyOrName.toLowerCase().trim();
    const found = this.stamps.find(
      (s) =>
        s.id.toLowerCase().includes(clean) ||
        s.key.toLowerCase().includes(clean) ||
        s.title.toLowerCase().includes(clean)
    );
    if (found) {
      return this.stampAndInspect(found.id);
    }
    return null;
  }

  stampAll() {
    this.stamps.forEach((s) => this.stampedIds.add(s.id));
    this.saveProgress();
    this.renderPassport();
    this.updateCounter(true);
  }

  resetStamps() {
    if (confirm("Reset your Curiosity Passport progress? You can collect the stamps again anytime!")) {
      this.stampedIds.clear();
      this.saveProgress();
      this.renderPassport();
      this.updateCounter(false);
      const completionCard = document.getElementById("passport-completion-card");
      if (completionCard) {
        completionCard.classList.remove("is-visible");
      }
    }
  }

  updateCounter(triggerFireworks = true) {
    const count = this.stampedIds.size;
    const total = this.stamps.length;
    const counterEl = document.getElementById("passport-counter");
    const progressFill = document.getElementById("passport-progress-fill");
    const completionCard = document.getElementById("passport-completion-card");

    if (counterEl) {
      counterEl.textContent = `${count}/${total} stamps collected`;
    }

    if (progressFill) {
      const pct = Math.round((count / total) * 100);
      progressFill.style.width = `${pct}%`;
      progressFill.setAttribute("aria-valuenow", pct);
    }

    if (count === total) {
      if (completionCard) {
        completionCard.classList.add("is-visible");
      }
      if (triggerFireworks && typeof window.fireConfetti === "function") {
        window.fireConfetti(120);
      }
    } else {
      if (completionCard) {
        completionCard.classList.remove("is-visible");
      }
    }
  }

  setupModal() {
    let modal = document.getElementById("passport-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "passport-modal";
      modal.className = "passport-modal-backdrop";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      modal.setAttribute("aria-hidden", "true");
      modal.innerHTML = `
        <div class="passport-modal-content">
          <button class="modal-close-btn" id="modal-close-btn" aria-label="Close modal">&times;</button>
          <div class="modal-header">
            <div class="modal-seal-badge" id="modal-seal-badge"></div>
            <div>
              <span class="modal-kicker" id="modal-kicker">CURIOSITY PASSPORT LOG</span>
              <h3 class="modal-title" id="modal-title"></h3>
              <p class="modal-subtitle" id="modal-subtitle"></p>
            </div>
          </div>
          <div class="modal-body">
            <div class="modal-section">
              <h4 class="modal-section-title">🔍 What it was</h4>
              <p id="modal-what-it-was" class="modal-text"></p>
            </div>
            <div class="modal-section">
              <h4 class="modal-section-title">💡 What I learned</h4>
              <p id="modal-what-i-learned" class="modal-text modal-highlight"></p>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" id="modal-ack-btn">Keep Exploring</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      const close = () => this.closeModal();
      modal.addEventListener("click", (e) => {
        if (e.target === modal) close();
      });
      modal.querySelector("#modal-close-btn").addEventListener("click", close);
      modal.querySelector("#modal-ack-btn").addEventListener("click", close);
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("is-open")) {
          close();
        }
      });
    }
    this.modalEl = modal;
  }

  openModal(stamp) {
    if (!this.modalEl) return;
    this.modalEl.classList.add("is-open");
    this.modalEl.setAttribute("aria-hidden", "false");

    const badge = this.modalEl.querySelector("#modal-seal-badge");
    const title = this.modalEl.querySelector("#modal-title");
    const subtitle = this.modalEl.querySelector("#modal-subtitle");
    const whatWas = this.modalEl.querySelector("#modal-what-it-was");
    const whatLearned = this.modalEl.querySelector("#modal-what-i-learned");

    if (badge) {
      badge.innerHTML = `<span style="font-size: 2.2rem;">${stamp.icon}</span>`;
      badge.style.borderColor = stamp.color;
    }
    if (title) title.textContent = stamp.title;
    if (subtitle) subtitle.textContent = `${stamp.organization} · ${stamp.badgeDate}`;
    if (whatWas) whatWas.textContent = stamp.whatItWas;
    if (whatLearned) whatLearned.textContent = stamp.whatILearned;

    // Shift focus to close button
    const closeBtn = this.modalEl.querySelector("#modal-close-btn");
    if (closeBtn) closeBtn.focus();
  }

  closeModal() {
    if (!this.modalEl) return;
    this.modalEl.classList.remove("is-open");
    this.modalEl.setAttribute("aria-hidden", "true");
  }

  getStatus() {
    return {
      collected: this.stampedIds.size,
      total: this.stamps.length,
      list: this.stamps.map((s) => ({
        id: s.id,
        key: s.key,
        title: s.title,
        stamped: this.stampedIds.has(s.id)
      }))
    };
  }
}

// Global instance export
document.addEventListener("DOMContentLoaded", () => {
  window.CuriosityPassport = new CuriosityPassport();
});

