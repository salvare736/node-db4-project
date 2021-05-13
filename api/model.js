const db = require('../data/db-config.');

// I used this function just as a sanity check for myself
function getRecipes() {
    return db.select('*').from('recipes');
}

async function getRecipeById(recipe_id) {
    const searchedRecipe = await db('recipes').where('recipe_id', recipe_id).first();
    return searchedRecipe;
}

module.exports = {
    getRecipes,
    getRecipeById
}
