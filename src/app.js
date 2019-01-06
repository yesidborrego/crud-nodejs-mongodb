const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

// conecting to MongoDB
mongoose.connect('mongodb://localhost:27017/crud-mongo', {useNewUrlParser: true})
  .then( () => {
    console.log('La conexión a MongoDB se ha realizado satisfactoriamente!');
  }
  )
  .catch( err => console.log(err));

// importing routes
const routes = require('./routes/index'); // importing routes

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use(routes)

// Server listen
app.listen(app.get('port'), () => {
  console.log(`Server on localhost:${app.get('port')}`);
});