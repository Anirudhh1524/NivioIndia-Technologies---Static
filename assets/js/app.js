/* ====================================================================
   NivioIndia — app.js
   Renders nav/footer from data.js, and powers every "extraordinary"
   feature: theme toggle, command palette (⌘K), toasts, scroll
   progress, back-to-top, WhatsApp float.
   Include data.js BEFORE this file on every page.
==================================================================== */

(function () {
  // ---------- Helpers to resolve relative asset paths from any depth ----------
  const DEPTH = document.body.dataset.depth || "0"; // "0" for root pages, "1" for /services/*.html
  const ROOT = DEPTH === "1" ? "../" : "";
  const asset = (p) => ROOT + "assets/" + p;
  const page  = (p) => ROOT + p;

  // ======================================================================
  // 1. THEME SYSTEM (persisted via localStorage)
  // ======================================================================
  function initTheme() {
    const saved = localStorage.getItem("nivio-theme");
    const theme = saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  }
  initTheme();

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("nivio-theme", next);
    showToast(`Switched to ${next} mode`, "fa-circle-check");
  }

  // ======================================================================
  // 2. NAV + FOOTER INJECTION
  // ======================================================================
  function renderNav() {
    const slot = document.getElementById("nav-slot");
    if (!slot) return;

    const svcLinks = SERVICES.map(s =>
      `<a href="${page('services/' + s.slug + '.html')}"><i class="fas ${s.icon}"></i>${s.name}</a>`
    ).join("");

    slot.innerHTML = `
    <nav class="nav" id="nav">
      <div class="nav-row">
        <a href="${page('index.html')}" class="nav-brand">
          <img src="${asset('images/logo.png')}" alt="${COMPANY.name}">
          <span>${COMPANY.name}</span>
        </a>
        <div style="display:flex;align-items:center;">
          <div class="nav-toggle" id="navToggle"><span></span><span></span><span></span></div>
        </div>
        <ul class="nav-links" id="navLinks">
          <li><a href="${page('index.html')}">Home</a></li>
          <li class="has-mega" id="svcMega">
            <a href="${page('services.html')}">Services <i class="fas fa-chevron-down" style="font-size:9px;"></i></a>
            <div class="mega">${svcLinks}</div>
          </li>
          <li><a href="${page('about.html')}">About</a></li>
          <li><a href="${page('team.html')}">Team</a></li>
          <li><a href="${page('status.html')}">Status</a></li>
          <li><a href="${page('clients.html')}">Our Clients</a></li>
          <li><a href="${page('contact.html')}" class="nav-cta">Get In Touch</a></li>
        </ul>
        <button class="search-trigger" id="searchTrigger" aria-label="Search">
          <i class="fas fa-magnifying-glass"></i><span>Search</span><kbd>⌘K</kbd>
        </button>
        <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
          <i class="fas fa-moon"></i><i class="fas fa-sun"></i>
        </button>
      </div>
    </nav>`;

    document.getElementById("themeToggle").addEventListener("click", toggleTheme);
    document.getElementById("searchTrigger").addEventListener("click", openPalette);

    const navToggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");
    navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));

    const svcMega = document.getElementById("svcMega");
    svcMega.querySelector("a").addEventListener("click", (e) => {
      if (window.innerWidth <= 768) { e.preventDefault(); svcMega.classList.toggle("open"); }
    });

    const nav = document.getElementById("nav");
    window.addEventListener("scroll", () => nav.classList.toggle("scrolled", window.scrollY > 30));
  }

  function renderFooter() {
    const slot = document.getElementById("footer-slot");
    if (!slot) return;

    const svcList = SERVICES.slice(0, 6).map(s =>
      `<li><a href="${page('services/' + s.slug + '.html')}">${s.name}</a></li>`
    ).join("");

    slot.innerHTML = `
    <footer class="footer">
      <div class="wrap">
        <div class="footer-grid">
          <div class="footer-brand">
            <img src="${asset('images/logo.png')}" alt="${COMPANY.name}">
            <p>${COMPANY.legalName} delivers IT staffing, infrastructure, cloud, and security services for businesses that can't afford downtime.</p>
            <div class="footer-social">
              <a href="${COMPANY.socials.facebook}" target="_blank"><i class="fab fa-facebook-f"></i></a>
              <a href="${COMPANY.socials.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>
              <a href="${COMPANY.socials.linkedin}" target="_blank"><i class="fab fa-linkedin-in"></i></a>
              <a href="${COMPANY.socials.instagram}" target="_blank"><i class="fab fa-instagram"></i></a>
            </div>
          </div>
          <div class="footer-col">
            <h5>Services</h5>
            <ul>${svcList}</ul>
          </div>
          <div class="footer-col">
            <h5>Company</h5>
            <ul>
              <li><a href="${page('about.html')}">About Us</a></li>
              <li><a href="${page('team.html')}">Our Team</a></li>
              <li><a href="${page('services.html')}">All Services</a></li>
              <li><a href="${page('status.html')}">System Status</a></li>
              <li><a href="${page('contact.html')}">Contact</a></li>
              <li><a href="${page('privacy-policy.html')}">Privacy Policy</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h5>Get In Touch</h5>
            <div class="fc-row"><i class="fas fa-location-dot"></i><span>${COMPANY.address}</span></div>
            <div class="fc-row"><i class="fas fa-phone"></i><span>${COMPANY.phone}</span></div>
            <div class="fc-row"><i class="fas fa-envelope"></i><span>${COMPANY.email}</span></div>
          </div>
        </div>
      </div>
      <div class="wrap">
        <div class="footer-bottom">
          <p>© ${new Date().getFullYear()} ${COMPANY.name}. All rights reserved.</p>
          <p><a href="${page('privacy-policy.html')}">Privacy Policy</a> &nbsp;·&nbsp; <a href="${page('sitemap.html')}">Sitemap</a></p>
        </div>
      </div>
    </footer>`;
  }

  function renderWhatsapp() {
    const slot = document.getElementById("wa-slot");
    if (!slot) return;
    slot.innerHTML = `
    <div class="wa-float">
      <a href="https://wa.me/${COMPANY.whatsapp}" target="_blank" aria-label="Chat on WhatsApp">
        <img src="${asset('images/whatsapp.png')}" alt="">
      </a>
    </div>`;
  }

  // ======================================================================
  // 3. COMMAND PALETTE (⌘K / Ctrl+K)
  // ======================================================================
  let paletteIndex = 0;
  let paletteResults = [];

  function buildPaletteShell() {
    const div = document.createElement("div");
    div.className = "cmdk-overlay";
    div.id = "cmdkOverlay";
    div.innerHTML = `
      <div class="cmdk-box">
        <div class="cmdk-input-row">
          <i class="fas fa-magnifying-glass"></i>
          <input type="text" id="cmdkInput" placeholder="Search pages, services..." autocomplete="off">
          <span class="esc">ESC</span>
        </div>
        <div class="cmdk-results" id="cmdkResults"></div>
      </div>`;
    document.body.appendChild(div);

    div.addEventListener("click", (e) => { if (e.target === div) closePalette(); });
    document.getElementById("cmdkInput").addEventListener("input", (e) => renderPaletteResults(e.target.value));
    document.getElementById("cmdkInput").addEventListener("keydown", handlePaletteKeys);
  }

  function renderPaletteResults(query) {
    const resultsEl = document.getElementById("cmdkResults");
    const q = query.trim().toLowerCase();
    paletteResults = !q ? SEARCH_INDEX : SEARCH_INDEX.filter(item =>
      item.title.toLowerCase().includes(q) || item.type.toLowerCase().includes(q)
    );
    paletteIndex = 0;

    if (paletteResults.length === 0) {
      resultsEl.innerHTML = `<div class="cmdk-empty">No results for "${query}"</div>`;
      return;
    }

    resultsEl.innerHTML = paletteResults.map((item, i) => `
      <div class="cmdk-item ${i === 0 ? 'active' : ''}" data-url="${ROOT}${item.url.replace(/^\//,'')}">
        <i class="fas ${item.icon}"></i>
        <span class="ti">${item.title}</span>
        <span class="ty">${item.type}</span>
      </div>`).join("");

    resultsEl.querySelectorAll(".cmdk-item").forEach(el => {
      el.addEventListener("click", () => { window.location.href = el.dataset.url; });
    });
  }

  function handlePaletteKeys(e) {
    const items = document.querySelectorAll(".cmdk-item");
    if (e.key === "ArrowDown") {
      e.preventDefault();
      paletteIndex = Math.min(paletteIndex + 1, items.length - 1);
      updatePaletteActive(items);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      paletteIndex = Math.max(paletteIndex - 1, 0);
      updatePaletteActive(items);
    } else if (e.key === "Enter") {
      if (items[paletteIndex]) window.location.href = items[paletteIndex].dataset.url;
    } else if (e.key === "Escape") {
      closePalette();
    }
  }

  function updatePaletteActive(items) {
    items.forEach((el, i) => el.classList.toggle("active", i === paletteIndex));
    items[paletteIndex]?.scrollIntoView({ block: "nearest" });
  }

  function openPalette() {
    document.getElementById("cmdkOverlay").classList.add("open");
    const input = document.getElementById("cmdkInput");
    input.value = "";
    renderPaletteResults("");
    setTimeout(() => input.focus(), 50);
  }

  function closePalette() {
    document.getElementById("cmdkOverlay").classList.remove("open");
  }

  function initPalette() {
    buildPaletteShell();
    document.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openPalette();
      }
    });
  }

  // ======================================================================
  // 4. TOAST NOTIFICATIONS
  // ======================================================================
  function ensureToastStack() {
    if (document.querySelector(".toast-stack")) return;
    const stack = document.createElement("div");
    stack.className = "toast-stack";
    document.body.appendChild(stack);
  }

  window.showToast = function (message, icon = "fa-circle-check") {
    ensureToastStack();
    const stack = document.querySelector(".toast-stack");
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<i class="fas ${icon}"></i><span>${message}</span>`;
    stack.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("show"));
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  };

  // ======================================================================
  // 5. SCROLL PROGRESS BAR
  // ======================================================================
  function initScrollProgress() {
    const bar = document.createElement("div");
    bar.className = "scroll-progress";
    bar.id = "scrollProgress";
    document.body.appendChild(bar);
    window.addEventListener("scroll", () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
      bar.style.width = scrolled + "%";
    });
  }

  // ======================================================================
  // 6. BACK TO TOP
  // ======================================================================
  function initBackTop() {
    const btn = document.createElement("div");
    btn.className = "back-top";
    btn.id = "backTop";
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(btn);
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    window.addEventListener("scroll", () => btn.classList.toggle("show", window.scrollY > 600));
  }

  // ======================================================================
  // 7. CURSOR SPOTLIGHT (hero section, if present)
  // ======================================================================
  function initSpotlight() {
    const hero = document.querySelector(".hero");
    if (!hero) return;
    let layer = hero.querySelector(".spotlight-layer");
    if (!layer) {
      layer = document.createElement("div");
      layer.className = "spotlight-layer";
      hero.prepend(layer);
    }
    hero.addEventListener("mousemove", (e) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      hero.style.setProperty("--mx", x + "%");
      hero.style.setProperty("--my", y + "%");
    });
  }

  // ======================================================================
  // BOOTSTRAP
  // ======================================================================
  document.addEventListener("DOMContentLoaded", () => {
    renderNav();
    renderFooter();
    renderWhatsapp();
    initPalette();
    initScrollProgress();
    initBackTop();
    initSpotlight();
  });
})();
