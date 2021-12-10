import {Link} from 'react-router-dom'

import './index.css'

const SimilarMovieImage = props => {
  const {originalData} = props
  const {posterPath, id} = originalData

  return (
    <Link to={`/movie/${id}`}>
      <img
        src={`https://image.tmdb.org/t/p/original${posterPath}`}
        className="image-sim"
        alt="img"
        key={id}
        onClick={localStorage.getItem('movieDetails')}
      />
    </Link>
  )
}

export default SimilarMovieImage
