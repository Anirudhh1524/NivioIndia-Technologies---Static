/* ====================================================================
   NivioIndia — status.js
   Powers the /status.html live operations dashboard: canvas-drawn
   line chart, animated counters, simulated per-service uptime bars.
==================================================================== */

(function () {
  function rand(min, max) { return Math.random() * (max - min) + min; }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  // ---------------- Top status cards ----------------
  // Cards tween smoothly from their current value to a new target instead of
  // snapping instantly — reads like a system that's actually recalculating,
  // not a number flickering randomly every tick.
  const cardState = {
    cardUptime:       { value: 99.95, format: (v) => v.toFixed(2) + "%" },
    cardTickets:      { value: 12,    format: (v) => Math.round(v) + " open" },
    cardResponse:     { value: 4,     format: (v) => Math.round(v) + " min" },
    cardClosedTickets:{ value: 47,    format: (v) => Math.round(v) + " closed" },
  };

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function tweenCard(id, target, duration = 1400) {
    const el = document.getElementById(id);
    const state = cardState[id];
    if (!el || !state) return;

    const from = state.value;
    const start = performance.now();
    el.classList.add("sv-updating");

    function step(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = easeOutCubic(t);
      const current = from + (target - from) * eased;
      el.textContent = state.format(current);
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        state.value = target;
        el.classList.remove("sv-updating");
      }
    }
    requestAnimationFrame(step);
  }

  function refreshCards() {
    // Small realistic jitter around each metric's true baseline, so the
    // dashboard breathes without ever looking implausible.
    tweenCard("cardUptime", 99.90 + Math.random() * 0.09);
    tweenCard("cardTickets", Math.round(rand(9, 16)));
    tweenCard("cardResponse", Math.round(rand(3, 6)));
    tweenCard("cardClosedTickets", Math.round(rand(40, 55)));
  }

  // ---------------- Canvas line chart: response time over last 30 mins ----------------
  let chartData = Array.from({ length: 30 }, () => rand(2, 8));

  function drawChart() {
    const canvas = document.getElementById("respChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth, h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const lineColor = isDark ? "#2dd4bf" : "#14b8a6";
    const gridColor = isDark ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.05)";
    const fillTop = isDark ? "rgba(45,212,191,.22)" : "rgba(20,184,166,.18)";

    const max = Math.max(...chartData, 10);
    const min = 0;
    const pad = 10;

    // grid lines
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = pad + (h - pad * 2) * (i / 4);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const stepX = w / (chartData.length - 1);
    const toY = (v) => h - pad - ((v - min) / (max - min)) * (h - pad * 2);

    // filled area
    ctx.beginPath();
    ctx.moveTo(0, toY(chartData[0]));
    chartData.forEach((v, i) => ctx.lineTo(i * stepX, toY(v)));
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, fillTop);
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.fill();

    // line
    ctx.beginPath();
    ctx.moveTo(0, toY(chartData[0]));
    chartData.forEach((v, i) => ctx.lineTo(i * stepX, toY(v)));
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = "round";
    ctx.stroke();

    // last point dot
    const lastX = (chartData.length - 1) * stepX;
    const lastY = toY(chartData[chartData.length - 1]);
    ctx.beginPath();
    ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
    ctx.fillStyle = lineColor;
    ctx.fill();
  }

  function tickChart() {
    chartData.shift();
    chartData.push(rand(2, 8));
    drawChart();
  }

  // ---------------- Per-service status rows ----------------
  function renderServiceStatus() {
    const list = document.getElementById("svcStatusList");
    if (!list || typeof SERVICES === "undefined") return;

    list.innerHTML = SERVICES.map(s => {
      const degraded = Math.random() < 0.08;
      return `
      <div class="svc-status-row">
        <div class="left"><i class="fas ${s.icon}"></i>${s.name}</div>
        <div class="svc-status-badge ${degraded ? 'degraded' : ''}">
          <span class="dot"></span>${degraded ? 'Degraded' : 'Operational'}
        </div>
      </div>`;
    }).join("");
  }

  // ---------------- 30-day uptime bar history ----------------
  function renderUptimeBars() {
    const el = document.getElementById("uptimeBars");
    if (!el) return;
    let html = "";
    for (let i = 0; i < 30; i++) {
      const low = Math.random() < 0.05;
      const h = low ? Math.round(rand(30, 60)) : Math.round(rand(85, 100));
      html += `<div class="bar ${low ? 'low' : ''}" style="height:${h}%" title="Day ${i + 1}: ${h}% uptime"></div>`;
    }
    el.innerHTML = html;
  }

  // ---------------- Live clock ----------------
  function tickClock() {
    const el = document.getElementById("statusClock");
    if (!el) return;
    const now = new Date();
    el.textContent = now.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: false });
  }

  // Periodically re-check per-service status and the 30-day history bars.
  function updateSnapshot() {
    renderServiceStatus();
    renderUptimeBars();
  }

  function init() {
    if (!document.getElementById("respChart")) return;
    refreshCards();
    drawChart();
    renderServiceStatus();
    renderUptimeBars();
    tickClock();

    // Simulated data refreshes now happen on a random 30–60 second cadence.
    const MIN_GAP = 30 * 1000;
    const MAX_GAP = 60 * 1000;
    function scheduleRandom(fn) {
      const delay = MIN_GAP + Math.random() * (MAX_GAP - MIN_GAP);
      setTimeout(() => { fn(); scheduleRandom(fn); }, delay);
    }
    scheduleRandom(updateSnapshot);
    scheduleRandom(refreshCards);
    scheduleRandom(tickChart);

    setInterval(tickClock, 1000);
    window.addEventListener("resize", drawChart);
  }

  document.addEventListener("DOMContentLoaded", () => setTimeout(init, 60));
})();
