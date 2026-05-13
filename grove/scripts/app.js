// overment.ai — site enhancements
// - Lightbox: click any content image to view it full-screen.
// - Resizable column: drag the vertical handles to widen / narrow the
//   reading column. Persisted to localStorage so it sticks.
(() => {
  if (typeof window === "undefined") return;
  const root = document.documentElement;
  const docReady = (fn) => {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  };

  // ---------- Lightbox ----------
  const initLightbox = () => {
    const lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-hidden", "true");
    lb.innerHTML = `
      <button class="lightbox-close" type="button" aria-label="Close (Esc)">×</button>
      <figure class="lightbox-figure">
        <img class="lightbox-image" alt="">
        <figcaption class="lightbox-caption" hidden></figcaption>
      </figure>
    `;
    document.body.appendChild(lb);
    const img = lb.querySelector(".lightbox-image");
    const caption = lb.querySelector(".lightbox-caption");

    const close = () => {
      lb.classList.remove("open");
      lb.setAttribute("aria-hidden", "true");
      document.body.classList.remove("no-scroll");
    };
    const open = (src, alt) => {
      img.src = src;
      img.alt = alt || "";
      if (alt) {
        caption.textContent = alt;
        caption.hidden = false;
      } else {
        caption.hidden = true;
      }
      lb.classList.add("open");
      lb.setAttribute("aria-hidden", "false");
      document.body.classList.add("no-scroll");
    };

    lb.addEventListener("click", (e) => {
      if (e.target === lb || e.target.closest(".lightbox-close")) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lb.classList.contains("open")) close();
    });

    const wireImage = (el) => {
      if (el.dataset.lightboxBound === "1") return;
      // Skip if image is wrapped in a link, marked no-lightbox, or inline avatar size.
      if (el.closest("a[href]")) return;
      if (el.classList.contains("no-lightbox")) return;
      const inlineMax = (el.getAttribute("style") || "").match(/max-width:\s*(\d+)px/i);
      if (inlineMax && Number(inlineMax[1]) <= 140) return;
      el.dataset.lightboxBound = "1";
      el.style.cursor = "zoom-in";
      el.addEventListener("click", () => open(el.currentSrc || el.src, el.alt));
    };

    document.querySelectorAll("main img").forEach(wireImage);
  };

  // ---------- Resizable column ----------
  const initResizable = () => {
    const STORAGE_KEY = "overment.contentWidth";
    const MIN_REM = 36;
    const MAX_REM = 68;

    const fontPx = () => parseFloat(getComputedStyle(root).fontSize) || 16;
    const apply = (rem) => {
      const clamped = Math.max(MIN_REM, Math.min(MAX_REM, rem));
      root.style.setProperty("--content-width", `${clamped.toFixed(2)}rem`);
      return clamped;
    };
    const save = (rem) => {
      try { localStorage.setItem(STORAGE_KEY, rem.toFixed(2)); } catch {}
    };

    // Restore stored width.
    let stored;
    try { stored = parseFloat(localStorage.getItem(STORAGE_KEY) || ""); } catch {}
    if (Number.isFinite(stored)) apply(stored);

    const makeHandle = (side) => {
      const h = document.createElement("button");
      h.type = "button";
      h.className = `col-handle col-handle-${side}`;
      h.setAttribute("aria-label", "Resize content column (use ← and →)");
      h.setAttribute("aria-orientation", "vertical");
      h.tabIndex = 0;
      const grip = document.createElement("span");
      grip.className = "col-handle-grip";
      grip.setAttribute("aria-hidden", "true");
      h.appendChild(grip);
      return h;
    };

    const left = makeHandle("left");
    const right = makeHandle("right");
    document.body.append(left, right);

    const main = document.querySelector("main");
    if (!main) return;

    const positionHandles = () => {
      const rect = main.getBoundingClientRect();
      left.style.left = `${Math.round(rect.left)}px`;
      right.style.left = `${Math.round(rect.right)}px`;
    };
    positionHandles();
    window.addEventListener("resize", positionHandles);

    let dragging = null; // 'left' | 'right' | null
    const onMove = (e) => {
      if (!dragging) return;
      const centerX = window.innerWidth / 2;
      const widthPx =
        dragging === "right"
          ? (e.clientX - centerX) * 2
          : (centerX - e.clientX) * 2;
      if (widthPx <= 0) return;
      apply(widthPx / fontPx());
      positionHandles();
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = null;
      document.body.classList.remove("col-resizing");
      const cur = parseFloat(getComputedStyle(root).getPropertyValue("--content-width")) || 38;
      save(cur);
    };
    const startDrag = (side) => (e) => {
      e.preventDefault();
      dragging = side;
      document.body.classList.add("col-resizing");
    };

    left.addEventListener("pointerdown", startDrag("left"));
    right.addEventListener("pointerdown", startDrag("right"));
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    // Keyboard accessibility.
    const nudge = (delta) => {
      const cur = parseFloat(getComputedStyle(root).getPropertyValue("--content-width")) || 38;
      const next = apply(cur + delta);
      positionHandles();
      save(next);
    };
    [left, right].forEach((h) => {
      h.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") { e.preventDefault(); nudge(-1); }
        else if (e.key === "ArrowRight") { e.preventDefault(); nudge(1); }
        else if (e.key === "Home") { e.preventDefault(); apply(MIN_REM); positionHandles(); save(MIN_REM); }
        else if (e.key === "End") { e.preventDefault(); apply(MAX_REM); positionHandles(); save(MAX_REM); }
      });
    });

    // Reposition after view transitions / page navigations.
    document.addEventListener("visibilitychange", positionHandles);
  };

  docReady(() => {
    initLightbox();
    initResizable();
  });
})();
