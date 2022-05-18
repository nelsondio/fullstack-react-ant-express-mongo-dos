import React, { useState } from "react";
import './App.css';

function Form(props) {
  const [state, setState] = useState({
    title: '',
    instructions: "",
    ingredients: [''],
    img: ''
  });
  
  const {title, instructions, img, ingredients} = state;
  
  const {onClose, onSave} = props;

  const handleChange = (e) => {
    setState(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value}));
  }
  
  const handleNewIngredient = (e) => {
    const {ingredients} = state;
    setState(prevState => ({
      ...prevState,
      ingredients: [...ingredients, '']}));
  }
  
  const handleChangeIng = (e) => {
    const index = Number(e.target.name.split('-')[1]);
    const ingredients = state.ingredients.map((ing, i) => (
      i === index ? e.target.value : ing
    ));
    setState(prevState => ({
      ...prevState,
      ingredients}));
  }
  
  const handleSubmit = (e) => {
    console.log("RecipeInput, handleSubmit ", state)
    e.preventDefault();
    onSave({...state});
    setState({
      title: '',
      instructions: '',
      ingredients: [''],
      img: ''
    })
  }
  
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
          onChange={handleChangeIng} />
      </label>
    </div>
  ));
  
  return (
    <div className="recipe-form-container">
      <form className='recipe-form' onSubmit={handleSubmit}>
        <button
          type="button"
          className="close-button"
          onClick={onClose}
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
            onChange={handleChange}/>
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
          onChange={handleChange}/>
        {inputs}
        <button
          type="button"
          onClick={handleNewIngredient}
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
            onChange={handleChange} />
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

export default Form;