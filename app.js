const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');


// Ficheros nuestros que representan los dos ruters que estan en la aplicacion
// La aplicacion utilizara tres routers estos dos y el default
// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');

const index = require('./routes/index');
const users = require('./routes/users');
const catalog = require('./routes/catalog');  //Import routes for "catalog" area of site



// Creamos la Aplicacion a las cosas
const app = express();


// Estos no importa

// Esto permite ver html en el navegador
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');


// EMPEZAMOS A ESCRIBIR EL MIDDLEWARE

// Este es morgan y pinta la apliacion en el terminal, el parametro dev es de modo desarrollo
// Ejemplo: GET /users/cool 200 0.822 ms - 15
app.use(logger('dev'));
app.use(cors());

// Detecta como nos envia el cliente la informacion: puede ser de estilo JSON o Por la URL (urlencoded).
// Esos datos llegan req body{ }
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Si llegan cokies, te trocea la cookie y te la da mucho mas ordenada
app.use(cookieParser());

// Informacion estatica
app.use(express.static(path.join(__dirname, 'public')));


// FIN DE MIDDLEWARE



// DAMOS DE ALTA A LA URL
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.use('/', index);
app.use('/users', users);
app.use('/catalog', catalog);  // Add catalog routes to middleware chain.



// PLANES Y, Z




// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});



// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
    console.log('error: ' + err.toString())
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;






// Ahora Creamos la parte de la Base de Datos
//Set up mongoose connection

// Primero Anadimos a mongoose
const mongoose = require('mongoose');

// Le asignamos una variable a nuestra base de datos
const mongoDB = 'mongodb://localhost/local_library';

// Hacemos la conexion con nuestra base de datos
mongoose.connect(mongoDB);

// Preguntar
// Mongoose
// mongoose.Promise = global.Promise;


// Esta es la variable que muestra nuestra conecion con mongodb
const db = mongoose.connection;
// mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// On: cada vez que se meta en mongoDB
db.on('open', console.error.bind(console, 'Conected MongoDB connection'));
// Once: solo lo muestra una vez
db.once('open', console.error.bind(console, 'Conected MongoDB connection'));

