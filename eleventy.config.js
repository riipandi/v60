/**
 * @typedef {import('@11ty/eleventy').UserConfig} EleventyConfig
 * @typedef {import('vite').UserConfig} ViteConfig
 */

import EleventyPluginNavigation from "@11ty/eleventy-navigation";
import EleventyPluginRss from "@11ty/eleventy-plugin-rss";
import EleventyPluginSyntaxhighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";
import tailwindcss from "@tailwindcss/vite";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";

import filters from "./utils/filters.js";
import shortcodes from "./utils/shortcodes.js";
import transforms from "./utils/transforms.js";

/** @type {ViteConfig} */
const viteOptions = {
  publicDir: "public",
  clearScreen: false,
  appType: "mpa",
  assetsInclude: ["**/*.xml", "**/*.txt"],
  server: {
    mode: "development",
    middlewareMode: true,
    fs: { allow: [".."] },
  },
  resolve: {
    alias: { "/@fs/": "/" },
  },
  plugins: [tailwindcss()],
  build: {
    mode: "production",
    sourcemap: true,
    manifest: true,
    rollupOptions: {
      output: {
        assetFileNames: "assets/css/[name].[hash].css",
        chunkFileNames: "assets/js/[name].[hash].js",
        entryFileNames: "assets/js/[name].[hash].js",
      },
    },
  },
};

/**
 * @param {EleventyConfig} eleventyConfig
 * @returns {Object} Eleventy configuration object
 */
export default function (eleventyConfig) {
  // Core config
  eleventyConfig.setServerPassthroughCopyBehavior("copy");
  eleventyConfig.addPassthroughCopy("public");
  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/assets/js");

  // Plugins
  eleventyConfig.addPlugin(EleventyPluginNavigation);
  eleventyConfig.addPlugin(EleventyPluginRss);
  eleventyConfig.addPlugin(EleventyPluginSyntaxhighlight);
  eleventyConfig.addPlugin(EleventyVitePlugin, {
    tempFolderName: "_tmp",
    viteOptions,
  });

  // Add utilities
  Object.keys(filters).forEach((key) => eleventyConfig.addFilter(key, filters[key]));
  Object.keys(transforms).forEach((key) => eleventyConfig.addTransform(key, transforms[key]));
  Object.keys(shortcodes).forEach((key) => eleventyConfig.addShortcode(key, shortcodes[key]));

  // Markdown config
  eleventyConfig.setLibrary(
    "md",
    markdownIt({
      html: true,
      breaks: true,
      linkify: true,
    }).use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.ariaHidden({
        placement: "after",
        class: "direct-link",
        symbol: "#",
        level: [1, 2, 3, 4],
      }),
      slugify: eleventyConfig.getFilter("slug"),
    }),
  );

  // Force clean URLs without trailing slash
  eleventyConfig.addGlobalData("permalink", () => {
    return (data) => `${data.page.filePathStem}.html`;
  });

  // Dev server config
  eleventyConfig.setServerOptions({
    domdiff: false,
    enabled: true,
    module: "@11ty/eleventy-dev-server",
    showAllHosts: true,
    pathPrefix: "",
    cleanUrls: true,
    redirects: true,
    encoding: "utf-8",
    showVersion: false,
    notFoundTemplate: "404.html",
  });

  // Layouts
  eleventyConfig.addLayoutAlias("base", "base.liquid");
  eleventyConfig.addLayoutAlias("post", "post.liquid");

  return {
    templateFormats: ["md", "html", "liquid"],
    htmlTemplateEngine: "liquid",
    passthroughFileCopy: true,
    pathPrefix: "/",
    cleanUrls: true,
    htmlExtensions: true,
    dir: {
      input: "src",
      output: "_site",
      includes: "_partials",
      layouts: "_layouts",
      data: "_data",
    },
  };
}
