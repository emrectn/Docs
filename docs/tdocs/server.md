# Advanced

If my template can't meet your requirement, you can further create your own template.

## Vue and VuePress

Before you start building your own template, you should gather some knowledge.

- [Vue.js](https://vuejs.org/)
- [VuePress](https://vuepress.vuejs.org/)

Actually, you don't have to learn the whole Vue.js. Html and CSS are more essential.

By looking at the `.vue` files I provided, you should understand how the `.vue` file works.

Read [VuePress Guide](https://vuepress.vuejs.org/guide/) and understand how VuePress is capable of.

## Components

The components, which are the templates used in this site, are separate `.vue` files under `.vuepress/components` directory.

For example, the `MarkdownCard.vue` is a widget used in the projects page. The `Homepage.vue` is a layout that could be further customized.

For more information, check VuePress doc on [Custom Layout for Specific Pages](https://vuepress.vuejs.org/default-theme-config/#custom-layout-for-specific-pages).


## Override Styles

You can override styles with `.vuepress/override.styl`. Adding simple CSS rules to control how the elements appear on your site.

Check [Simple CSS Override](https://vuepress.vuejs.org/default-theme-config/#simple-css-override) for more help.

## Beyond

You need to know more about Vue and Javascript. :smile:

Learn and create! :muscle:


Since this is a template built upon [VuePress](https://vuepress.vuejs.org/), everything is wrapped up and it takes only 10 minutes to start.

**As esasy as 1, 2, 3**

## Prerequisites

### Get the repo

Download on GitHub: `Clone or download` -> `Download ZIP`

or clone it

```bash
$ git clone https://github.com/mtobeiyf/vuepress-homepage
```

### Prepararation
- You should have [Node.js](https://nodejs.org)**>=8.0.0** installed at first.
- [Yarn](https://yarnpkg.com) is also needed for package management.

You can check by running commands: `node --version`, `npm --version` and `yarn --version`

## Configure and run

```bash
# Get into the directory
$ cd vuepress-homepage

# Install dependencies
$ yarn # or npm install

# Run under developing
$ yarn run dev # or npm run dev
```

Now open your favorite browser and go to `127.0.0.1:8080`, the demo is all set :sunglasses:

![](https://user-images.githubusercontent.com/5097752/39126631-798faf4a-4735-11e8-993d-6f314d4f2b55.png)

## Deploy

To generate your homepage as a static site, run:

```bash
$ yarn run build
```

This will build your site under the `dist` directory. Now you can deploy the files under `dist` directory to any web hosts provider or your own server. If you got stuck, feel free to open an issue or search it on google.

There are several available free online hosts for you:

- [GitHub Pages](https://pages.github.com/)
- [Netlify](https://www.netlify.com/)

For more available instructions, have a look at the [Deploying](https://vuepress.vuejs.org/guide/deploy.html#deploying) section.

### GitHub Pages

Create a repository, clone it to your local machine. And copy files in `dist` to your local repository folder.

Push it to GitHub with [GitHub Desktop](https://pages.github.com/) or command line and done.

### Netlify

Simply rename and drag and drop your `dist` directory to Netlify, follow the instruction and your site will all set up. Check the guide [here](https://vuepress.vuejs.org/guide/deploy.html#netlify).

Also, you can create your own repository and copy all the files except `.git` there. Therefore, your build command would be `yarn build` and your public directory be `dist`. Fast and easy


We'll take this repo as an example to show you how to make this site as you like.

Don't forget to refer to official [VuePress Guide](https://vuepress.vuejs.org/guide/) to find out more.

## Structure

Now, we care about the **docs** directory which includes:

```
docs
├── guide
├── projects
├── README.md
└── .vuepress
    ├── components
    │   ├── Homepage.vue
    │   ├── MContent.vue
    │   ├── Projects.vue
    │   └── styles
    │       └── config.styl
    ├── config.js
    ├── override.styl
    └── public
        ├── icons
        ├── profile.jpg
        └── projects
```

### The documents

The entry page is `README.md`, followed by sub-pages under the directories `guide` and `projects`.

You can modify, delete and create your own directory and `README.md` files according to your needs.

You should have basic idea of [Markdown](https://guides.github.com/features/mastering-markdown/) and YAML Front Matter.

### config.js

The config files of this site are all placed under `.vuepress` directory. The only two you need to concern is `config.js` and `public` folder.

### public

You need to place your images under `docs/.vuepress/public` directory, so that you can access them using `/profile.jpg` in the yaml section of the `README.md` file.

## Modification

### Title

The title of the site and the navbar is in the `docs/.vuepress/config.js`

### Navbar links

Still in the `config.js`, under the `themeConfig` key.

### Homepage

If you don't like the homepage, simply modify the `docs/README.md` file to switch to another layout or just Markdown page.

### Sidebar

There are two different types of sidebars: routing between multiple Markdown files and TOC of a single page.

This **Guide** contains separate files under `docs/guide`. To enable sidebar, you have to manually set this in the `config.js`.

## Pages

### Homepage

As you can see in the `docs/README.md`, most of the contents are written in the YAML front matter. Just modify the corresponding section and you should get yours.

### Projects

Actually, it's a pure Markdown file. You can use the inline widget `<MarkdownCard>` to show your project, publication or portfolio.

You can even add some more sections with Markdown to make this page a resume for you.

### Customize Page

Adding a page is simple, create `docs/Foo/README.md` and you can access it with link `/Foo/` in the context.

To automatically generate the sidebar of the current page, add `sidebar: auto` in the front matter section.

You can even tune the styles with `<style>` tag. Check [here](https://vuepress.vuejs.org/guide/using-vue.html#using-pre-processors) for more information.