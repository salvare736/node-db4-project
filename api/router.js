const express = require('express');
const Helpers = require('./model');
const {
    checkRecipeId
} = require('./middleware');

const router = express.Router();

// get all recipes
router.get('/recipes', (req, res, next) => {

});

// get recipe by id
router.get('/recipes/:recipe_id', (req, res, next) => {

});

// catch-all error handler
router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        message: err.message,
        stack: err.stack
    });
});

module.exports = router;
