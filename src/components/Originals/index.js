import {Link} from 'react-router-dom'
import './index.css'

const Originals = props => {
  const {originalData} = props
  console.log('originalData')
  const {id, backdropPath} = originalData
  console.log(id)
  return (
    <Link to={`/movie/${id}`} className="item-link">
      <img
        src={`https://image.tmdb.org/t/p/original${backdropPath}`}
        className="image-originals"
        alt="img-originals"
        key={id}
      />
    </Link>
  )
}
export default Originals
