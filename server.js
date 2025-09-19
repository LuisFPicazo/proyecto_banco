const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const routes = require('./src/routes');
app.use('/', routes);


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});