// Primero traemos a mongoose
const mongoose = require('mongoose');

// Creamos un Variable esquema para poder trabajar sobre ella
const Schema = mongoose.Schema;

const moment = require('moment');

// Creamos el esquema
const BookInstanceSchema = new Schema(
    {
        book: { type: Schema.ObjectId, ref: 'Book', required: true }, //reference to the associated book
        imprint: {type: String, required: true},
        status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
        due_back: {type: Date, default: Date.now}
    },
    {
        toObject: {virtuals: true},
        toJSON: {virtuals: true},
    });


BookInstanceSchema
    .virtual('due_back_formatted')
    .get(function () {
        return moment(this.due_back).format('MMMM Do, YYYY');
    });

BookInstanceSchema
    .virtual('due_back_yyyy_mm_dd')
    .get(function () {
        return moment(this.due_back).format('YYYY-MM-DD');
    });


// Virtual for bookinstance's URL
BookInstanceSchema
    .virtual('url')
    .get(function () {
        return '/catalog/bookinstance/' + this._id;
    });


// Exportamos este modelo
//Export model
module.exports = mongoose.model('BookInstance', BookInstanceSchema);