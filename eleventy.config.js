import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";

import EleventyPluginNavigation from "@11ty/eleventy-navigation";
import EleventyPluginRss from "@11ty/eleventy-plugin-rss";
import EleventyPluginSyntaxhighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";

import filters from "./src/_utils/filters.js";
import shortcodes from "./src/_utils/shortcodes.js";
import transforms from "./src/_utils/transforms.js";

/** @type {import('vite').UserConfig} */
const viteOptions = {
  publicDir: "public",
  clearScreen: false,
  server: { middlewareMode: true },
  appType: "custom",
  assetsInclude: ["**/*.xml", "**/*.txt"],
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
  eleventyConfig.addLayoutAlias("base", "base.njk");
  eleventyConfig.addLayoutAlias("post", "post.njk");

  // Copy/pass-through files
  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/assets/js");

  return {
    templateFormats: ["md", "njk", "html", "liquid"],
    htmlTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "layouts",
      data: "_data",
    },
  };
}
