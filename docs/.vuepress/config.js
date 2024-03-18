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
      { text: "Guide", link: "/guide/" },
      { text: "Aihub Docs", link: "/apidoc/" },
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
          'kubernetes',
          'nginx',
          'nvidia',
          'tmux',
        ]
      }],

      '/python/':  [{
        title: 'Python Docs',
        collapsable: false,
        children: [
          '',
          'deep-learning',
          'general',
          'logger',
          'machine-learning',
          'pydantic',
          'opencv',
          'pytest',
          'onnx',
        ]
      }],

      '/genel/':  [{
        title: 'Genel Docs',
        collapsable: false,
        children: [
          '',
          'genel-notes',
          'postgresql',
          'wordpress',
          'tools',
          'finance101',
          'communication101',
          'seo'
        ]
      }],

      '/tcell/':  [{
        title: 'Turkcell Docs',
        collapsable: false,
        children: [
          '',
          'deployment',
          'face_recognition',
          'guide',
          'jetson-installation',
          'qualcom',
          'server',
          'snpe-docker',
        ]
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
          'intern',
          'turkcell',
        ]
      }],

      '/apidoc/':  [{
        title: 'Aihub Api Docs',
        collapsable: false,
        children: [
          '',
          'aihub-sima',
          'aihub-optik',
        ]
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

