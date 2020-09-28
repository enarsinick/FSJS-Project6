const express = require('express');
const router = express.Router();
const { projects } = require('../data/data.json');

// Route for home
router.get('/', (req, res) => {
    res.render('index', {projects});
});

// Route for about
router.get('/about', (req, res) => {
    res.render('about');
});

// Route for projects
router.get('/projects/:id', (req, res) => {
    const { id } = req.params;

    // If the ID in the URL is great than the amount
    // of projects we have, then redirect to the error page
    if (id >= projects.length) {
        return res.redirect('/error');
    }

    const project = projects[id];
    res.render('project', project);
});

module.exports = router;