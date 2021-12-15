import { useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import {projectFirestore} from "../../firebase/config";
import {useTheme} from "../../hooks/useTheme";
import {useEffect, useState} from "react";
// styles
import './Recipe.css'


export default function Recipe() {
  const {mode} = useTheme()
  const { id } = useParams()

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(()=>{
    setIsPending(true)

 const unsub = projectFirestore.collection('recipes').doc(id).onSnapshot((doc)=>{
      if(doc.exists){
          setIsPending(false)
          setRecipe(doc.data())
      }else {
          setIsPending(false)
          setError('cloud not find this recipe')
      }
    })
      //if we navigate to another page this will clean up and then we wont listen to document changing
      return () => unsub()
  },[id])

    const handleClick = () =>{
      projectFirestore.collection('recipes').doc(id).update({
          title : 'something different'
      })
    }

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          {/*//בגלל שingredients זה מערך אני עושה לו MAP */}
          <ul>
            {recipe.ingredients.map(ing => <li key={ing}>ing</li>)}
          </ul>
          <p className="method">{recipe.method}</p>
            <button onClick={handleClick}>update Me</button>
        </>
      )}
    </div>
  )
}
