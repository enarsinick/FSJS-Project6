const express = require('express');
const { render } = require('pug');
const app = express();

// Setting the view engine to use pug and letting express know the static folder
app.set('view engine', 'pug');
app.use('/static', express.static('public'));

const mainRoutes = require('./routes');
app.use(mainRoutes);

// Error handling middlware
app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status || 500);
    if (err.status === 404) {
        res.render('page-not-found');
    } else {
        res.render('error')
    }
});

// Start the server
app.listen(3000, () => {
    console.log('The application is running on localhost:3000');
});