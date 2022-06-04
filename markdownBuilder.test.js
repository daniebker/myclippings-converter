const fs = require('fs');

const { markdownBuilder, orgModeBuilder } = require('./markdownBuilder');

const EXPECTED_PATH_1 = 'scrum-and-xp-from-the-trenches';
const EXPECTED_PATH_2 = 'another-book';

const books = [
  {
    title: "another book",
    author: "ahoter author",
    date: "2000-01-01",
    quotes: [
      {
        date: "2015-02-21",
        quote: "dsdsd",
      },
    ],
  },
  {
    title: "Scrum And Xp&#58; From The Trenches",
    author: "Henrik Kniberg",
    date: "2015-02-21",
    coverUrl: "https://some.cover.url/end.jpg",
    quotes: [
      {
        date: "2015-02-21",
        quote:
          "Pair programming does improve code quality&#58; Pair programming does improve team focus...",
      },
      {
        date: "2015-02-19",
        quote: "test",
      },
    ],
  },
];

describe('markdownBuilder should', () => {
  afterAll(() => {
    fs.unlinkSync(`${EXPECTED_PATH_1}.md`);
    fs.unlinkSync(`${EXPECTED_PATH_2}.md`);
  });

  test('create a md file with correct name for each book', () => {
    markdownBuilder(books);

    expect(fs.existsSync(`${EXPECTED_PATH_1}.md`, 'utf8')).toBe(true);
    expect(fs.existsSync(`${EXPECTED_PATH_2}.md`, 'utf8')).toBe(true);
  });

  test('create md files with proper data', () => {
    markdownBuilder(books);

    expect(fs.readFileSync(`${EXPECTED_PATH_1}.md`, "utf8")).toStrictEqual(
      `---
title: Scrum And Xp&#58; From The Trenches
bookauthor: Henrik Kniberg
date: 2015-02-21
header:
  teaser: https://some.cover.url/end.jpg
---

## Henrik Kniberg - Scrum And Xp&#58; From The Trenches

<img width="300" src="https://some.cover.url/end.jpg"/>

### 2015-02-21
> Pair programming does improve code quality&#58; Pair programming does improve team focus...
### 2015-02-19
> test
`
    );
  });
});


describe('markdownBuilder ordModeTemplate should', () => {
  afterAll(() => {
    fs.unlinkSync(`${EXPECTED_PATH_1}.org`);
    fs.unlinkSync(`${EXPECTED_PATH_2}.org`);
  });

  test('create an org file with correct name for each book', () => {
    orgModeBuilder(books);

    expect(fs.existsSync(`${EXPECTED_PATH_1}.org`, 'utf8')).toBe(true);
    expect(fs.existsSync(`${EXPECTED_PATH_2}.org`, 'utf8')).toBe(true);
  });

  test('create org files with proper data', () => {
    orgModeBuilder(books);

    expect(fs.readFileSync(`${EXPECTED_PATH_1}.org`, 'utf8')).toStrictEqual(
      `* Henrik Kniberg, Scrum And Xp&#58; From The Trenches
:PROPERTIES:
:CREATED: 2015-02-21
:TITLE: Scrum And Xp&#58; From The Trenches
:AUTHOR: Henrik Kniberg
:END'

** 2015-02-21
#+BEGIN_QUOTE
Pair programming does improve code quality&#58; Pair programming does improve team focus...
#+END_QUOTE
** 2015-02-19
#+BEGIN_QUOTE
test
#+END_QUOTE
`
    );
  });
})
