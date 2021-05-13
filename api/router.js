const express = require('express');
const Helpers = require('./model');
const {
    checkRecipeId
} = require('./middleware');

const router = express.Router();

// get all recipes
router.get('/recipes', async (req, res, next) => {
    try {
        const recipes = await Helpers.getRecipes();
        res.json(recipes);
    } catch (err) {
        next(err);
    }
});

// get recipe by id
router.get('/recipes/:recipe_id', checkRecipeId, async (req, res, next) => {
    try {
        const recipe = await Helpers.getRecipeById(req.params.recipe_id);
        res.json(recipe);
    } catch (err) {
        next(err);
    }
});

// catch-all error handler
router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        message: err.message,
        stack: err.stack
    });
});

module.exports = router;
