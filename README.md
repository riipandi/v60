# v60 - Eleventy Vite Starter

[![Netlify Status](https://api.netlify.com/api/v1/badges/f2fd46fe-530a-4cc9-bd81-f197ff54b322/deploy-status)](https://app.netlify.com/sites/v60-demo/deploys)

A clean and fast Eleventy Starter Project with Vite.

## Features

- Eleventy v3.0 + live reload
- Vite v5 as Middleware in Eleventy Dev Server (uses [eleventy-plugin-vite](https://github.com/11ty/eleventy-plugin-vite/))
- Eleventy build output is post-processed by [Vite](https://vitejs.dev)
- CSS post-processing with PostCSS and [Autoprefixer](https://github.com/postcss/autoprefixer)
- [Tailwind CSS](https://tailwindcss.com) support + [@egoist/tailwindcss-icons](https://www.npmjs.com/package/@egoist/tailwindcss-icons)
- RSS feed 🧡
- XML sitemap
- Great Lighthouse score 💯💯💯💯

## Getting started

Start by [generating a new repository based on this project](https://github.com/riipandi/v60/generate).

After cloning (or downloading) the repository to your local machine, install all dependencies with the command

```sh
pnpm install
```

## Up and running

The project comes with Eleventy’s built-in development server. You can start the server with

```sh
pnpm dev
```

To trigger a production build, use

```sh
pnpm build
```

## Deploy your own

You'll want to fork this repository and deploy your own Next.js website. Once you have an
image generator that sparks joy, you can setup [automatic GitHub](https://vercel.com/github)
deployments so that pushing to master will deploy to production! 🚀

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/riipandi/v60&project-name=v60-eleventy&repo-name=v60-eleventy&env=ELEVENTY_PRODUCTION)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/riipandi/v60)

#### Cloudflare Deployment

You need to add `NODE_VERSION` with value `18.17.1` or `20.9.0` on the environment variables setting.
Visit [Cloudflare pages docs](https://developers.cloudflare.com/pages/platform/build-configuration/)
for more information.

Example environment variables for the preview branch:

```env
PUBLIC_SITE_URL=${CF_PAGES_URL}
ELEVENTY_PRODUCTION=true
```

## CSS

[Autoprefixer](https://github.com/postcss/autoprefixer) adds necessary browser prefixes. The [browserslist](https://github.com/browserslist/browserslist) settings can be adjusted in `package.json`.

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

## License

This project is open-sourced software licensed under the [MIT license](./LICENSE).

Copyrights in this project are retained by their contributors.
See the [license file](./LICENSE) for more information.

---

<sub>🤫 Psst! If you like my work you can support me via [GitHub sponsors](https://github.com/sponsors/riipandi).</sub>
