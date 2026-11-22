---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
body_class: academic-site
---

{% if site.author.googlescholar %}
  You can also find my articles on <a href="{{ site.author.googlescholar }}">my Google Scholar profile</a>.
{% endif %}

{% include base_path %}

<p class="publication-note">(* stands for equal contribution. Listed in reverse chronological order.)</p>

<div class="publication-list">
{% for paper in site.data.selected_publications %}
  {% include publication-card.html paper=paper index=forloop.index %}
{% endfor %}
</div>
