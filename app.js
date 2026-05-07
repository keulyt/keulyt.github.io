(function () {
  "use strict";

  // ================================================================
  //  1. SVG ICON LIBRARY
  // ================================================================
  const ICONS = {
    moon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>`,
    sun: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`,
    arrowLeft: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>`,
    arrowRight: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>`,
    external: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>`,
    skillServers: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"/></svg>`,
    skillLightning: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`,
    skillChart: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>`,
    skillCloud: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/></svg>`,
    skillDatabase: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/></svg>`,
    skillCode: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>`,
    skillNetwork: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>`,
  };

  const ICON_MAP = {
    servers: ICONS.skillServers, lightning: ICONS.skillLightning,
    chart: ICONS.skillChart, cloud: ICONS.skillCloud,
    database: ICONS.skillDatabase, code: ICONS.skillCode, network: ICONS.skillNetwork
  };

  // ================================================================
  //  2. CONTENT LOADER
  // ================================================================
  let skillsData       = null;
  let projectsData     = null;
  let testimonialsData = null;

  async function loadJSON(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load ${path} (HTTP ${res.status})`);
    return res.json();
  }

  async function loadContent() {
    try {
      [skillsData, projectsData, testimonialsData] = await Promise.all([
        loadJSON("skills.json"),
        loadJSON("projects.json"),
        loadJSON("testimonials.json")
      ]);
    } catch (err) {
      console.error("Portfolio content load error:", err);
      document.body.innerHTML = `
        <div class="loading-text">
          ⚠️ Could not load JSON files.<br><br>
          Make sure these files are in the same folder as <code>index.html</code>:<br>
          <code>skills.json</code>, <code>projects.json</code>, <code>testimonials.json</code>
        </div>
      `;
      throw err;
    }
  }

  // ================================================================
  //  3. SECTION RENDERERS
  // ================================================================

  function renderSkills() {
    const colorMap = {
      servers: "blue", lightning: "green", chart: "purple",
      cloud: "cyan", database: "orange", code: "red", network: "blue"
    };

    const grid = document.getElementById("skillsGrid");
    grid.innerHTML = skillsData.categories.map((cat) => {
      const icon  = ICON_MAP[cat.icon]  || "";
      const color = colorMap[cat.icon] || "blue";
      const bars = cat.skills.map(s => `
        <div class="skill-bar-group">
          <div class="skill-bar-label">
            <span>${s.name}</span>
            <span class="pct">${s.level}%</span>
          </div>
          <div class="skill-bar-track">
            <div class="skill-bar-fill" data-width="${s.level}"></div>
          </div>
        </div>
      `).join("");
      return `
        <div class="skill-category reveal">
          <div class="skill-cat-header">
            <div class="skill-cat-icon ${color}">${icon}</div>
            <h3>${cat.title}</h3>
          </div>
          ${bars}
        </div>
      `;
    }).join("");
  }

  function renderProjects() {
    const grid = document.getElementById("projectsGrid");
    grid.innerHTML = projectsData.items.map((p) => {
      const imgPrimary = p.image
        ? `<img src="${p.image}" alt="${p.title}" loading="lazy" />`
        : "";
      const imgSecondary = p.imageHover
        ? `<img src="${p.imageHover}" alt="${p.title}" loading="lazy" />`
        : imgPrimary;

      const features = (p.features || []).map(f => `<li>${f}</li>`).join("");
      const tech = p.tech.map(t => `<span>${t}</span>`).join("");
      const links = p.links.map(l => `
        <a class="proj-btn" href="${l.url}" target="_blank" rel="noopener">
          ${ICONS.external} ${l.label}
        </a>
      `).join("");

      return `
        <div class="project-card reveal">
          <div class="project-image-wrap">
            <div class="project-img-primary">${imgPrimary}</div>
            <div class="project-img-secondary">${imgSecondary}</div>
          </div>
          <div class="project-body">
            <h3>${p.title}</h3>
            <p class="proj-desc">${p.description}</p>
            <p class="proj-features-label">Special Features</p>
            <ul class="proj-features">${features}</ul>
            <p class="proj-tech-label">Technologies</p>
            <div class="proj-tech-tags">${tech}</div>
            <hr class="proj-divider" />
            <div class="proj-buttons">${links}</div>
          </div>
        </div>
      `;
    }).join("");
  }

 function renderTestimonials() {
  const track = document.getElementById("testimonialsTrack");
  

  const allTestimonials = testimonialsData.slides.flat();

  track.innerHTML = allTestimonials.map(t => {
    const stars = "★".repeat(t.stars);
    return `
      <div class="testimonial-card">
        <div class="t-card">
          <div class="t-stars">${stars}</div>
          <p class="t-quote">"${t.quote}"</p>
          <div class="t-author">
            <div class="t-avatar">${t.initials}</div>
            <div>
              <p class="t-name">${t.name}</p>
              <p class="t-date">${t.role}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");

  // Create a dot for every single card
  const dotsWrap = document.getElementById("sliderDots");
  dotsWrap.innerHTML = allTestimonials.map((_, i) =>
    `<button class="slider-dot${i === 0 ? " active" : ""}" data-index="${i}"></button>`
  ).join("");
}

// ================================================================
//  4. CONTACT FORM - EmailJS
// ================================================================

function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) {
    console.warn("Contact form not found on page");
    return;
  }

  emailjs.init({
    publicKey: "WcKIsGzx8-C4X1FMK",
  });

  const formSubmit = document.getElementById('formSubmit');
  const formStatus = document.getElementById('formStatus');

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    formSubmit.disabled = true;
    formSubmit.innerHTML = `<span class="sending-spinner"></span> Sending...`;
    formStatus.textContent = "";

    const serviceID = "service_n07qg9n";
    const templateID = "template_pi5o6sg";   // ← CHANGE THIS

    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        formStatus.style.color = "#00ff88";
        formStatus.textContent = "✅ Message sent successfully!";
        contactForm.reset();
      })
      .catch((error) => {
        console.error("EmailJS Full Error:", error);
        formStatus.style.color = "#ff6b6b";

        if (error.text && error.text.includes("template")) {
          formStatus.innerHTML = `❌ <strong>ID not found.</strong>`;
        } else {
          formStatus.textContent = "❌ Failed to send. Please try again.";
        }
      })
      .finally(() => {
        formSubmit.disabled = false;
        formSubmit.textContent = "Send Message";
      });
  });
}

  // ================================================================
  //  4. UI INTERACTIONS
  // ================================================================

  function initTheme() {
    const root   = document.documentElement;
    const toggle = document.getElementById("themeToggle");
    function getPreferred() {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") return saved;
      return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }
    function apply(theme) {
      root.setAttribute("data-theme", theme);
      toggle.innerHTML = theme === "light" ? ICONS.sun : ICONS.moon;
    }
    apply(getPreferred());
    toggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
      const next    = current === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      apply(next);
    });
  }

  function initMobileNav() {
    const navToggle = document.getElementById("navToggle");
    const mainNav   = document.getElementById("mainNav");
    navToggle.addEventListener("click", () => mainNav.classList.toggle("open"));
    mainNav.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => mainNav.classList.remove("open"))
    );
  }

  function initCursorGlow() {
    const glow = document.querySelector(".cursor-glow");
    let mx = window.innerWidth / 2, my = window.innerHeight / 2, gx = mx, gy = my;
    window.addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; });
    (function loop() {
      gx += (mx - gx) * 0.12;
      gy += (my - gy) * 0.12;
      glow.style.left = `${gx - 260}px`;
      glow.style.top  = `${gy - 260}px`;
      requestAnimationFrame(loop);
    })();
  }

  function initParticles() {
    const canvas = document.createElement("canvas");
    canvas.id = "bg-canvas";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d", { alpha: true });
    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);
    let gx = window.innerWidth / 2, gy = window.innerHeight / 2;
    window.addEventListener("mousemove", e => { gx = e.clientX; gy = e.clientY; });
    const nodes = [];
    for (let i = 0; i < 50; i++) {
      const depth = Math.random() * 0.65 + 0.35;
      nodes.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.9 * depth, vy: (Math.random() - 0.5) * 0.9 * depth,
        r: Math.random() * 1.2 + 1.2 * depth, depth
      });
    }
    (function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const px = (gx / canvas.width  - 0.5) * 26;
      const py = (gy / canvas.height - 0.5) * 26;
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < -40) n.x = canvas.width  + 40;
        if (n.x > canvas.width  + 40) n.x = -40;
        if (n.y < -40) n.y = canvas.height + 40;
        if (n.y > canvas.height + 40) n.y = -40;
        ctx.beginPath();
        ctx.arc(n.x + px * n.depth, n.y + py * n.depth, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,191,255,0.85)";
        ctx.fill();
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const ax = a.x + px * a.depth, ay = a.y + py * a.depth;
          const bx = b.x + px * b.depth, by = b.y + py * b.depth;
          const dx = ax - bx, dy = ay - by;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const threshold = 130 * Math.min(a.depth, b.depth);
          if (dist < threshold) {
            ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by);
            ctx.strokeStyle = `rgba(0,191,255,${(1 - dist / threshold) * 0.22})`;
            ctx.lineWidth = 1; ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    })();
  }

  function initReveal() {
    function onScroll() {
      const wh = window.innerHeight;
      document.querySelectorAll(".reveal").forEach(el => {
        if (el.getBoundingClientRect().top < wh - 80) el.classList.add("active");
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initSkillBars() {
    let animated = false;
    window.addEventListener("scroll", () => {
      if (animated) return;
      const el = document.getElementById("skills");
      if (el && el.getBoundingClientRect().top < window.innerHeight - 100) {
        animated = true;
        document.querySelectorAll(".skill-bar-fill").forEach(bar => {
          bar.style.width = bar.getAttribute("data-width") + "%";
        });
      }
    }, { passive: true });
  }

function initSlider() {
  const track = document.getElementById("testimonialsTrack");
  const dots = document.querySelectorAll(".slider-dot");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");

  let current = 0;
  const cards = track.querySelectorAll('.testimonial-card');
  const total = cards.length;

 function goTo(index) {
  const totalCards = track.querySelectorAll('.testimonial-card').length;
  current = (index + totalCards) % totalCards;

  // Check if mobile
  const isMobile = window.innerWidth <= 860;
  const moveAmount = isMobile ? current * 100 : current * 50;
  
  track.style.transform = `translateX(-${moveAmount}%)`;

  const dots = document.querySelectorAll(".slider-dot");
  dots.forEach((dot, i) => dot.classList.toggle("active", i === current));
}

  nextBtn.addEventListener("click", () => goTo(current + 1));
  prevBtn.addEventListener("click", () => goTo(current - 1));

  dots.forEach(dot => {
    dot.addEventListener("click", () => goTo(parseInt(dot.dataset.index)));
  });

  // Auto-play
  setInterval(() => goTo(current + 1), 5000);
}

  function initActiveNav() {
    window.addEventListener("scroll", () => {
      const sections = document.querySelectorAll("section[id]");
      let currentId = "";
      sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 120) currentId = section.getAttribute("id");
      });
      document.querySelectorAll(".nav a").forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + currentId);
      });
    }, { passive: true });
  }

  function initFooterYear() {
    const el = document.getElementById("footerYear");
    if (el) el.textContent = new Date().getFullYear();
  }

  // ================================================================
  //  5. BOOTSTRAP
  // ================================================================
  async function init() {
    await loadContent();
    renderSkills();
    renderProjects();
    renderTestimonials();
    initFooterYear();
    initTheme();
    initMobileNav();
    initCursorGlow();
    initParticles();
    initReveal();
    initSkillBars();
    initSlider();
    initActiveNav();
    initContactForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
