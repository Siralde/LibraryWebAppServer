const express = require('express');
const router = express.Router();

// Require controller modules.
const BookController = require('../controllers/bookController');
const AuthorController = require('../controllers/authorController');
const GenreController = require('../controllers/genreController');
const bookInstanceController = require('../controllers/bookinstanceController');

/// BOOK ROUTES ///

// GET catalog home page.
router.get('/', BookController.index);

// POST request for creating Book.
router.post('/book/create', BookController.bookCreatePost);

// DELETE request to delete Book.
router.delete('/book/:id/delete', BookController.bookDeleteDelete);

// PUT request to update Book.
router.put('/book/:id/update', BookController.bookUpdatePut);

// GET request for one Book.
router.get('/book/:id', BookController.bookDetailGet);

// GET request for list of all Book items.
router.get('/books', BookController.bookListGet);




/// AUTHOR ROUTES ///

// POST request for creating Author.
router.post('/author/create', AuthorController.authorCreatePost);

// DELETE request to delete Author.
router.delete('/author/:id/delete', AuthorController.authorDeleteDelete);

// PUT request to update Author.
router.put('/author/:id/update', AuthorController.authorUpdatePut);

// GET request for one Author.
router.get('/author/:id', AuthorController.authorDetailGet);

// GET request for list of all Authors.
router.get('/authors', AuthorController.authorListGet);




/// GENRE ROUTES ///

// POST request for creating Genre.
router.post('/genre/create', GenreController.genreCreatePost);

// DELETE request to delete Genre.
router.delete('/genre/:id/delete', GenreController.genreDeleteDelete);

// PUT request to update Genre.
router.put('/genre/:id/update', GenreController.genreUpdatePut);

// GET request for one Genre.
router.get('/genre/:id', GenreController.genreDetailGet);

// GET request for list of all Genre.
router.get('/genres', GenreController.genreListGet);




/// BOOKINSTANCE ROUTES ///

// POST request for creating a BookInstance.
router.post('/bookinstance/create', bookInstanceController.bookinstanceCreatePost);

// DELETE request to delete BookInstance.
router.delete('/bookinstance/:id/delete', bookInstanceController.bookinstanceDeleteDelete);

// PUT request to update BookInstance.
router.put('/bookinstance/:id/update', bookInstanceController.bookinstanceUpdatePut);

// GET request for one BookInstance.
router.get('/bookinstance/:id', bookInstanceController.bookinstanceDetailGet);

// GET request for list of all BookInstance.
router.get('/bookinstances', bookInstanceController.bookinstanceListGet);

module.exports = router;