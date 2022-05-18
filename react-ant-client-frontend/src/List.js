import Recipe from './Recipe.js';

function List(props) {

    //try <Recipe key={recipe.id} {...recipe} /> //spread operator instead of 
    // passing one-by-one property
    //In return statement you wrap Recipe JSX component with div class 'recipe-list'
    const recipesJSX = props.recipes.map((recipe, index) => (
      <Recipe key={recipe._id} 
        // {...recipe}
        title={recipe.title} img={recipe.img}
        instructions={recipe.instructions} _id={recipe._id}
        ingredients={recipe.ingredients} 
        onDelete={props.onDelete}
        />
    ));
  
    return (
      <div className="recipe-list">
        {recipesJSX}
      </div>
    );
  }
  export default List;