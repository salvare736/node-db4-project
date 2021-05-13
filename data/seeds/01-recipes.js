exports.seed = async function(knex) {
    await knex('recipes').insert([
        {recipe_name: 'Spaghetti Bolognese'}
    ]);
}
