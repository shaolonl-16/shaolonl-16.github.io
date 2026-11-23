/* Progressive enhancements; news, original figures and photos work without JS. */
(() => {
  "use strict";

  const news = document.querySelector(".news-scroll");
  if (news) {
    const rows = Array.from(news.querySelectorAll(".news-item"));
    const visible = Number(news.dataset.visibleItems) || 4;
    const sizeNews = () => {
      if (rows.length <= visible) return;
      const last = rows[visible - 1];
      const height = last.offsetTop + last.offsetHeight - rows[0].offsetTop;
      news.style.maxHeight = `${Math.ceil(height + 6)}px`;
    };
    sizeNews();
    if (document.fonts) document.fonts.ready.then(sizeNews);
    if ("ResizeObserver" in window) {
      const observer = new ResizeObserver(sizeNews);
      rows.forEach(row => observer.observe(row));
    } else {
      window.addEventListener("resize", sizeNews);
    }
  }

  const publicationCopies = Array.from(document.querySelectorAll(".publication-copy"));
  if (publicationCopies.length) {
    // Measure the longest text line, so shorter papers do not leave a blank column.
    const sizePublication = copy => {
      const row = copy.closest(".publication");
      row.style.setProperty("--publication-copy-width", `${copy.getBoundingClientRect().width}px`);
      row.style.setProperty("--publication-row-width", `${row.clientWidth}px`);
    };
    const sizePublications = () => publicationCopies.forEach(sizePublication);
    sizePublications();
    if (document.fonts) document.fonts.ready.then(sizePublications);
    if ("ResizeObserver" in window) {
      const observer = new ResizeObserver(entries => entries.forEach(entry => sizePublication(entry.target)));
      publicationCopies.forEach(copy => observer.observe(copy));
    } else {
      window.addEventListener("resize", sizePublications);
      // The theme animates font sizes at responsive breakpoints.
      publicationCopies.forEach(copy => copy.addEventListener("transitionend", event => {
        if (event.propertyName === "font-size") sizePublication(copy);
      }));
    }
  }

  document.querySelectorAll(".publication-toggle").forEach(button => {
    button.addEventListener("click", () => {
      const row = button.closest(".publication");
      const shouldOpen = button.getAttribute("aria-expanded") !== "true";
      row.querySelectorAll(".publication-toggle").forEach(toggle => {
        const expanded = toggle === button && shouldOpen;
        toggle.setAttribute("aria-expanded", String(expanded));
        document.getElementById(toggle.getAttribute("aria-controls")).hidden = !expanded;
      });
    });
  });

  document.querySelectorAll("[data-copy-citation]").forEach(button => {
    button.addEventListener("click", async () => {
      const code = document.getElementById(button.dataset.copyCitation);
      const status = button.closest(".publication-panel").querySelector(".citation-copy-status");
      try {
        await navigator.clipboard.writeText(code.textContent.trim());
        status.textContent = "BibTeX copied.";
      } catch {
        const range = document.createRange();
        range.selectNodeContents(code);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        status.textContent = "Citation selected. Press Ctrl+C or ⌘C to copy.";
      }
    });
  });

  const links = Array.from(document.querySelectorAll("[data-lightbox]"));
  if (!links.length || typeof HTMLDialogElement === "undefined") return;

  const dialog = document.createElement("dialog");
  dialog.className = "media-viewer";
  dialog.setAttribute("aria-label", "Image viewer");
  dialog.setAttribute("aria-describedby", "media-caption");
  dialog.innerHTML = `
    <div class="media-toolbar">
      <span class="media-count" aria-live="polite"></span>
      <div class="media-controls">
        <button type="button" data-action="previous" aria-label="Previous image">‹</button>
        <button type="button" data-action="next" aria-label="Next image">›</button>
        <button type="button" data-action="close" aria-label="Close image viewer" autofocus>×</button>
      </div>
    </div>
    <div class="media-stage"><img class="media-image" alt=""></div>
    <div class="media-footer">
      <p class="media-caption" id="media-caption"></p>
      <a class="media-original" target="_blank" rel="noopener">View original ↗</a>
    </div>`;
  document.body.appendChild(dialog);

  let group = [];
  let index = 0;
  let opener = null;
  const show = next => {
    index = (next + group.length) % group.length;
    const link = group[index];
    const img = dialog.querySelector(".media-image");
    img.src = link.dataset.image || link.href;
    img.alt = link.querySelector("img").alt;
    dialog.querySelector(".media-caption").textContent = link.dataset.caption || img.alt;
    dialog.querySelector(".media-count").textContent = `${index + 1} / ${group.length}`;
    const original = dialog.querySelector(".media-original");
    original.hidden = link.dataset.lightbox === "publications";
    if (original.hidden) original.removeAttribute("href");
    else original.href = link.href;
  };

  // Leave modified clicks available for opening the original in a separate tab.
  document.addEventListener("click", event => {
    const link = event.target.closest("[data-lightbox]");
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    opener = link;
    group = links.filter(item => item.dataset.lightbox === link.dataset.lightbox);
    show(group.indexOf(link));
    document.body.classList.add("media-open");
    dialog.showModal();
  }, true);

  dialog.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");
    if (button) {
      if (button.dataset.action === "close") dialog.close();
      if (button.dataset.action === "previous") show(index - 1);
      if (button.dataset.action === "next") show(index + 1);
    } else if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    }
  });
  dialog.addEventListener("keydown", event => {
    if (event.key === "Tab") {
      const controls = Array.from(dialog.querySelectorAll("button, a[href]"));
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      show(index + (event.key === "ArrowLeft" ? -1 : 1));
    }
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("media-open");
    if (opener) opener.focus({ preventScroll: true });
  });
})();
