import { useFetch } from '../../hooks/useFetch'
import { useLocation } from 'react-router-dom'
import RecipeList from '../../components/RecipeList'

// styles
import './Search.css'

export default function Search() {
  //example of queryString  : ?q=pizza (when user search for pizza)
  const queryString = useLocation().search
  //URLSearchParams create new URL search params obj based on the queryString that we passed
  const queryParams = new URLSearchParams(queryString)
  //guess which value of the query parameter המילה שאנחנו מחפשים
  const query = queryParams.get('q')

  const url = 'http://localhost:3000/recipes?q=' + query
  const { error, isPending, data } = useFetch(url)

  return (
    <div>
      <h2 className="page-title">Recipes including "{query}"</h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}
