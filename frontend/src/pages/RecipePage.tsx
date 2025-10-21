import { useParams } from "react-router-dom"

export default function RecipePage() {
  const { name } = useParams();

  return (
    <h1>Recipe for {name}</h1>
  )
}