const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const hbs = exphbs.create({});
const app = express();
const PORT = process.env.PORT || 3001;
const sequelize = require('./config/connection');
const routes = require('./controllers/main');

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize
  .sync({ force: false })
  .then(() =>
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))
  )
  .catch((error) => {
    throw new Error(error.message);
  });
