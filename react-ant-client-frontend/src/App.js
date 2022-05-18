import React, { useEffect, useState } from "react";
import * as apiCalls from './api';
import './App.css';
import Form from './Form';
import List from './List';

function App() {
  const [recipes, setReceipes] = useState([]);

  const loadRecipes = async () => {
    const recipes = await apiCalls.getRecipes();
    console.log("App loadRecipes: ", recipes);
    setReceipes(recipes);
  }

  const handleSave = async (recipe) => {
    console.log("App, handleSave : ", recipe)
    const newRecipe = await apiCalls.createRecipe(recipe);
    setReceipes([...recipes, newRecipe]);
  }

  const onDelete = async (_id) => {
    await apiCalls.removeRecipe(_id);
    const filteredRecipes = recipes.filter(r => r._id !== _id);
    setReceipes(filteredRecipes);
  }

  useEffect(() => {
    loadRecipes();
  }, []);

  let list;
  if(recipes.length > 0) {
    list =  <List  
              recipes={recipes}
              onDelete={onDelete} 
            />
  } else {
    list = `No recipes found in the database. Please use the form to add your own recipe!`;
  }

  return (
    <div className="App">
      <Form
        onSave={handleSave}
      />
      {list}
    </div>
  );
}

export default App;