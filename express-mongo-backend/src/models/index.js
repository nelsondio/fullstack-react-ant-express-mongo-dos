import mongoose from 'mongoose';
//import Recipe from './recipe.js';

mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/ant-recipes');

mongoose.Promise = Promise;

// module.exports = Recipe;

module.exports.Recipe = require("./recipe");

//export default Recipe; // not working PENDING 