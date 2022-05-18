import React, { Component } from 'react';
import * as apiCalls from './api';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
    }

    this.handleSave = this.handleSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    console.log("App this.props: ", this.props)
    this.loadRecipes();
  }

  async loadRecipes() {
    const recipes = await apiCalls.getRecipes();
    console.log("App loadRecipes: ", recipes);
    this.setState({ recipes });
  }

  async handleSave(recipe) {
    console.log("App, handleSave : ", recipe)
    const newRecipe = await apiCalls.createRecipe(recipe);
    this.setState({ recipes: [...this.state.recipes, newRecipe] });
  }
 
  async onDelete(id) {
    await apiCalls.removeRecipe(id);
    const recipes = this.state.recipes.filter(r => r.id !== id);
    this.setState({ recipes });
  }

  render() {

    return (
      <div className="App">
        <Form
          onSave={this.handleSave}
        />
        <List  recipes={this.state.recipes} onDelete={this.onDelete}/>
      </div>
    );
  }
}


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

class Form extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      instructions: "",
      ingredients: [''],
      img: ''
    };
    
    //this.handleChange = this.handleChange.bind(this);
    this.handleNewIngredient = this.handleNewIngredient.bind(this);
    this.handleChangeIng = this.handleChangeIng.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  // handleChange(e) {
  //   console.log(e.target.value);
  //   this.setState({[e.target.name]: e.target.value});
  // }

     // Pay ATTENTION: arrow functions DO NOT HAVE their own "this" : no need to bind
  handleChangeTitle= (e) => {
    console.log(e.target.value);
    this.setState({title: e.target.value})
  }
  handleChangeIns = (e) => {
    console.log(e.target.value);
    this.setState({instructions: e.target.value})
  }
  handleChangeImg = (e) => {
    console.log(e.target.value);
    this.setState({img: e.target.value})
  }
  
  handleNewIngredient(e) {
    const {ingredients} = this.state;
    this.setState({ingredients: [...ingredients, '']});
  }
  
  handleChangeIng(e) {
    const index = Number(e.target.name.split('-')[1]);
    const ingredients = this.state.ingredients.map((ing, i) => (
      i === index ? e.target.value : ing
    ));
    this.setState({ingredients});
  }

  handleReset = (e) => {
    e.preventDefault();
    alert(`Are you sure you want to reset?`)
}

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSave({...this.state});
    this.setState({
      title: '',
      instructions: '',
      ingredients: [''],
      img: ''
    })
  }
  
  render() {
    const {title, instructions, img, ingredients} = this.state;
    let inputs = ingredients.map((ing, i) => (
      <div
        className="recipe-form-line"
        key={`ingredient-${i}`}
      >
        <label>{i+1}.
          <input
            type="text"
            name={`ingredient-${i}`}
            value={ing}
            size={45}
            autoComplete="off"
            placeholder=" Ingredient"
            onChange={this.handleChangeIng} />
        </label>
      </div>
    ));
    
    return (
      <div className="recipe-form-container">
        <form className='recipe-form' onSubmit={this.handleSubmit}>
          <button
            type="button"
            className="close-button"
            onClick={this.handleReset}
          >
            X
          </button>
          <div className='recipe-form-line'>
            <label htmlFor='recipe-title-input'>Title</label>
            <input
              id='recipe-title-input'
              key='title'
              name='title'
              type='text'
              value={title}
              size={42}
              autoComplete="off"
              onChange={this.handleChangeTitle}/>
          </div>
          <label
            htmlFor='recipe-instructions-input'
            style={{marginTop: '5px'}}
          >
            Instructions
          </label>
          <textarea
            key='instructions'
            id='recipe-instructions-input'
            type='Instructions'
            name='instructions'
            rows='8'
            cols='50'
            autoComplete='off'
            value={instructions}
            onChange={this.handleChangeIns}/>
          {inputs}
          <button
            type="button"
            onClick={this.handleNewIngredient}
            className="buttons"
          >
            +
          </button>
          <div className='recipe-form-line'>
            <label htmlFor='recipe-img-input'>Image Url</label>
            <input
              id='recipe-img-input'
              type='text'
              placeholder=''
              name='img'
              value={img}
              size={36}
              autoComplete='off'
              onChange={this.handleChangeImg} />
          </div>
          <button
            type="submit"
            className="buttons"
            style={{alignSelf: 'flex-end', marginRight: 0}}
          >
            SAVE
          </button>
        </form>
      </div>
    )
  }
}
export default App;