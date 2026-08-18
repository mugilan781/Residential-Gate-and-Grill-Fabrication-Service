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
  } else {
    html.dataset.theme = "light";
  }
  html.classList.add("theme-ready");

  const syncThemeToggle = () => {
    const isDark = html.dataset.theme === "dark";
    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      btn.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
      btn.setAttribute("title", isDark ? "Light mode" : "Dark mode");
    });
  };
  syncThemeToggle();

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-theme-toggle]");
    if (!btn) return;
    const next = html.dataset.theme === "dark" ? "light" : "dark";
    html.dataset.theme = next;
    storageSet("irh-theme", next);
    syncThemeToggle();
  });

  /* ---------- RTL ---------- */
  const syncDirToggle = () => {
    const isRtl = html.dir === "rtl";
    document.querySelectorAll("[data-rtl-toggle]").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(isRtl));
      btn.setAttribute("title", isRtl ? "Switch to LTR layout" : "Switch to RTL layout");
      btn.setAttribute("aria-label", isRtl ? "Switch to LTR layout" : "Switch to RTL layout");
      const textEl = btn.querySelector(".rtl-text") || btn;
      textEl.textContent = isRtl ? "LTR" : "RTL";
    });
  };

  const storedDir = storageGet("irh-dir");
  if (storedDir) html.dir = storedDir;
  syncDirToggle();

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-rtl-toggle]");
    if (!btn) return;
    const next = html.dir === "rtl" ? "ltr" : "rtl";
    html.dir = next;
    storageSet("irh-dir", next);
    syncDirToggle();
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
    const lockScroll = (lock) => {
      const root = document.documentElement;
      root.style.overflow = lock ? "hidden" : "";
      document.body.style.overflow = lock ? "hidden" : "";
    };
    const closeMenu = () => {
      document.body.classList.remove("menu-open");
      navToggle.setAttribute("aria-expanded", "false");
      lockScroll(false);
    };
    const openMenu = () => {
      document.body.classList.add("menu-open");
      navToggle.setAttribute("aria-expanded", "true");
      lockScroll(true);
    };
    navToggle.addEventListener("click", () => {
      if (document.body.classList.contains("menu-open")) closeMenu();
      else openMenu();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && document.body.classList.contains("menu-open")) {
        closeMenu();
      }
    });
    document.addEventListener("click", (e) => {
      if (!document.body.classList.contains("menu-open")) return;
      if (e.target.closest(".mobile-menu a")) closeMenu();
    });
    const desktopQuery = window.matchMedia("(min-width: 901px)");
    const onViewportChange = (e) => {
      if (e.matches) closeMenu();
    };
    if (desktopQuery.addEventListener) desktopQuery.addEventListener("change", onViewportChange);
    else desktopQuery.addListener(onViewportChange);
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
      document.body.classList.add("is-loaded");
      veil.classList.add("is-done");
    };
    window.addEventListener("load", () => window.setTimeout(lift, 350));
    window.setTimeout(lift, 2600);
    window.addEventListener("pageshow", (e) => {
      if (e.persisted) {
        document.body.classList.remove("page-leaving");
        document.body.classList.remove("is-loading");
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
