import {
  dateToRfc3339,
  getNewestCollectionItemDate,
} from "@11ty/eleventy-plugin-rss";

export default function (eleventyConfig) {
  // Copy static assets straight through to the build.
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });

  // Preserve the poet's line breaks: a single newline becomes <br>,
  // a blank line starts a new stanza (<p>).
  eleventyConfig.amendLibrary("md", (mdLib) => {
    mdLib.set({ breaks: true, html: true });
  });

  // The book, in reading order (oldest first).
  eleventyConfig.addCollection("gedichten", (api) =>
    api.getFilteredByTag("gedichten").sort((a, b) => a.date - b.date)
  );

  // Readable Dutch date, e.g. "3 januari 2026".
  eleventyConfig.addFilter("datum", (value) =>
    new Intl.DateTimeFormat("nl-NL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(value)
  );

  // First line of a poem, used as the meta description.
  eleventyConfig.addFilter("eersteRegel", (content) => {
    if (!content) return "";
    const text = String(content)
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return text.length > 160 ? text.slice(0, 157) + "…" : text;
  });

  // Date helpers for the Atom feed + sitemap. Imported directly (not via the
  // RSS plugin) on purpose: the RSS feedPlugin registers the HTML-base URL
  // transform twice, which double-applies pathPrefix to every root-relative
  // link. Registering just the helpers keeps a single `url` filter in charge.
  eleventyConfig.addFilter("dateToRfc3339", dateToRfc3339);
  eleventyConfig.addFilter("getNewestCollectionItemDate", getNewestCollectionItemDate);

  return {
    // Set PATH_PREFIX at build time for GitHub project pages
    // (e.g. PATH_PREFIX=/johannes-schrijft/). Defaults to "/".
    pathPrefix: process.env.PATH_PREFIX || "/",
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
