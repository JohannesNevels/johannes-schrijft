export default {
  tags: ["gedichten"],
  layout: "gedicht.njk",
  eleventyComputed: {
    // Meta description = the poem's first non-empty line.
    description: (data) => {
      const raw = (data.page && data.page.rawInput) || "";
      const line = raw
        .split("\n")
        .map((s) => s.trim())
        .find((s) => s.length > 0);
      return line || data.site.tagline;
    },
  },
};
