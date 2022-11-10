var express = require('express');
var router = express.Router();
// const Book = require('../models').Book;

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

/* GET home page. */
router.get('/', asyncHandler(async (req, res) => {
  res.redirect ('books')
  // res.json({ books })
})); 


module.exports = router;
