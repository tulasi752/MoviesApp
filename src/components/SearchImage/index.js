import {Link} from 'react-router-dom'
import './index.css'

const SearchImage = props => {
  const {each} = props
  const {id, posterPath} = each
  return (
    <Link to={`/movie/${id}`}>
      <img
        src={`https://image.tmdb.org/t/p/original${posterPath}`}
        className="image-popular-search"
        alt="img-originals-home"
        key={id}
      />
    </Link>
  )
}
export default SearchImage
