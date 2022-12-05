---
pageClass: about-page
description: 'The biography and information about me.'
avatar: /profile.jpg
head: 'EmreCetin'
info: 'Student at Istanbul Technical Uni'
interests: 'AI - Python - Linux'
socials:
- title: github
  link: https://github.com/emrectn
- title: linkedin
  link: https://www.linkedin.com/emrectn
- title: instagram
  link: https://www.instagram.com/emrec.tin
- title: email
  link: 'mailto:emrec.tin[at]gmail.com'
actions:
- text: Blog
  link: https://github.com/emrectn
---

<AboutCard :frontmatter="$page.frontmatter" >

I attended [Hogwarts School of Witchcraft and Wizardry](https://en.wikipedia.org/wiki/Hogwarts) to study witchcraft, supervised by **Dumbledore** and other professors. I'm trying my best to battle with Lord Voldemort, the evil Wizard that we all fear. My research area includes Defence Against the Dark Arts and other magic. :dizzy:

</AboutCard>

<style lang="stylus">

.theme-container.about-page .page
  background-color #e6ecf0
  min-height calc(100vh)
  
  .last-updated
    display none

</style>