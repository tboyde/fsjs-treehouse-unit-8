/*
* 404 and Global Error Handlers
*/

// Error handler for handling non-existent routes
const pageNotFound = (req, res, next) => {
    const err = new Error(); 
    err.status = 404;  
    err.message = 'Sorry, we unfortunately do not have a page that matches your search. Please try again.'
    next(err)
  }; 
  
  // Global error handler
  const handleAllErrors = (err, req, res, next) => {
  if (err.status === 404 ){ 
    res.status(404); 
    res.render('page-not-found', {err, title: 'Page Not Found'}); 
    console.log('404 Error has occured. Please try again.'); 
  } else {
    err.status = 500; 
    err.message = "Uh Oh! Looks like it's an error related issue. Please try again." 
    res.status(err.status); 
    res.render('error', { err, title: 'Server Error' });
    console.log(err.status, err.message)
  }
  };
  
  module.exports = {pageNotFound, handleAllErrors}; 