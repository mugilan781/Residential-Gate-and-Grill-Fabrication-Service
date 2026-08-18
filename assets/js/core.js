/* ==========================================================================
   IRONHAUS — core.js
   Theme, RTL, header, mobile menu, page transitions, back-to-top
   ========================================================================== */
(() => {
  "use strict";

  const html = document.documentElement;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  /* ---------- Safe storage (some browsers block localStorage) ---------- */
  const storage = (() => {
    try {
      const t = "__irh_test__";
      window.localStorage.setItem(t, "1");
      window.localStorage.removeItem(t);
      return window.localStorage;
    } catch (err) {
      return null;
    }
  })();
  const storageGet = (key) => {
    try {
      return storage ? storage.getItem(key) : null;
    } catch (err) {
      return null;
    }
  };
  const storageSet = (key, value) => {
    try {
      if (storage) storage.setItem(key, value);
    } catch (err) {}
  };

  /* ---------- Theme ---------- */
  const storedTheme = storageGet("irh-theme");
  if (storedTheme) {
    html.dataset.theme = storedTheme;
  } else if (prefersDark) {
    html.dataset.theme = "dark";
  }
  html.classList.add("theme-ready");

  const syncThemeIcons = () => {
    const dark = html.dataset.theme === "dark";
    document.querySelectorAll("[data-theme-toggle] svg").forEach((icon) => {
      icon.hidden = icon.dataset.icon === "moon" ? dark : !dark;
    });
  };
  syncThemeIcons();

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-theme-toggle]");
    if (!btn) return;
    const next = html.dataset.theme === "dark" ? "light" : "dark";
    html.dataset.theme = next;
    storageSet("irh-theme", next);
    syncThemeIcons();
  });

  /* ---------- RTL ---------- */
  const storedDir = storageGet("irh-dir");
  if (storedDir) html.dir = storedDir;

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-rtl-toggle]");
    if (!btn) return;
    const next = html.dir === "rtl" ? "ltr" : "rtl";
    html.dir = next;
    storageSet("irh-dir", next);
    btn.setAttribute("aria-pressed", next === "rtl");
  });

  /* ---------- Header scroll state ---------- */
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  const navToggle = document.querySelector("[data-nav-toggle]");
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const isOpen = document.body.classList.toggle("menu-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
  }

  /* ---------- Page transitions ---------- */
  const curtain = document.querySelector("[data-curtain]");
  const veil = document.querySelector("[data-veil]");

  if (veil) {
    let lifted = false;
    const lift = () => {
      if (lifted) return;
      lifted = true;
      document.body.classList.remove("is-loading");
      veil.classList.add("is-done");
    };
    window.addEventListener("load", () => window.setTimeout(lift, 350));
    window.setTimeout(lift, 2600);
    window.addEventListener("pageshow", (e) => {
      if (e.persisted) {
        lifted = false;
        veil.classList.remove("is-done");
        window.setTimeout(lift, 120);
      }
    });
  }

  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[href]");
    if (!link) return;
    if (link.closest("[data-lightbox-trigger]")) return;
    const href = link.getAttribute("href");
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      link.target === "_blank" ||
      link.hasAttribute("download")
    ) {
      return;
    }
    const url = new URL(href, location.href);
    if (url.origin !== location.origin || url.pathname === location.pathname) return;
    if (curtain) {
      e.preventDefault();
      document.body.classList.add("page-leaving");
      window.setTimeout(() => {
        window.location.href = url.href;
      }, 480);
    }
  });

  /* ---------- Back to top ---------- */
  const toTop = document.querySelector("[data-to-top]");
  if (toTop) {
    const onScroll = () => {
      toTop.classList.toggle("is-visible", window.scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    toTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Smooth anchor scroll ---------- */
  document.addEventListener("click", (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const href = anchor.getAttribute("href");
    if (!href || href.length < 2) return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    const navItems = document.querySelectorAll(".svc-nav__item");
    navItems.forEach((item) => {
      item.classList.toggle("is-active", item.getAttribute("href") === href);
    });
  });

  /* ---------- Header hide on scroll down ---------- */
  let lastY = window.scrollY;
  window.addEventListener(
    "scroll",
    () => {
      if (!header || header.classList.contains("site-header--static") || document.body.classList.contains("menu-open")) return;
      const y = window.scrollY;
      if (y > lastY && y > 200) {
        header.classList.add("site-header--hide");
      } else {
        header.classList.remove("site-header--hide");
      }
      lastY = y;
    },
    { passive: true }
  );

  /* ---------- Current year ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- Bypass block focus ---------- */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab" && document.querySelector(".skip-link")) {
      document.querySelector(".skip-link").focus();
    }
  });

  /* ---------- Graceful image fallback ---------- */
  document.addEventListener(
    "error",
    (e) => {
      const img = e.target;
      if (img && img.tagName === "IMG" && img.src) {
        img.classList.add("img-error");
      }
    },
    true
  );
})();
