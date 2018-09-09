// Primero Traemos a mongoose para definir el modelo
const mongoose = require('mongoose');

// Asinamos a una variable schema para poder trabajar sobre ella
const Schema = mongoose.Schema;

// Creamos el esquema
const BookSchema = new Schema(
    {
        title: {type: String, required: true},
        // ref: referencia a autor, ajuro tendra un autor
        //
        author: {type: Schema.ObjectId, ref: 'Author', required: true},
        summary: {type: String, required: true},
        isbn: {type: String, required: true},
        genre: [{type: Schema.ObjectId, ref: 'Genre'}]
    }
);

// Virtual for book's URL
BookSchema
    .virtual('url')
    .get(function () {
        return '/catalog/book/' + this._id;
    });

// Exportamos este esquema
//Export model
module.exports = mongoose.model('Book', BookSchema);