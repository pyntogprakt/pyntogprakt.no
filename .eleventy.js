// Constants and dependencies
const dateFilter = require('./verktøy/date-filter.js');
const slugify = require("slugify");
const sortByDisplayOrder = require('./verktøy/sort-by-display-order.js');
const sortByName = require('./verktøy/sort-by-name.js');
const prettier = require("prettier");
const rssPlugin = require('@11ty/eleventy-plugin-rss');
const w3DateFilter = require('./verktøy/w3-date-filter.js');

module.exports = (config) => {
  // FILTERS
  config.addFilter('dateFilter', dateFilter);
  config.addFilter('w3DateFilter', w3DateFilter);
  config.addFilter("slug", (str) => {
    if (!str) {
      return;
    }

    return slugify(str, {
      lower: true,
      strict: true,
      remove: /[']/g,
      remove: /[-]/g,
    });
  });

  // PASSTHROUGHS
  config.addPassthroughCopy('./kilde/bilder/');
  config.addPassthroughCopy('./kilde/skrift/');

  // PLUGINS
  config.addPlugin(rssPlugin);

  // COLLECTIONS
  config.addCollection('utstyr', (collection) => {
    return sortByName(collection.getFilteredByGlob('./kilde/utstyr/**/*.md'));
  });
  config.addCollection('anbefaltUtstyr', (collection) => {
    return sortByName(collection.getFilteredByGlob('./kilde/utstyr/**/*.md')).filter((x) => x.data.recommended);
  });
  config.addCollection('tips', (collection) => {
    return [...collection.getFilteredByGlob('./kilde/tips/**/*.md')].reverse();
  });
  config.addCollection('anbefalteTips', (collection) => {
    return sortByName(collection.getFilteredByGlob('./kilde/tips/**/*.md')).filter((x) => x.data.recommended);
  });
  config.addCollection('folk', (collection) => {
    return collection.getFilteredByGlob('./kilde/om/personer/*.md').sort((a, b) => {
      return Number(a.data.id) > Number(b.data.id) ? 1 : -1;
    });
  });
  config.addCollection('prosjekter', (collection) => {
    return sortByName(collection.getFilteredByGlob('./kilde/prosjekter/**/*.md'));
  });
  config.addCollection('personvern', (collection) => {
    return sortByDisplayOrder(collection.getFilteredByGlob('./kilde/personvern/**/*.md'));
  });
  config.addCollection('vilkår', (collection) => {
    return sortByDisplayOrder(collection.getFilteredByGlob('./kilde/vilkår/**/*.md'));
  });

  // FUNCTIONS
  config.addTransform("prettier", function (content) {
    if ((this.page.outputPath || "").endsWith(".html")) {
      let prettified = prettier.format(content, {
        bracketSameLine: false,
        bracketSpacing: false,
        printWidth: 512,
        parser: "html",
        tabWidth: 2
      });
      return prettified;
    };
    // If not an HTML output, return content as-is
    return content;
  });

  // IGNORE
  config.setUseGitIgnore(false);

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'kilde',
      output: 'publisert',
    },
  };
}
