import {Link} from 'react-router-dom'
import './index.css'

const TrendingMovies = props => {
  const {backdropData} = props

  const {id, backdropPath} = backdropData

  return (
    <Link to={`/movie/${id}`} className="item-link">
      <img
        src={`https://image.tmdb.org/t/p/original${backdropPath}`}
        className="image-backdrop"
        alt="img"
        key={id}
      />
    </Link>
  )
}
export default TrendingMovies
