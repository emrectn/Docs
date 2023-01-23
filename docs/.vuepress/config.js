module.exports = {
  title: "EmreCetin Notes",
  description: "The description of the site.",
  head: [["link", { rel: "icon", href: `/logo.png` }]],
  base: "/",
  dest: "./dist",

  themeConfig: {
    search: false,
    nav: [
      { text: "Home", link: "/" },
      { text: "Linux", link: "/linux/" },
      { text: "Python", link: "/python/" },
      { text: "Genel", link: "/genel/" },
      { text: "Tcell", link: "/tcell/" },
      { text: "LifeHacks", link: "/lifehacks/" },
      { text: "Guide", link: "/guide/" }
    ],
    sidebar: {
      '/linux/':  [{
        title: 'Linux Docs',
        collapsable: false,
        children: [
          '',
          'docker',
          'general',
          'git',
          'jetson',
          'nvidia'
        ]
      }],
      
      '/python/':  [{
        title: 'Python Docs',
        collapsable: false,
        children: [
          '',
          'general',
          'logger',
          'machine-learning',
          'deep-learning',
          'opencv',
          'onnx',
          'pydantic',
          'pytest'
        ]
      }],

      '/genel/':  [{
        title: 'Genel Docs',
        collapsable: false,
        children: [
          '',
          'genel-notes',
          'tools']
      }],

      '/tcell/':  [{
        title: 'Turkcell Docs',
        collapsable: false,
        children: [
          '',
          'deployment',
          'face_recognition',
          'server',
          'snpe-docker',
          'jetson-installation',
          'qualcom']
      }],
      
      '/lifehacks/':  [{
        title: 'Lifehacks Docs',
        collapsable: false,
        children: [
          '']
      }],
      
      '/guide/':  [{
        title: 'Guide Docs',
        collapsable: false,
        children: [
          '',
          'intern']
      }],
    },
    lastUpdated: 'Last Updated'
  },

  markdown: {
    // options for markdown-it-anchor
    anchor: { permalink: false },
    extendMarkdown: md => {
      md.use(require("markdown-it-katex"));
    }
  }
};

