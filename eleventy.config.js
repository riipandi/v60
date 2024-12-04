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
  },
  // @ref: https://tailwindcss.com/docs/v4-beta
  plugins: [tailwindcss()],
  build: {
    mode: "production",
    sourcemap: "true",
    manifest: true,
    rollupOptions: {
      output: {
        assetFileNames: "assets/css/main.[hash].css",
        chunkFileNames: "assets/js/[name].[hash].js",
        entryFileNames: "assets/js/[name].[hash].js",
      },
      plugins: [],
    },
  },
};

/**
 * @param {EleventyConfig} eleventyConfig
 * @returns {Object} Eleventy configuration object
 */
export default function (eleventyConfig) {
  eleventyConfig.setServerPassthroughCopyBehavior("copy");
  eleventyConfig.addPassthroughCopy("public");

  // Plugins
  eleventyConfig.addPlugin(EleventyPluginNavigation);
  eleventyConfig.addPlugin(EleventyPluginRss);
  eleventyConfig.addPlugin(EleventyPluginSyntaxhighlight);

  // Vite options (equal to vite.config.js inside project root)
  eleventyConfig.addPlugin(EleventyVitePlugin, {
    tempFolderName: "_tmp",
    viteOptions,
  });

  // Filters
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  });

  // Transforms
  Object.keys(transforms).forEach((transformName) => {
    eleventyConfig.addTransform(transformName, transforms[transformName]);
  });

  // Shortcodes
  Object.keys(shortcodes).forEach((shortcodeName) => {
    eleventyConfig.addShortcode(shortcodeName, shortcodes[shortcodeName]);
  });

  // Customize Markdown library and settings:
  eleventyConfig.setLibrary(
    "md",
    markdownIt({ html: true, breaks: true, linkify: true }).use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.ariaHidden({
        placement: "after",
        class: "direct-link",
        symbol: "#",
        level: [1, 2, 3, 4],
      }),
      slugify: eleventyConfig.getFilter("slug"),
    }),
  );

  // Layouts
  eleventyConfig.addLayoutAlias("base", "base.liquid");
  eleventyConfig.addLayoutAlias("post", "post.liquid");

  // Copy/pass-through files
  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/assets/js");

  return {
    templateFormats: ["md", "html", "liquid"],
    htmlTemplateEngine: "liquid",
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "_site",
      includes: "_partials",
      layouts: "_layouts",
      data: "_data",
    },
  };
}
