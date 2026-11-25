# Editing the website

The site keeps the existing AcademicPages/Jekyll structure and works with GitHub Pages. The main text remains in `_pages/about.md`, `_pages/publications.md`, and `_pages/misc.md`.

Only About displays the author profile. Its `_layouts/about.html` layout keeps the profile beside the biography at the top, in normal document flow so it scrolls out of view. Below the introduction, Recent News, Publications, and Experience & Education share a centered reading column (about 800px wide on desktop), with no reserved sidebar column. Publications and Misc set `author_profile: false` and use the same centered reading width.

About and the standalone Publications page both render `_includes/publications.html`, including the Scholar link, notes, all papers, and their interactive controls. Update `_data/selected_publications.yml` to change both lists together. The navigation's Publications link continues to open `/publications/`.

| Content | File |
| --- | --- |
| News, newest first | `_data/news.yml` |
| Education and research experience | `_data/experience.yml` |
| Publication titles, authors, resource links, abstracts, BibTeX, and overview mapping | `_data/selected_publications.yml` |
| Photo order and image descriptions | `_data/photos.yml` |
| Typography, layout, and responsive styles | `_sass/_academic.scss` |
| News viewport, publication previews and disclosure panels, and image viewer | `assets/js/academic.js` |

The current experience entries come from `CV_Shaolong.pdf`. The existing biography, research interests, news, publication information, and hobby paragraphs have been retained, with formatting changes. MotionMEM has no paper URL in the original page, so its title is plain text until a URL is supplied.

Experience uses shared rows in reverse chronological order. Each research entry can reference an education `id` through `education_id`, placing that degree beside research from the same period. CSU is paired with the 2023–2024 Tsinghua experience, below UNC. The same row order is retained on mobile.

## Publication buttons and expanded content

Each paper has Paper, Abstract, and BibTeX controls. Webpage appears only for LeanWAM, MotionMEM, and OFP; Code appears only for LeanWAM and MotionMEM. Missing external URLs use disabled placeholders instead of dummy links. Set `webpage`, `paper_pdf`, or `code` to enable a link. `webpage_pending: true` and `code_pending: true` keep the requested placeholders visible until their URLs are available. Use the direct `https://arxiv.org/pdf/<id>` URL for `paper_pdf`.

Abstract and BibTeX open inline beneath the current paper, pushing subsequent papers down. Clicking the same button closes its panel; switching buttons replaces the open panel for that paper. Other papers retain their own open state. The overview stays beside the paper header while panels expand. Resource buttons remain stationary during the hover transition so they are easy to click. BibTeX includes a Copy button, with text selection as a fallback when clipboard access is unavailable. Without JavaScript, all abstracts and citations remain readable.

The `abstract` and `bibtex` fields hold the full displayed content; `abstract_source` and `bibtex_source` record provenance for editing. LeanWAM's abstract comes from the supplied manuscript/project page; OFP's abstract and citation match its project page. MST and MAST abstracts come from arXiv, with citations for the published TMLR and NeurIPS versions. The MST citation includes the four authors in the final TMLR paper. LeanWAM and MotionMEM currently use provisional `@unpublished` citations from the existing titles and author lists, without inventing arXiv IDs or publication dates. Their Paper buttons intentionally remain placeholders until the papers are submitted to arXiv. MotionMEM uses the complete abstract supplied by the author.

## Images

Original overviews remain in `overview_figs/`, and original photographs remain in `photos/`. The site uses compressed WebP previews for PDFs and photos. The MotionMEM overview remains SVG.

Publications use compact text rows without a publication count in the introduction. The text stays aligned with the centered reading column at rest. On screens at least 1200px wide with a mouse, hovering or keyboard-focusing a row shifts its text left and reveals a 320px-wide overview on the right. Mouse-click focus alone does not keep a preview open: after returning from a link or closing an Abstract/BibTeX panel, moving the pointer outside the paper restores its centered position. Keyboard navigation still reveals the focused paper through `:focus-visible`. Each preview follows the actual width of that paper's longest text line, leaving a 16px gap and keeping the combined text and preview centered. Font loading and window resizing refresh these measurements without narrowing the title or changing row heights. Phones, touch devices, and narrower windows show an **Overview** link that opens the image viewer. The preview retains the full diagram with `object-fit: contain`. The viewer supports previous/next controls, arrow keys, and Escape. Only the photo viewer shows a link to the original file. Reduced-motion settings disable the animation.

The site does not declare a custom favicon or touch icon, allowing the browser to use its default site icon.

To add a photo, place its JPG in `photos/`, add its filename and description to `_data/photos.yml`, then regenerate previews. To replace a paper figure, keep its filename or update the mapping in `_data/selected_publications.yml`.

```bash
python -m pip install Pillow PyMuPDF
python scripts/prepare_site_media.py
```

Commit the generated `assets/images/` and `_data/media_dimensions.json` along with the source changes. Python is only needed to regenerate previews, not to build or publish the website. Image widths and heights are recorded to prevent layout shifts.

## Local preview

The moon/sun button after CV switches between light and dark themes on About, Publications, and Misc. Light is the default for first-time visitors. `assets/js/theme.js` restores the `academic-theme` localStorage preference before the stylesheet loads and keeps the button, browser theme color, other tabs, and back/forward navigation in sync. If browser storage is blocked, switching still works on the current page. The button is hidden when JavaScript is unavailable.

Both palettes are defined at the top of `_sass/_academic.scss`. Diagram previews and enlarged images retain a white canvas so transparent diagrams remain readable; photographs keep their original colors. Printing uses the light palette. Mouse clicks do not leave focus outlines behind, while keyboard navigation retains a visible theme-colored focus ring.

With Ruby and Bundler installed:

```bash
bundle install
bundle exec jekyll serve --host 127.0.0.1
```

Open `http://127.0.0.1:4000`. Check `/`, `/publications/`, and `/misc/` at desktop and mobile widths. Scroll inside News to see older events. The fonts are hosted locally and include their open-source licenses in `assets/fonts/`.

For publishing, use the repository's existing GitHub Pages workflow after reviewing the changes locally.
