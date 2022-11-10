var express = require('express');
var router = express.Router();
var Book = require('../models').Book


/* Handler function to wrap each route. */
const asyncHandler = (cb) => {
  return async (req, res, next) => {
    try {
      await cb (req, res, next)
    } catch (error){
      next (error)
    }
  }
}

/* GET users listing. */
router.get('/', asyncHandler(async (req, res) => {
  const books = await Book.findAll({ order: [[ "createdAt", "DESC" ]]}); 
  res.render("books/index", { books, title: "Taneya's Book Library" });
}));

/* Create a new book form. */
router.get('/new', (req, res) => {
  res.render("books/new", { book: {}, title: "Add New Book" });
});

/* POST create book*/
router.post('/', asyncHandler(async (req, res) => {
  let book; 
  try {
    book = await Book.create(req.body);
    res.redirect("/books/"); 
  } catch (error){
    if (error.name === "SequelizeValidationError"){
      book = await Book.build(req.body); 
      res.render("books/new", { book, errors: error.errors, title: "Add New Book" })
    } else {
      throw error; 
    }
  }
}));

/* GET individual book. */
router.get("/:id", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id)
  book ? res.render("books/update-book", {book, title: book.title}) : res.sendStatus(404); 
}));


/* Update an existing book record. */
router.post('/:id', asyncHandler(async (req, res) => {
  let book; 
  try {
    book = await Book.findByPk(req.params.id); 
    if(book){
      await book.update(req.body); 
      res.redirect(`/books`);
      } else {
        res.sendStatus(404); 
      }
  } catch (error) {
    if (error.name === 'SequelizeValidationError'){
      book = await Book.build(req.body); 
      book.id = req.params.id; 
      res.render(`books/update-book`, { book, errors: error.errors, title: "Edit Book Entry"})
    } else {
      throw error; 
    }
  }
}));

/* Delete individual book. */
router.post('/:id/delete', asyncHandler(async (req ,res) => {
  const book = await Book.findByPk(req.params.id); 
  if (book){
  await book.destroy(); 
  res.redirect("/books");
  } else {
    res.sendStatus(404)
  }
}));

module.exports = router;
