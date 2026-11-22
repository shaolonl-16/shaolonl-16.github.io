# Editing the website

The site keeps the existing AcademicPages/Jekyll structure and works with GitHub Pages. The main text remains in `_pages/about.md`, `_pages/publications.md`, and `_pages/misc.md`.

| Content | File |
| --- | --- |
| News, newest first | `_data/news.yml` |
| Education and research experience | `_data/experience.yml` |
| Publication titles, authors, links, and overview mapping | `_data/selected_publications.yml` |
| Photo order and image descriptions | `_data/photos.yml` |
| Typography, layout, and responsive styles | `_sass/_academic.scss` |
| Four-item news viewport and image viewer | `assets/js/academic.js` |

The current experience entries come from `CV_Shaolong.pdf`. The existing biography, research interests, news, publication information, and hobby paragraphs have been retained, with formatting changes. MotionMEM has no paper URL in the original page, so its title is plain text until a URL is supplied.

## Images

Original overviews remain in `overview_figs/`, and original photographs remain in `photos/`. The site uses compressed WebP previews for PDFs and photos. The MotionMEM overview remains SVG. Clicking an image opens a viewer with previous/next controls, arrow-key navigation, Escape to close, and a link to the original file.

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
