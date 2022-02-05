const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });
const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize
  .sync({ force: false })
  .then(() =>
    // eslint-disable-next-line no-console
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))
  )
  .catch((error) => {
    throw new Error(error.message);
  });
