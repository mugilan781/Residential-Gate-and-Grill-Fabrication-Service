/* ==========================================================================
   IRONHAUS — app.js
   Hero slider, testimonial slider, forms
   ========================================================================== */
(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Hero slider ---------- */
  const hero = document.querySelector("[data-hero]");
  if (hero) {
    const slides = Array.from(hero.querySelectorAll("[data-hero-slide]"));
    const pips = Array.from(hero.querySelectorAll("[data-hero-pip]"));
    const prevBtn = hero.querySelector("[data-hero-prev]");
    const nextBtn = hero.querySelector("[data-hero-next]");
    const counterCur = hero.querySelector("[data-hero-current]");
    const counterTot = hero.querySelector("[data-hero-total]");
    const progress = hero.querySelector("[data-hero-progress]");
    const autoplayMs = 6500;
    let index = 0;
    let timer = null;

    if (counterTot) counterTot.textContent = String(slides.length).padStart(2, "0");

    const go = (i) => {
      index = (i + slides.length) % slides.length;
      slides.forEach((s, n) => {
        s.classList.toggle("is-active", n === index);
        s.style.zIndex = n === index ? 2 : 1;
      });
      pips.forEach((p, n) => {
        p.classList.toggle("is-active", n === index);
      });
      if (counterCur) counterCur.textContent = String(index + 1).padStart(2, "0");
      if (progress) {
        progress.style.transition = "none";
        progress.style.transform = "scaleX(0)";
        requestAnimationFrame(() => {
          progress.style.transition = "transform " + autoplayMs / 1000 + "s linear";
          progress.style.transform = "scaleX(1)";
        });
      }
      restart();
    };

    const restart = () => {
      if (reduceMotion) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => go(index + 1), autoplayMs);
    };

    slides.forEach((s, n) => (s.style.zIndex = n === 0 ? 2 : 1));

    if (prevBtn) prevBtn.addEventListener("click", () => go(index - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => go(index + 1));
    pips.forEach((p, n) => p.addEventListener("click", () => go(n)));

    if (!reduceMotion) restart();
  }

  /* ---------- Testimonial slider ---------- */
  const testi = document.querySelector("[data-testi]");
  if (testi) {
    const slides = Array.from(testi.querySelectorAll("[data-testi-slide]"));
    const pips = Array.from(testi.querySelectorAll("[data-testi-pip]"));
    const prevBtn = testi.querySelector("[data-testi-prev]");
    const nextBtn = testi.querySelector("[data-testi-next]");
    const track = testi.querySelector("[data-testi-track]");
    const auto = !testi.dataset.noAuto;
    const autoplayMs = 7000;
    let index = 0;
    let timer = null;

    const show = (i) => {
      index = (i + slides.length) % slides.length;
      slides.forEach((s, n) => s.classList.toggle("is-active", n === index));
      pips.forEach((p, n) => p.classList.toggle("is-active", n === index));
      if (track) {
        const dir = document.documentElement.dir === "rtl" ? 1 : -1;
        const step = slides[0] ? slides[0].offsetWidth : 0;
        track.style.transform = "translateX(" + dir * index * step + "px)";
      }
      restart();
    };

    const restart = () => {
      if (!auto || reduceMotion) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => show(index + 1), autoplayMs);
    };

    slides.forEach((s, n) => s.classList.toggle("is-active", n === 0));

    if (prevBtn) prevBtn.addEventListener("click", () => show(index - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => show(index + 1));
    pips.forEach((p, n) => p.addEventListener("click", () => show(n)));

    window.addEventListener("resize", () => {
      if (track) {
        const dir = document.documentElement.dir === "rtl" ? 1 : -1;
        const step = slides[0] ? slides[0].offsetWidth : 0;
        track.style.transform = "translateX(" + dir * index * step + "px)";
      }
    });

    if (auto && !reduceMotion) restart();
  }

  /* ---------- Forms: validation + fake submit ---------- */
  const validate = (form) => {
    let valid = true;
    form.querySelectorAll("[required]").forEach((field) => {
      const ok = field.value.trim() !== "";
      field.setAttribute("aria-invalid", String(!ok));
      field.closest(".field")?.classList.toggle("has-error", !ok);
      if (!ok) valid = false;
    });
    const email = form.querySelector('input[type="email"]');
    if (email && email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      email.setAttribute("aria-invalid", "true");
      email.closest(".field")?.classList.add("has-error");
      valid = false;
    }
    return valid;
  };

  const handleSubmit = (form, successMsg) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validate(form)) {
        form.querySelector('[aria-invalid="true"]')?.focus();
        return;
      }
      form.classList.add("is-submitting");
      window.setTimeout(() => {
        form.classList.remove("is-submitting");
        form.reset();
        const banner = document.createElement("div");
        banner.className = "form-success";
        banner.setAttribute("role", "status");
        banner.innerHTML =
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>' +
          "<span>" + successMsg + "</span>";
        form.replaceWith(banner);
      }, 1400);
    });
  };

  document.querySelectorAll("form[data-form]").forEach((form) => {
    handleSubmit(form, form.dataset.success || "Thank you — our team will be in touch shortly.");
  });

  /* ---------- Countdown (maintenance page) ---------- */
  const countdown = document.querySelector("[data-countdown]");
  if (countdown) {
    const target = new Date(countdown.dataset.countdown).getTime();
    const boxes = {
      days: countdown.querySelector("[data-count-days]"),
      hours: countdown.querySelector("[data-count-hours]"),
      minutes: countdown.querySelector("[data-count-minutes]"),
      seconds: countdown.querySelector("[data-count-seconds]"),
    };
    const pad = (n) => String(n).padStart(2, "0");
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      boxes.days.textContent = pad(Math.floor(diff / 86400000));
      boxes.hours.textContent = pad(Math.floor(diff / 3600000) % 24);
      boxes.minutes.textContent = pad(Math.floor(diff / 60000) % 60);
      boxes.seconds.textContent = pad(Math.floor(diff / 1000) % 60);
    };
    tick();
    window.setInterval(tick, 1000);
  }

  /* ---------- Clear error state on input ---------- */
  document.addEventListener("input", (e) => {
    const field = e.target.closest(".field");
    if (!field) return;
    field.classList.remove("has-error");
    e.target.setAttribute("aria-invalid", "false");
  });
})();
