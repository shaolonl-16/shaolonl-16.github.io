# Editing the website

The site keeps the existing AcademicPages/Jekyll structure and works with GitHub Pages. The main text remains in `_pages/about.md`, `_pages/publications.md`, and `_pages/misc.md`.

Only About displays the author profile. Publications and Misc set `author_profile: false` and use a centered reading column (about 800px wide on desktop), with equal outer margins and no reserved sidebar column.

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
