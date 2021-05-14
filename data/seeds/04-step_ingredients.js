exports.seed = async function(knex) {
    await knex('step_ingredients').insert([
        {quantity: 0.014, step_id: 2, ingredient_id: 1}
    ]);
}
