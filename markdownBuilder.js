const fs = require('fs');
const path = require('path');
const mustache = require('mustache');

const templates = require('./templates');

function markdownBuilder(books, outputPath = '') {
  books.map((book) => {
    var fileContent = mustache.render(templates.bookTemplate, book);

    let fileName = `${book.title
      .replace('&#58;', '')
      .replace(/\W+/g, '-')
      .toLowerCase()}.md`;

    try {
      fs.writeFileSync(path.join(outputPath, fileName), fileContent);
    } catch (error) {
      console.log('ERROR WRITING = ', error.message);
    }
  });
}

module.exports = markdownBuilder;
