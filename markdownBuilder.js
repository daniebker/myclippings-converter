const fs = require('fs');
const path = require('path');
const mustache = require('mustache');

const templates = require('./templates');

function markdownBuilder(books, outputPath = '') {
  renderTemplate(books, outputPath, templates.bookTemplate)
}

function renderTemplate(books, outputPath, template) {
  books.map((book) => {
    var fileContent = mustache.render(template.template, book);

    let fileName = `${book.title
      .replace('&#58;', '')
      .replace(/\W+/g, '-')
      .toLowerCase()}.${template.fileExt}`;

    try {
      fs.writeFileSync(path.join(outputPath, fileName), fileContent);
    } catch (error) {
      console.log('ERROR WRITING = ', error.message);
    }
  });
}

function orgModeBuilder(books, outputPath = '') {
  renderTemplate(books, outputPath, templates.orgModeTemplate)
}

module.exports = { markdownBuilder, orgModeBuilder };
