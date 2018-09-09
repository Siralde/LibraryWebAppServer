const Author = require('../models/author');
const Book = require('../models/book');

// Display list of all Authors.
exports.authorListGet = (req, res, next) => {

    Author.find()
        .sort([['family_name', 'ascending']])
        .exec((err, list_authors) => {
            if (err) { return next(err); }

            res.status(200).send({author_list: list_authors});
            // //Successful, so render
            // res.render('author_list', { title: 'Author List', author_list: list_authors });
        });
};

// Display detail page for a specific Author.
exports.authorDetailGet = (req, res, next) => {

    let id = req.params.id;

    return Promise.all([
        // Lanza todos en paralelos
        // Devuelve el numero de libros de la base de datos, los metodos de mongoose

        Author.findOne({_id: id}),
        Book.find({author: id})
            .populate('genre')

    ]).then((results) => {

        // Devuelve un objeto que tiene los valores de el array result

        let author = results[0];
        let authorBooks = results[1];

        if(!author)
        {
            return res.status(404).send('Author not Found');
        }

        return res.status(200).send({
            author, // book : book
            authorBooks
        })


    }).catch((err) => {
        return next(err);
    });


};

// Display Author create form on POST.
exports.authorCreatePost = (req, res, next) => {

    let data = req.body;

    let author = new Author(data);

    author.save((err, savedAuthor) => {
        if (err)
        {
            return next(err);
        }
        res.status(200).send({savedAuthor})
    });
};


// Handle Author delete on DELETE.
exports.authorDeleteDelete = (req, res, next) => {

    let id = req.params.id;

    return Promise.all([
        // Lanza todos en paralelos
        // Devuelve el numero de libros de la base de datos, los metodos de mongoose

        Author.findOne({_id: id}),  // Devuelve objeto
        Book.find({author: id}) //Devuelve array

    ]).then((results) => {

        // Devuelve un objeto que tiene los valores de el array result

        let author = results[0];
        let books = results[1];

        // aqui lo cambie
        if(!author)
        {
            return res.status(404).send('Author not found')
        }

        if (books.lenght > 0) {
            return res.status(400).send('This Author has books in the Library')
        }

        return Author.findByIdAndRemove(id).then( () => {
            return res.status(200).send('Author Delete')
        });

    }).catch((err) => {
        return next(err);
    });
};

// Handle Author update on PUT.
exports.authorUpdatePut = (req, res, next) => {
    let id = req.params.id;

    let data = req.body;
    data._id = id;

    let author = new Author(data);


    // El id de lo que quieres encontrar
    // El objeto de lo que quires modificar
    // Un objeto de opciones que hay que deja vacio en este caso
    // DEVUELVE EL OBJETO ANTES DEL CAMBIO
    Author.findByIdAndUpdate(id, author, {new: true})
        .then((updatedAuthor) => {

            if  (!updatedAuthor)
            {
                return res.status(404).send('Author not found');
            }

            return res.status(200).send({updatedAuthor});
        })
        .catch ((err) => {
            return next(err);
        });
};