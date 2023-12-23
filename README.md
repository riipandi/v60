# v60 - Eleventy Vite Starter

[![Netlify Status](https://api.netlify.com/api/v1/badges/f2fd46fe-530a-4cc9-bd81-f197ff54b322/deploy-status)](https://app.netlify.com/sites/v60-demo/deploys)

A clean and fast Eleventy Starter Project with Vite.

## Features

- Eleventy 2.0.1
- New Eleventy 2.0 Dev Server with live reload
- Vite 5.0.10
- Vite as Middleware in Eleventy Dev Server (uses [eleventy-plugin-vite](https://github.com/11ty/eleventy-plugin-vite/))
- Eleventy build output is post-processed by [Vite](https://vitejs.dev) (with Rollup)
- CSS post-processing with PostCSS and [Autoprefixer](https://github.com/postcss/autoprefixer)
- Example implementation of a web font loading strategy ([critical FOFT with preload](https://www.zachleat.com/web/comprehensive-webfonts/#critical-foft-preload))
- Basic fluid typography based on [Utopia](https://utopia.fyi)
- Basic dark mode support (using `prefers-color-scheme` and CSS Custom Properties)
- Polyfill for [focus-visible](https://matthiasott.com/notes/focus-visible-is-here)
- RSS feed 🧡
- XML sitemap
- Four Hundos Lighthouse score 💯💯💯💯

## Getting started

Start by [generating a new repository based on this project](https://github.com/riipandi/v60/generate).

After cloning (or downloading) the repository to your local machine, install all dependencies with the command

```sh
pnpm install
```

## Run dev server

The project comes with Eleventy’s built-in development server. You can start the server with

```sh
pnpm serve
```

## Build

To trigger a production build, use

```sh
pnpm build
```

## Deploy a fork of this template to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/riipandi/v60)

## CSS

[Autoprefixer](https://github.com/postcss/autoprefixer) adds necessary browser prefixes. The [browserslist](https://github.com/browserslist/browserslist) settings can be adjusted in `package.json`.

## Roadmap

- Add more base styles and a demo page that shows example styles and components
- Add a toggle button for the dark mode theme
- More advanced base styles for modern CSS layout
- Webmention/IndieWeb support

## Feedback

Please provide feedback! 🤗 Ideally by [filing an issue here](https://github.com/riipandi/v60/issues) – or via a pull request.

## Thank you!

This starter project would not have been possible without the many great sites and projects I was able to learn from, use as inspiration, and shamelessly copy code from:

- Matthias Ott [matthiasott/eleventy-plus-vite](https://github.com/matthiasott/eleventy-plus-vite)
- Zach Leatherman [zachleat.com](https://github.com/zachleat/zachleat.com)
- Max Böck’s [Eleventastic](https://github.com/maxboeck/eleventastic)
- Stephanie Eckles’s [11ty Netlify Jumpstart](https://github.com/5t3ph/11ty-netlify-jumpstart)
- Miriam Suzanne [miriamsuzanne.com](https://www.miriamsuzanne.com)
- W3T [web3templates.com](https://web3templates.com/)
