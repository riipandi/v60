import htmlmin from "html-minifier";

// Minify HTML output
const htmlMinifier = function (content) {
  if (
    process.env.ELEVENTY_PRODUCTION &&
    this.page.outputPath &&
    this.page.outputPath.endsWith(".html")
  ) {
    return htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
    });
  }
  return content;
};

export default { htmlMinifier };
