const Genre = require('../models/genre');
const Book = require('../models/book');

// Display list of all Genre.
exports.genreListGet = (req, res, next) => {

    Genre.find()
        .sort([['name','ascending']])
        .exec( (err, list_genre) => {
            if (err) { return next(err); }
            res.status(200).send({list_genre});
        });
};

// Display detail page for a specific Genre.
exports.genreDetailGet = (req, res, next) => {

    let id = req.params.id;

    return Promise.all([
        // Lanza todos en paralelos
        // Devuelve el numero de libros de la base de datos, los metodos de mongoose

        Genre.findOne({_id: id}),
        Book.find({genre: id})
            // .populate('genre')

    ]).then((results) => {

        // Devuelve un objeto que tiene los valores de el array result

        let genre = results[0];
        let genreBooks = results[1];

        if(!genre)
        {
            return res.status(404).send('Genre not Found');
        }

        return res.status(200).send({
            genre, // book : book
            genreBooks
        })


    }).catch((err) => {
        return next(err);
    });


};

// Display Genre create form on GET.
exports.genreCreatePost = (req, res, next) => {

    let data = req.body;

    let genre = new Genre(data);

    genre.save((err, savedGenre) => {
        if (err)
        {
            return next(err);
        }
        res.status(200).send({savedGenre})
    });
};

// Display Genre delete form on GET.
exports.genreDeleteDelete = (req, res, next) => {
    let id = req.params.id;

    return Promise.all([
        // Lanza todos en paralelos
        // Devuelve el numero de libros de la base de datos, los metodos de mongoose

        Genre.findOne({_id: id}),  // Devuelve objeto
        Book.find({genre: id}) //Devuelve array

    ]).then((results) => {

        // Devuelve un objeto que tiene los valores de el array result

        let genre = results[0];
        let books = results[1];

        console.log(genre);
        console.log(books.length);

        if(!genre)
        {
            return res.status(404).send('Genre not found')
        }

        if (books.lenght > 0) {
            return res.status(400).send('Some books have this genre in the Library')
        }

        return Genre.findByIdAndRemove(id).then( () => {
            return res.status(200).send('Genre Delete')
        });


    }).catch((err) => {
        return next(err);
    });
};

// Display Genre update form on GET.
exports.genreUpdatePut = (req, res, next) => {
    let id = req.params.id;

    let data = req.body;
    data._id = id;

    let genre = new Genre(data);


    // El id de lo que quieres encontrar
    // El objeto de lo que quires modificar
    // Un objeto de opciones que hay que deja vacio en este caso
    // DEVUELVE EL OBJETO ANTES DEL CAMBIO
    Genre.findByIdAndUpdate(id, genre, {new: true})
        .then((updatedGenre) => {

            if  (!updatedGenre)
            {
                return res.status(404).send('Genre not found');
            }

            return res.status(200).send({updatedGenre});
        })
        .catch ((err) => {
            return next(err);
        });
};

