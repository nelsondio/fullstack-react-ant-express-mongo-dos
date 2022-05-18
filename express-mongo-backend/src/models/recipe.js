import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Name cannot be blank!'
    },
    instructions: {
        type: String,
        required: 'Instructions cannot be blank!'
    },
    ingredients: {
        type: [String],
        default: []
    },
    img: {
        type: String,
        required: 'Image cannot be blank!'
    },
}, {
    toObject: { virtuals: true }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
//export default Recipe; // _models.default.recipe.find() is not a function