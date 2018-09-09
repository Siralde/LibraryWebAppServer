const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');
const BookInstance = require('../models/bookinstance');

exports.index = (req, res, next) => {

    return Promise.all([
        // Lanza todos en paralelos
        // Devuelve el numero de libros de la base de datos, los metodos de mongoose
        Book.count({}),
        BookInstance.count({}),
        BookInstance.count({status:'Available'}),
        Author.count({}),
        Genre.count({}),

    ]).then((result) => {
        // Devuelve un obejto que tiene los valores de el array result
        return res.status(200).send({
            book_count: result[0],
            book_instance_count: result[1],
            book_instance_available_count: result[2],
            author_count: result[3],
            genre_count: result[4],
        })
    }).catch((err) => {
       return next(err);
    });

    // async.parallel({
    //     book_count: function(callback) {
    //         Book.count({}, callback); // Pass an empty object as match condition to find all documents of this collection
    //     },
    //     book_instance_count: function(callback) {
    //         BookInstance.count({}, callback);
    //     },
    //     book_instance_available_count: function(callback) {j
    //         BookInstance.count({status:'Available'}, callback);
    //     },
    //     author_count: function(callback) {
    //         Author.count({}, callback);
    //     },
    //     genre_count: function(callback) {
    //         Genre.count({}, callback);
    //     },
    // }, function(err, results) {
    //     res.render('index', { title: 'Local Library Home', error: err, data: results });
    // });
    // res.send('NOT IMPLEMENTED: Site Home Page');
};

// Display list of all books.
exports.bookListGet = (req, res, next) => {

    Book.find({}, 'title author genre isbn summary')
        .populate('author')
        .populate('genre')
        // .populate('summary')
        // El primer parametro es un error y el segundo es un array
        .exec( (err, list_books) => {
            // Si va mal paso el error
            if (err) { return next(err); }

            res.status(200).send({book_list: list_books});
            //Successful, so render
            // res.render('book_list', { title: 'Book List', book_list: list_books });
        });


    // res.send('NOT IMPLEMENTED: Book list');
};

exports.bookDetailGet = (req, res, next) => {

    let id = req.params.id;

    return Promise.all([
        // Lanza todos en paralelos
        // Devuelve el numero de libros de la base de datos, los metodos de mongoose

        Book.findOne({_id: id})
            .populate('author')
            .populate('genre')
            .exec(), //Cuando encadenas algo a moongosse se lanza el exec
        BookInstance.find({book: id})

    ]).then((results) => {

        // Devuelve un objeto que tiene los valores de el array result

        let book = results[0];
        let instances = results[1];

        if(!book)
        {
            return res.status(404).send('Book not found');
        }

        return res.status(200).send({
            book, // book : book
            book_instance: instances
        })


    }).catch((err) => {
        return next(err);
    });


};


// exports.bookCreatePost = (req, res, next) => {
//
//     bookdetail = {
//         title: req.body.title,
//         summary: req.body.summary,
//         author: req.body.author,
//         isbn: req.body.isbn,
//         genre: req.body.genre
//     };
//
//     let book = new Book(bookdetail);
//
//     book.save((err) => {
//         if (err)
//         {
//             return next(err);
//         }
//         res.status(200).send({book})
//     });
// };

exports.bookCreatePost = (req, res, next) => {

    let data = req.body;

    let book = new Book(data);

    book.save((err, savedBook) => {
        if (err)
        {
            return next(err);
        }
        res.status(200).send({savedBook})
    });
};

// exports.bookDeleteDelete = (req, res, next) => {
//
//     Book.findOneAndDelete({_id: req.params.id})
//         .exec((err) => {
//             if (err) {
//                 return next(err);
//             }
//             res.status(200).send('Delete')
//         });
//
// };



exports.bookDeleteDelete = (req, res, next) => {

    let id = req.params.id;

    return Promise.all([
        // Lanza todos en paralelos
        // Devuelve el numero de libros de la base de datos, los metodos de mongoose

        Book.findOne({_id: id})
            .populate('author')
            .populate('genre')
            .exec(), //Cuando encadenas algo a moongosse se lanza el exec
        BookInstance.find({book: id})

    ]).then((results) => {

        // Devuelve un objeto que tiene los valores de el array result

        let book = results[0];
        let instances = results[1];

        if(!book)
        {
            return res.status(404).send('Book not found');
        }

        if (instances.lenght > 0) {
            return res.status(400).send('This books has intances')
        }


        return Book.findByIdAndRemove(id).then( () => {
            return res.status(200).send('Delete')
        })


    }).catch((err) => {
        return next(err);
    });

};

// exports.bookUpdatePut = (req, res, next) => {
//
//     bookdetail = {
//         title: req.body.title,
//         summary: req.body.summary,
//         author: req.body.author,
//         isbn: req.body.isbn,
//         genre: req.body.genre
//     };
//
//     let book = new Book(bookdetail);
//
//     Book.findOneAndUpdate({_id: req.params.id}, book, {})
//         .exec((err, book) => {
//
//             if(err)
//             {
//                 return next(err);
//             }
//
//             res.status(200).send({book})
//         });
//
// };


// Hay que pasarle el mismo id

exports.bookUpdatePut = (req, res, next) => {

    let id = req.params.id;

    let data = req.body;

    data._id = id;

    let book = new Book(data);


    // El id de lo que quieres encontrar
    // El objeto de lo que quires modificar
    // Un objeto de opciones que hay que deja vacio en este caso
    // DEVUELVE EL OBJETO ANTES DEL CAMBIO
    Book.findByIdAndUpdate(id, book, {new: true})
        .populate('author')
        .populate('genre')
        .then((updatedBook) => {

            if  (!updatedBook)
            {
                return res.status(404).send('Book not found');
            }

            return res.status(200).send({updatedBook});
        })
        .catch ((err) => {
            return next(err);
        });
};
