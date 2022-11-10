'use strict';

const Sequelize = require('sequelize'); 

module.exports = (sequelize) => {
  class Book extends Sequelize.Model {}
  Book.init({
      title: {
          type: Sequelize.STRING, 
          allowNull: false, 
          validate: {
              notEmpty: {
                  msg: 'Please Enter Valid "Author" Name', 
              }
          }
      }, 
      author: {
          type: Sequelize.STRING, 
          allowNull: false, 
          validate: {
              notEmpty: {
                  msg: 'Please Enter Valid "Author" Name'
              }
          }
      }, 
      genre: Sequelize.STRING, 
      year: Sequelize.INTEGER, 
  }, {sequelize});

  return Book; 
}; 