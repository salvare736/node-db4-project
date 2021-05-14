const Helpers = require('./model');

async function checkRecipeId(req, res, next) {
    try {
        const recipeWithId = await Helpers.getRecipeById(req.params.recipe_id);
        if (!recipeWithId) {
            next({ status: 404, message: `Recipe with ${req.params.recipe_id} not found!` })
        } else {
            req.existingRecipe = recipeWithId;
            next();
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    checkRecipeId
}
