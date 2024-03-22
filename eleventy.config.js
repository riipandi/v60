const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

const EleventyPluginNavigation = require("@11ty/eleventy-navigation");
const EleventyPluginRss = require("@11ty/eleventy-plugin-rss");
const EleventyPluginSyntaxhighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");

const htmlmin = require("html-minifier");

const filters = require("./src/_utils/filters.js");
const transforms = require("./src/_utils/transforms.js");
const shortcodes = require("./src/_utils/shortcodes.js");

module.exports = (eleventyConfig) => {
  eleventyConfig.setServerPassthroughCopyBehavior("copy");
  eleventyConfig.addPassthroughCopy("public");

  // Plugins
  eleventyConfig.addPlugin(EleventyPluginNavigation);
  eleventyConfig.addPlugin(EleventyPluginRss);
  eleventyConfig.addPlugin(EleventyPluginSyntaxhighlight);
  eleventyConfig.addPlugin(EleventyVitePlugin, {
    tempFolderName: "_tmp", // Default name of the temp folder

    // Vite options (equal to vite.config.js inside project root)
    viteOptions: {
      publicDir: "public",
      clearScreen: false,
      server: {
        mode: "development",
        middlewareMode: true,
      },
      appType: "custom",
      assetsInclude: ["**/*.xml", "**/*.txt"],
      build: {
        mode: "production",
        sourcemap: "true",
        manifest: true,
        // This puts CSS and JS in subfolders – remove if you want all of it to be in /assets instead
        rollupOptions: {
          output: {
            assetFileNames: "assets/css/main.[hash].css",
            chunkFileNames: "assets/js/[name].[hash].js",
            entryFileNames: "assets/js/[name].[hash].js",
          },
          plugins: [],
        },
      },
    },
  });

  // Filters
  for (const filterName in filters) {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  }

  // Transforms
  for (const transformName in transforms) {
    eleventyConfig.addTransform(transformName, transforms[transformName]);
  }

  // Minify HTML output
  // TODO move to transform.js
  eleventyConfig.addTransform("htmlmin", function (content) {
    // Prior to Eleventy 2.0: use this.outputPath instead
    if (
      process.env.ELEVENTY_PRODUCTION &&
      this.page.outputPath &&
      this.page.outputPath.endsWith(".html")
    ) {
      const minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
      });
      return minified;
    }

    return content;
  });

  // Shortcodes
  for (const shortcodeName in shortcodes) {
    eleventyConfig.addShortcode(shortcodeName, shortcodes[shortcodeName]);
  }

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Customize Markdown library and settings:
  const markdownLibrary = markdownIt({
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
  });
  eleventyConfig.setLibrary("md", markdownLibrary);

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
      // better not use "public" as the name of the output folder (see above...)
      output: "_site",
      includes: "_includes",
      layouts: "layouts",
      data: "_data",
    },
  };
};
