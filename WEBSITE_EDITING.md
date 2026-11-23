# Editing the website

The site keeps the existing AcademicPages/Jekyll structure and works with GitHub Pages. The main text remains in `_pages/about.md`, `_pages/publications.md`, and `_pages/misc.md`.

Only About displays the author profile. Publications and Misc set `author_profile: false` and use a centered reading column (about 800px wide on desktop), with equal outer margins and no reserved sidebar column.

| Content | File |
| --- | --- |
| News, newest first | `_data/news.yml` |
| Education and research experience | `_data/experience.yml` |
| Publication titles, authors, links, and overview mapping | `_data/selected_publications.yml` |
| Photo order and image descriptions | `_data/photos.yml` |
| Typography, layout, and responsive styles | `_sass/_academic.scss` |
| News viewport, publication preview spacing, and image viewer | `assets/js/academic.js` |

The current experience entries come from `CV_Shaolong.pdf`. The existing biography, research interests, news, publication information, and hobby paragraphs have been retained, with formatting changes. MotionMEM has no paper URL in the original page, so its title is plain text until a URL is supplied.

Experience uses shared rows in reverse chronological order. Each research entry can reference an education `id` through `education_id`, placing that degree beside research from the same period. CSU is paired with the 2023–2024 Tsinghua experience, below UNC. The same row order is retained on mobile.

## Images

Original overviews remain in `overview_figs/`, and original photographs remain in `photos/`. The site uses compressed WebP previews for PDFs and photos. The MotionMEM overview remains SVG.

Publications use compact text rows without a publication count in the introduction. The text stays aligned with the centered reading column at rest. On screens at least 1200px wide with a mouse, hovering or keyboard-focusing a row shifts its text left and reveals a 320px-wide overview on the right. Each preview follows the actual width of that paper's longest text line, leaving a 16px gap and keeping the combined text and preview centered. Font loading and window resizing refresh these measurements without narrowing the title or changing row heights. Phones, touch devices, and narrower windows show an **Overview** link that opens the image viewer. The preview retains the full diagram with `object-fit: contain`. The viewer supports previous/next controls, arrow keys, and Escape. Only the photo viewer shows a link to the original file. Reduced-motion settings disable the animation.

The site does not declare a custom favicon or touch icon, allowing the browser to use its default site icon.

To add a photo, place its JPG in `photos/`, add its filename and description to `_data/photos.yml`, then regenerate previews. To replace a paper figure, keep its filename or update the mapping in `_data/selected_publications.yml`.

```bash
python -m pip install Pillow PyMuPDF
python scripts/prepare_site_media.py
```

Commit the generated `assets/images/` and `_data/media_dimensions.json` along with the source changes. Python is only needed to regenerate previews, not to build or publish the website. Image widths and heights are recorded to prevent layout shifts.

## Local preview

With Ruby and Bundler installed:

```bash
bundle install
bundle exec jekyll serve --host 127.0.0.1
```

Open `http://127.0.0.1:4000`. Check `/`, `/publications/`, and `/misc/` at desktop and mobile widths. Scroll inside News to see older events. The fonts are hosted locally and include their open-source licenses in `assets/fonts/`.

For publishing, use the repository's existing GitHub Pages workflow after reviewing the changes locally.
