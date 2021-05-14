const db = require('../data/db-config.');

// I used this function just as a sanity check for myself
function getRecipes() {
    return db.select('*').from('recipes');
}

async function getRecipeById(recipe_id) {
    const recipeRows = await db('recipes as r')
        .leftJoin('steps as s', 'r.recipe_id', 's.recipe_id')
        .leftJoin('step_ingredients as si', 'si.step_id', 's.step_id')
        .leftJoin('ingredients as i', 'i.ingredient_id', 'si.ingredient_id')
        .select(
            'r.recipe_id',
            'r.recipe_name',
            's.step_id',
            's.step_number',
            's.step_instructions',
            'i.ingredient_id',
            'i.ingredient_name',
            'si.quantity'
        )
        .orderBy('s.step_number')
        .where('r.recipe_id', recipe_id)

//      recipeRows appears as follows
// [
//     {
//         "ingredient_id": null,
//         "ingredient_name": null,
//         "quantity": null,
//         "recipe_id": 1,
//         "recipe_name": "Spaghetti Bolognese",       
//         "step_id": 1,
//         "step_instructions": "Put a large saucepan on a medium heat",
//         "step_number": 1
//     },
//     {
//         "ingredient_id": 1,
//         "ingredient_name": "olive oil",
//         "quantity": 0.014,
//         "recipe_id": 1,
//         "recipe_name": "Spaghetti Bolognese",       
//         "step_id": 2,
//         "step_instructions": "Add 1 tbsp olive oil",
//         "step_number": 2
//     }
// ]

    const recipeResult = {
        recipe_id: recipeRows[0].recipe_id,
        recipe_name: recipeRows[0].recipe_name,
        steps: recipeRows.reduce((acc, row) => {

            if (!row.ingredient_id) {
                return acc.concat({
                    step_id: row.step_id,
                    step_number: row.step_number,
                    step_instructions: row.step_instructions
                })
            }

            if (row.ingredient_id && !acc.find(step => step.step_id === row.step_id)) {
                return acc.concat({
                    step_id: row.step_id,
                    step_number: row.step_number,
                    step_instructions: row.step_instructions,
                    ingredients: [
                        {
                            ingredient_id: row.ingredient_id,
                            ingredient_name: row.ingredient_name,
                            quantity: row.quantity
                        }
                    ]
                })
            }

            const currentStep = acc.find(step => step.step_id === row.step_id)
            currentStep.ingredients.push({
                ingredient_id: row.ingredient_id,
                ingredient_name: row.ingredient_name,
                quantity: row.quantity                
            })

            return acc

        }, [])
    }

    return recipeResult

//      recipeResult appears as follows
// {
//     "recipe_id": 1,
//     "recipe_name": "Spaghetti Bolognese",
//     "steps": [
//         {
//             "step_id": 1,
//             "step_instructions": "Put a large saucepan on a medium heat",
//             "step_number": 1
//         },
//         {
//             "ingredients": [
//                 {
//                     "ingredient_id": 1,
//                     "ingredient_name": "olive oil",        
//                     "quantity": 0.014
//                 }
//             ],
//             "step_id": 2,
//             "step_instructions": "Add 1 tbsp olive oil",   
//             "step_number": 2
//         }
//     ]
// }
}

module.exports = {
    getRecipes,
    getRecipeById
}
