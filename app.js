document.addEventListener("DOMContentLoaded", function () {
  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // =========================
  // Dark mode toggle (saved)
  // =========================
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");

  function getPreferredTheme() {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  function applyTheme(theme) {
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme");
    }
  }

  applyTheme(getPreferredTheme());

  if (toggle) {
    toggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
      const next = current === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      applyTheme(next);
    });
  }

  // =========================
  // Cursor glow follow
  // =========================
  const glow = document.querySelector(".cursor-glow");
  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let gx = mx;
  let gy = my;

  window.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
  });

  function animateGlow() {
    gx += (mx - gx) * 0.12;
    gy += (my - gy) * 0.12;
    if (glow) {
      glow.style.left = `${gx - 260}px`;
      glow.style.top = `${gy - 260}px`;
    }
    requestAnimationFrame(animateGlow);
  }
  animateGlow();

  // =========================
  // Background particles (depth + parallax)
  // =========================
  const canvas = document.createElement("canvas");
  canvas.id = "bg-canvas";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d", { alpha: true });

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const nodes = [];
  const nodeCount = 60;

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  for (let i = 0; i < nodeCount; i++) {
    const depth = rand(0.35, 1.0); // closer = 1.0, farther = 0.35
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.9 * depth,
      vy: (Math.random() - 0.5) * 0.9 * depth,
      r: rand(1.2, 2.4) * depth,
      depth
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const px = (gx / window.innerWidth - 0.5) * 26;
    const py = (gy / window.innerHeight - 0.5) * 26;

    // points
    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < -40) n.x = canvas.width + 40;
      if (n.x > canvas.width + 40) n.x = -40;
      if (n.y < -40) n.y = canvas.height + 40;
      if (n.y > canvas.height + 40) n.y = -40;

      const ox = n.x + px * n.depth;
      const oy = n.y + py * n.depth;

      ctx.beginPath();
      ctx.arc(ox, oy, n.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,191,255,0.85)";
      ctx.fill();
    }

    // connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];

        const ax = a.x + px * a.depth;
        const ay = a.y + py * a.depth;
        const bx = b.x + px * b.depth;
        const by = b.y + py * b.depth;

        const dx = ax - bx;
        const dy = ay - by;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const threshold = 130 * Math.min(a.depth, b.depth);

        if (dist < threshold) {
          const alpha = (1 - dist / threshold) * 0.22;
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.strokeStyle = `rgba(0,191,255,${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(drawParticles);
  }
  drawParticles();

  // =========================
  // Scroll reveal
  // =========================
  const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    const wh = window.innerHeight;
    reveals.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < wh - 120) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll, { passive: true });
  revealOnScroll();

  // =========================
  // Snap scrolling assist (desktop only)
  // Helps snap feel intentional (not janky)
  // =========================
  const snapContainer = document.querySelector(".snap");
  const snapSections = Array.from(document.querySelectorAll(".snap-section"));

  function isSnapEnabled() {
    return window.matchMedia("(min-width: 861px)").matches && snapContainer;
  }

  let wheelLock = false;

  window.addEventListener("wheel", (e) => {
    if (!isSnapEnabled() || wheelLock) return;

    const dy = e.deltaY;
    if (Math.abs(dy) < 14) return;

    const currentY = window.scrollY;
    const targets = snapSections.map((s) => s.getBoundingClientRect().top + window.scrollY);
    const nextIndex =
      dy > 0
        ? targets.findIndex((t) => t > currentY + 20)
        : (() => {
            for (let i = targets.length - 1; i >= 0; i--) {
              if (targets[i] < currentY - 20) return i;
            }
            return -1;
          })();

    if (nextIndex === -1) return;

    e.preventDefault();
    wheelLock = true;

    window.scrollTo({
      top: targets[nextIndex] - 84,
      behavior: "smooth"
    });

    setTimeout(() => {
      wheelLock = false;
    }, 700);
  }, { passive: false });
});
