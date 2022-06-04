const fs = require("fs");
const parse = require("./parser");
const axios = require("axios");

jest.mock("axios");

describe("MyClippings parser should", () => {
  let myClippings;

  axios.get.mockImplementation(() => Promise.resolve({ data: { docs: [] } }));

  beforeEach(() => {
    myClippings = fs.readFileSync("My Clippings.txt", "utf8");
  });

  test("split clippings removing empty ones", async () => {
    const books = await parse(myClippings);

    let totalClippings = 0;
    books.map((b) => (totalClippings += b.quotes.length));
    expect(totalClippings).toBe(2);
  });

  test("map every quote", async () => {
    const result = await parse(myClippings);

    expect(result[0]).toStrictEqual({
      title: "Four Thousand Weeks",
      date: "2022-05-24",
      author: "Burkeman, Oliver",
      quotes: [
        {
          date: "2022-05-24",
          quote:
            "The cognitive scientist Douglas Hofstadter is famous, among other reasons, for coining ‘Hofstadter’s law’, which states that any task you’re planning to tackle will always take longer than you expect, ‘even when you take into account Hofstadter’s Law’.",
        },
        {
          date: "2022-05-24",
          quote:
            "That feature will take at least a week. So let's say two to be safe.",
        },
      ],
    });
  });

  test("parse colon to avoid errors", async () => {
    const result = await parse(`hola:hola (pepe)
- Your Highlight on page 113 | location 1544-1546 | Added on Tuesday, 24 May 2022 21:27:10

test :    test
==========`);

    expect(result[0]).toStrictEqual({
      title: "hola&#58;hola",
      date: "2022-05-24",
      author: "pepe",
      quotes: [
        {
          date: "2022-05-24",
          quote: "test &#58;    test",
        },
      ],
    });
  });

  test("group by books", async () => {
    const result = await parse(myClippings);

    expect(result.length).toBe(1);
  });

  test("set oldest clipping date to book", async () => {
    const result = await parse(myClippings);

    expect(result[0].date).toStrictEqual("2022-05-24");
  });
});
