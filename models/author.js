// Primero traemos a mongoose
const mongoose = require('mongoose');

// Creamos una variable para crear un schema
const Schema = mongoose.Schema;

// Hacemos el Esquema del autor
const AuthorSchema = new Schema(
    {
        first_name: {type: String, required: true, max: 100},
        family_name: {type: String, required: true, max: 100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date},
    },
    {
        toObject: {virtuals: true},
        toJSON: {virtuals: true},
    });

// Virtual for author's full name
AuthorSchema
    .virtual('name') // Campo que no existe en base datos pero lo podemos utilizar
    // Tiene las funciones get: sirve para definir lo que quieres hacer cuando se quiere recuperar el valor
    // Set: sirve para ponerle informacion a la variable
    .get(function () {
        return this.family_name + ', ' + this.first_name;
    });

// Virtual for author's URL
AuthorSchema
    .virtual('url')
    .get(function () {
        return '/catalog/author/' + this._id;
    });

// Exportamos este modelo
//Export model
module.exports = mongoose.model('Author', AuthorSchema);