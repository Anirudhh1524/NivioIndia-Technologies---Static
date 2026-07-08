/* ====================================================================
   NivioIndia — contact.js
   Since this is a static site (no server), contact submissions are
   saved to localStorage and viewable on /inbox.html as a lightweight
   admin view. This keeps the form fully functional without a backend.
==================================================================== */

(function () {
  const STORAGE_KEY = "nivio-contact-submissions";

  function getSubmissions() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch (e) { return []; }
  }

  function saveSubmission(entry) {
    const all = getSubmissions();
    all.unshift(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  }

  function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      data.id = Date.now();
      data.submittedAt = new Date().toISOString();
      saveSubmission(data);

      form.reset();
      const depth = document.body.dataset.depth === "1" ? "../" : "";
      window.location.href = depth + "success.html";
    });
  }

  // ---------------- Admin inbox rendering (/inbox.html) ----------------
  function renderInbox() {
    const list = document.getElementById("inboxList");
    if (!list) return;

    const submissions = getSubmissions();
    const countEl = document.getElementById("inboxCount");
    if (countEl) countEl.textContent = submissions.length;

    if (submissions.length === 0) {
      list.innerHTML = `<div class="inbox-empty"><i class="fas fa-inbox"></i>No submissions yet. Messages sent through the contact form will appear here.</div>`;
      return;
    }

    const head = `<div class="inbox-row head"><span>Name</span><span>Email</span><span>Service</span><span>Date</span><span></span></div>`;
    const rows = submissions.map(s => {
      const date = new Date(s.submittedAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
      return `<div class="inbox-row" data-id="${s.id}">
        <span>${s.name || "—"}</span>
        <span>${s.email || "—"}</span>
        <span>${s.service || "—"}</span>
        <span>${date}</span>
        <button class="del-btn" data-del="${s.id}"><i class="fas fa-trash"></i></button>
      </div>`;
    }).join("");

    list.innerHTML = head + rows;

    list.querySelectorAll("[data-del]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = Number(btn.dataset.del);
        const remaining = getSubmissions().filter(s => s.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(remaining));
        renderInbox();
        if (window.showToast) showToast("Submission removed", "fa-trash");
      });
    });
  }

  function initClearAll() {
    const btn = document.getElementById("clearInbox");
    if (!btn) return;
    btn.addEventListener("click", () => {
      localStorage.removeItem(STORAGE_KEY);
      renderInbox();
      if (window.showToast) showToast("Inbox cleared", "fa-circle-check");
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initContactForm();
    renderInbox();
    initClearAll();
  });
})();
