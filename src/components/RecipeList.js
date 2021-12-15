import { Link } from 'react-router-dom'
import {useTheme} from "../hooks/useTheme";
import trashcan from '../assets/trashcan.svg'

// styles
import './RecipeList.css'
import {projectFirestore} from "../firebase/config";

export default function RecipeList({ recipes }) {
const {mode} = useTheme()

  if (recipes.length === 0) {
    return <div className="error">No recipes to load...</div>
  }

const handleClick = (id) =>{
    projectFirestore.collection('recipes').doc(id).delete()
}
  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          {/*//substring לוקח רק את 100 המילים הראשונות של אותו מתכון מתוך כל המילים שיש לו*/}
          <div>{recipe.method.substring(0, 100)}...</div>
         {/*//הלינק שולח אתנו לURL החדש עם הID*/}
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
          <img src={trashcan}
          className={'delete'}
          onClick={()=>handleClick(recipe.id)}/>
        </div>
      ))}
    </div>
  )
}
