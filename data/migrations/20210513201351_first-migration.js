exports.up = async function(knex) {
    await knex.schema
        .createTable('recipes', tbl => {
            tbl.increments('recipe_id')
            tbl.string('recipe_name').notNullable()
            tbl.timestamp('created_at').defaultTo(knex.fn.now())
        })
        .createTable('steps', tbl => {
            tbl.increments('step_id')
            tbl.integer('step_number').notNullable()
            tbl.string('step_instructions').notNullable()
            tbl.integer('recipe_id')
                .unsigned()
                .references('recipe_id')
                .inTable('recipes')
                .onDelete('SET NULL')
        })
        .createTable('ingredients', tbl => {
            tbl.increments('ingredient_id')
            tbl.string('ingredient_name').notNullable().unique()
        })
        .createTable('step_ingredients', tbl => {
            tbl.increments('step_ingredient_id')
            tbl.decimal('quantity').notNullable()
            tbl.integer('step_id')
                .unsigned()
                .references('step_id')
                .inTable('steps')
                .onDelete('RESTRICT')
            tbl.integer('ingredient_id')
                .unsigned()
                .references('ingredient_id')
                .inTable('ingredients')
                .onDelete('RESTRICT')
        })
};

exports.down = async function(knex) {
    await knex.schema
        .dropTableIfExists('step_ingredients')
        .dropTableIfExists('ingredients')
        .dropTableIfExists('steps')
        .dropTableIfExists('recipes')
};
