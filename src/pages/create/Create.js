import { useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {projectFirestore} from "../../firebase/config";

// styles
import './Create.css'

export default function Create() {
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [newIngredient, setNewIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])
  const ingredientInput = useRef(null)

  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const doc = ({ title, ingredients, method, cookingTime: cookingTime + ' minutes' })

    try {
     await projectFirestore.collection('recipes').add(doc)
      history.push('/')
    }catch (err) {
      console.log(err)
    }
  }

  const handleAdd = (e) => {
    e.preventDefault()

    //trim take away any whitespace from the ingredients
    const ing = newIngredient.trim()
    //check if there value in ing && check if the ing is already in the array
    if (ing && !ingredients.includes(ing)) {
      //to set the Ingredients , we take the previousIngredients and add the newIngredient
      setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }
    setNewIngredient('')
    ingredientInput.current.focus()
  }

  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            type="text"
            // onchange e fire when the value is changed (every single letter) and we store it on setTitle state
            onChange={(e) => setTitle(e.target.value)}
            //setting up 2 way binding if the state change outside automatic reflect inside the input field
            value={title}
            required
          />
        </label>

        <label>
          <span>Recipe Ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button onClick={handleAdd} className="btn">add</button>
          </div>
        </label>
        <p>Current ingredients: {ingredients.map(i => <em key={i}>{i}, </em>)}</p>

        <label>
          <span>Recipe Method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>Cooking time (minutes):</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>

        <button className="btn">submit</button>
      </form>
    </div>
  )
}
