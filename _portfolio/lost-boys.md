---
layout: project
title: Lost Boys
role: Director
tools: [Screenwriting, Directing, Set Design]
year: 2026
image: assets/images/lost-boys/lost-boys-thumbnail.png
portfolio-type:
  - type: highlights
  - type: film
  - type: design
banner_color: bg-dark
accent_color: text-white
banner_image: assets/images/lost-boys/lost-boys-2.png
theme: dark
gallery:
  type: slider
  images:
    - src: assets/images/lost-boys/lost-boys-1.png
    - src: assets/images/lost-boys/lost-boys-2.png
    - src: assets/images/lost-boys/lost-boys-3.png
    - src: assets/images/lost-boys/lost-boys-4.png
    - src: assets/images/lost-boys/lost-boys-5.png
    - src: assets/images/lost-boys/lost-boys-6.png
    - src: assets/images/lost-boys/lost-boys-7.png
    - src: assets/images/lost-boys/lost-boys-bts-1.JPG
    - src: assets/images/lost-boys/lost-boys-bts-2.JPG
    - src: assets/images/lost-boys/lost-boys-screening-1.jpg
    - src: assets/images/lost-boys/lost-boys-screening-2.jpg

gallery-sets:
  type: grid
  columns: 2
  images:
    - src: assets/images/lost-boys/lost-boys-sets-1.JPG
    - src: assets/images/lost-boys/lost-boys-sets-2.JPG
    - src: assets/images/lost-boys/lost-boys-sets-3.JPG
    - src: assets/images/lost-boys/lost-boys-sets-4.JPG
    - src: assets/images/lost-boys/lost-boys-sets-5.JPG
    - src: assets/images/lost-boys/lost-boys-sets-6.JPG

---

The culmination of my Virtual Production in LED Volumes class, Lost Boys, is a story I wrote and directed about two imaginative guys, a traumatized fairy, and the origin of Captain Hook, set in the world of Peter Pan!

Beyond writing and directing, I leveraged my architecture background to convert our virtual pirate ship into a buildable and scale-accurate ship railing, built alongside instructor Chad Dellinger and production designer Michael Beckstrom. I also leveraged Unreal Engine 5 to render our CGI sequences and key images for AI animation.

Please reach out to receive a link to the film!

{% assign sets = page['gallery-sets'] %}
{% include gallery-grid.html images=sets.images columns=sets.columns %}
