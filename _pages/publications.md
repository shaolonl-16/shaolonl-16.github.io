---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: false
body_class: academic-site
page_class: publications-page
---

{% if site.author.googlescholar %}
  You can also find my articles on <a href="{{ site.author.googlescholar }}">my Google Scholar profile</a>.
{% endif %}

{% include base_path %}

<div class="publication-summary">
  <p class="publication-note">(* stands for equal contribution. Listed in reverse chronological order.)</p>
</div>

<div class="publication-list">
{% for paper in site.data.selected_publications %}
  {% include publication-card.html paper=paper index=forloop.index %}
{% endfor %}
</div>
