---
title: 'Kategorier'
layout: 'layouts/utstyrsoversikt.html'
pagination:
  data: collections
  size: 1
  alias: tag
  filter: ['all', 'nav', 'blog', 'work', 'featuredWork', 'people', 'rss']
permalink: '/kategori/{{ tag | slugify }}/'
---