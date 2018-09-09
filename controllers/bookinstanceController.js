const BookInstance = require('../models/bookinstance');

// Display list of all BookInstances.
exports.bookinstanceListGet = (req, res) => {

BookInstance.find()
    .populate('book')
    .exec((err, list_bookinstances) => {
        if (err) { return next(err); }

        res.status(200).send({bookinstance_list: list_bookinstances})

        // Successful, so render
        // res.render('bookinstance_list', { title: 'Book Instance List', bookinstance_list: list_bookinstances });
    });
};



// Display detail page for a specific BookInstance.
exports.bookinstanceDetailGet = (req, res) => {

    let id = req.params.id;

    return Promise.all([
        // Lanza todos en paralelos
        // Devuelve el numero de libros de la base de datos, los metodos de mongoose

        BookInstance.findOne({_id: id})

    ]).then((results) => {

        // Devuelve un objeto que tiene los valores de el array result

        let bookInstace = results[0];

        if(!bookInstace)
        {
            return res.status(404).send('Book not found');
        }

        return res.status(200).send({
            bookInstace, // bookInstace : bookInstace
        })


    }).catch((err) => {
        return next(err);
    });

};

// Display BookInstance create form on GET.
exports.bookinstanceCreatePost = (req, res) => {

    let data = req.body;

    let bookInstace = new BookInstance(data);

    bookInstace.save((err, savedBookInstance) => {
        if (err)
        {
            return next(err);
        }
        res.status(200).send({savedBookInstance})
    });

};



// Display BookInstance delete form on GET.
exports.bookinstanceDeleteDelete = (req, res) => {

    let id = req.params.id;

    return Promise.all([

        BookInstance.findOne({_id: id})

    ]).then((results) => {

        let bookInstance = results[0];

        if(!bookInstance)
        {
            return res.status(404).send('Book Instance not found');
        }

        return BookInstance.findByIdAndRemove(id).then( () => {
            return res.status(200).send('Book Instance deleted')
        })


    }).catch((err) => {
        return next(err);
    });

};



// Display BookInstance update form on GET.
exports.bookinstanceUpdatePut = (req, res) => {
    let id = req.params.id;

    let data = req.body;
    data._id = id;

    let bookInstance = new BookInstance(data);


    // El id de lo que quieres encontrar
    // El objeto de lo que quires modificar
    // Un objeto de opciones que hay que deja vacio en este caso
    // DEVUELVE EL OBJETO ANTES DEL CAMBIO
    BookInstance.findByIdAndUpdate(id, bookInstance, {new: true})
        .then((updatedBookInstance) => {

            if  (!updatedBookInstance)
            {
                return res.status(404).send('BookInstance not found');
            }

            return res.status(200).send({updatedBookInstance});
        })
        .catch ((err) => {
            return next(err);
        });
};

