import {Link} from 'react-router-dom'
import './index.css'

const TopRatedMovies = props => {
  const {posterData} = props
  const {id, posterPath} = posterData
  return (
    <Link to={`/movie/${id}`}>
      <img
        src={`https://image.tmdb.org/t/p/original${posterPath}`}
        className="image-poster"
        alt="img"
        key={id}
      />
    </Link>
  )
}
export default TopRatedMovies
