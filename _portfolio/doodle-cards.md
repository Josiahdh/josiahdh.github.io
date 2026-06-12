---
layout: project
title: Doodle Cards
role: Marketing Lead
tools: [Trailer Editing, Gameplay Capture]
year: 2026
order: 3
image: assets/images/doodle-cards/expo-logo.jpg
portfolio-type:
  - type: featured
  - type: games
banner_color: bg-dark
accent_color: text-white
banner_image: assets/images/doodle-cards/expo-banner.jpg
theme: dark
link: https://doodle-cards.fly.dev/
gallery:
  type: video
  videos:
    - url: https://youtu.be/9amC5TIQ2rg

gallery-screenshots:
  type: grid
  columns: 2
  images:
    - src: assets/images/doodle-cards/doodle-cards-poster.jpg
    - src: assets/images/doodle-cards/expo-screenshot-1.jpg
    - src: assets/images/doodle-cards/expo-screenshot-2.jpg
    - src: assets/images/doodle-cards/expo-screenshot-3.jpg
    - src: assets/images/doodle-cards/expo-screenshot-4.jpg
    - src: assets/images/doodle-cards/expo-screenshot-5.jpg
    - src: assets/images/doodle-cards/expo-screenshot-6.jpg

---

Doodle Cards spawned out of a group within the [Masterworks of Horror](_portfolio/masterworks.md) team. Horizontal in nature, I was brought on to lead marketing material development and assist with design feedback and usability testing.

{% assign screenshots = page['gallery-screenshots'] %}
{% include gallery-grid.html images=screenshots.images columns=screenshots.columns %}