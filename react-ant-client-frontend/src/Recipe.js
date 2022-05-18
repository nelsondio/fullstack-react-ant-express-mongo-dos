import React from 'react';
import './App.css'

function Recipe(props) {

    const { title, img, instructions } = props; // destructuring the props 
    // wrapping each ingredient with li HTML elements and returning them
    // with an implicit return inside an arrow function.
    // note that the unique key is the index, which is not optimal
    const ingredientsJSX = props.ingredients.map((ing, index) => (
      <li key={index}>{ing}</li>
    ));
    return (
      <div className="recipe-card">
        <div className="recipe-card-img">
          <img src={img} alt={title} />
        </div>
        <div className="recipe-card-content">
          <h3 className="recipe-title">{title}</h3>
          <h4>Ingredients:</h4>
          <ul>
            {ingredientsJSX}
          </ul>
          <h4>Instructions:</h4>
          <p>{instructions}</p>
          {/* <button type="button" onClick={() => alert(`Are you sure to DELETE recipe number ${_id}?`)}>DELETE</button> */}
          <button type="button" onClick={() => props.onDelete(props._id)}>DELETE</button>
        </div>
      </div>
    );  
  }
  export default Recipe;