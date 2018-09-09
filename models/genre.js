// Primero traemos a mongoose
const mongoose = require('mongoose');

// Creamos un Variable esquema para poder trabajar sobre ella
const Schema = mongoose.Schema;

// Creamos el esquema
const GenreSchema = new Schema(
    {
        name: {type: String, required: true, min: 3, max: 100},
    }
);

// Virtual for Genre URL
GenreSchema
    .virtual('url')
    .get(function () {
        return '/catalog/genre/' + this._id;
    });


// Exportamos este modelo
//Export model
module.exports = mongoose.model('Genre', GenreSchema);