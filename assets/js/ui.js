/* ==========================================================================
   IRONHAUS — ui.js
   Reveal, counters, accordion, tabs, filters, lightbox, marquee
   ========================================================================== */
(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if (revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length) {
    const animate = (el) => {
      const end = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals, 10) : 0;
      const dur = 1800;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (end * eased).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((el) => io.observe(el));
  }

  /* ---------- Accordion (FAQ) ---------- */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-accordion-toggle]");
    if (!btn) return;
    const item = btn.closest("[data-accordion-item]");
    const panel = btn.closest("[data-accordion]");
    if (!item || !panel) return;
    const isOpen = item.classList.contains("is-open");
    if (!btn.closest("[data-accordion-multi]")) {
      panel.querySelectorAll("[data-accordion-item].is-open").forEach((i) => {
        i.classList.remove("is-open");
      });
    }
    item.classList.toggle("is-open", !isOpen);
  });

  /* ---------- Tabs ---------- */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-tab]");
    if (!btn) return;
    const group = btn.closest("[data-tabs]");
    if (!group) return;
    const target = group.querySelector(btn.dataset.tab);
    if (!target) return;
    group.querySelectorAll("[data-tab]").forEach((b) => {
      const active = b === btn;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-selected", String(active));
      const pane = group.querySelector(b.dataset.tab);
      if (pane) pane.classList.toggle("is-active", active);
    });
  });

  /* ---------- Gallery filter ---------- */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;
    const wrap = btn.closest("[data-filter-wrap]");
    if (!wrap) return;
    const filter = btn.dataset.filter;
    wrap.querySelectorAll("[data-filter]").forEach((b) => {
      b.classList.toggle("is-active", b === btn);
      b.setAttribute("aria-pressed", String(b === btn));
    });
    const items = wrap.querySelectorAll("[data-cat]");
    items.forEach((item) => {
      const show = filter === "all" || item.dataset.cat === filter;
      item.classList.toggle("is-hidden", !show);
      if (show) {
        item.classList.add("is-in");
      }
    });
  });

  /* ---------- Lightbox ---------- */
  const lightbox = document.querySelector("[data-lightbox]");
  let lightboxItems = [];
  let lightboxIndex = 0;

  const openLightbox = (i) => {
    if (!lightbox || !lightboxItems.length) return;
    lightboxIndex = i;
    const img = lightbox.querySelector("[data-lightbox-img]");
    const cap = lightbox.querySelector("[data-lightbox-caption]");
    img.src = lightboxItems[i].src;
    img.alt = lightboxItems[i].alt || "";
    cap.textContent = lightboxItems[i].caption || "";
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  const moveLightbox = (dir) => {
    if (!lightboxItems.length) return;
    lightboxIndex = (lightboxIndex + dir + lightboxItems.length) % lightboxItems.length;
    const img = lightbox.querySelector("[data-lightbox-img]");
    const cap = lightbox.querySelector("[data-lightbox-caption]");
    img.src = lightboxItems[lightboxIndex].src;
    img.alt = lightboxItems[lightboxIndex].alt || "";
    cap.textContent = lightboxItems[lightboxIndex].caption || "";
  };

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-lightbox-trigger]");
    if (!trigger) return;
    e.preventDefault();
    const scope = trigger.closest("[data-lightbox-group]") || document;
    lightboxItems = Array.from(scope.querySelectorAll("[data-lightbox-item]")).map((el) => ({
      src: el.dataset.lightboxItem,
      alt: el.dataset.lightboxAlt || "",
      caption: el.dataset.lightboxCaption || ""
    }));
    openLightbox(lightboxItems.indexOf(trigger));
  });

  document.addEventListener("click", (e) => {
    if (!lightbox) return;
    if (e.target.closest("[data-lightbox-close]")) return closeLightbox();
    if (e.target.closest("[data-lightbox-prev]")) return moveLightbox(-1);
    if (e.target.closest("[data-lightbox-next]")) return moveLightbox(1);
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox || !lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") moveLightbox(-1);
    if (e.key === "ArrowRight") moveLightbox(1);
  });

  /* ---------- Blog search (filters cards live) ---------- */
  document.addEventListener("submit", (e) => {
    const form = e.target.closest("[data-search-form]");
    if (!form) return;
    e.preventDefault();
    const input = form.querySelector("input");
    const query = (input.value || "").trim().toLowerCase();
    const scope = document.querySelector(form.dataset.searchScope) || document;
    const cards = Array.from(scope.querySelectorAll(".blog-card"));
    let count = 0;
    cards.forEach((card) => {
      const match = !query || card.textContent.toLowerCase().includes(query);
      card.classList.toggle("is-hidden", !match);
      if (match) count++;
    });
    const status = form.parentElement.querySelector("[data-search-status]");
    if (status) {
      status.textContent = query
        ? count + " of " + cards.length + " articles match"
        : "Showing all " + cards.length + " articles";
    }
  });

  /* ---------- Marquee ---------- */
  const marquees = document.querySelectorAll("[data-marquee]");
  marquees.forEach((m) => {
    const strip = m.querySelector("[data-marquee-track]");
    if (!strip) return;
    const clone = strip.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    m.appendChild(clone);
    m.classList.add("is-ready");
  });

  /* ---------- Skip toggler for filter chips (keyboard) ---------- */
  document.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });
  });

  if (reduceMotion) {
    document.body.classList.add("reduce-motion");
  }
})();
