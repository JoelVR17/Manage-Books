const { Router } = require("express");
const router = Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid"); // Corrected import

const jsonBooks = fs.readFileSync("src/books.json", "utf-8");
let books = JSON.parse(jsonBooks);

router.get("/", (req, res) => {
  res.render("index.ejs", {
    books,
  });
});

router.get("/new-entry", (req, res) => {
  res.render("new-entry.ejs");
});

router.post("/new-entry", (req, res) => {
  const { title, author, image, description } = req.body;

  if (!title || !author || !image || !description) {
    res.status(400).send("Entries must have a title and description");
    return;
  }

  let newBook = {
    id: uuidv4(), // Use uuidv4 function to generate a new UUID
    title,
    author,
    image,
    description,
  };

  books.push(newBook);

  const jsnBooks = JSON.stringify(books);

  fs.writeFileSync("src/books.json", jsnBooks, "utf-8");

  res.redirect("/");
});

router.get("/delete/:id", (req, res) => {
  books = books.filter((book) => book.id !== req.params.id);
  const jsnBooks = JSON.stringify(books);
  fs.writeFileSync("src/books.json", jsnBooks, "utf-8");
  res.redirect("/");
});

module.exports = router;
