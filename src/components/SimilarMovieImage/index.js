import {Link} from 'react-router-dom'

import './index.css'

const SimilarMovieImage = props => {
  const {originalData, movieId, onClickMovie} = props
  const {posterPath, id} = originalData
  const renderFunction1 = () => {
    movieId(id)
    onClickMovie()
  }

  return (
    <Link to={`/movie/${id}`}>
      <img
        src={`https://image.tmdb.org/t/p/original${posterPath}`}
        className="image-sim"
        alt="img"
        key={id}
        onClick={renderFunction1}
      />
    </Link>
  )
}

export default SimilarMovieImage
