import {Link} from 'react-router-dom'
import './index.css'

const PopularImage = props => {
  const {PopularData} = props
  const {id, backdropPath} = PopularData

  return (
    <Link to={`/movie/${id}`}>
      <img
        src={`https://image.tmdb.org/t/p/original${backdropPath}`}
        className="image-popular"
        alt="img"
        key={id}
      />
    </Link>
  )
}
export default PopularImage
