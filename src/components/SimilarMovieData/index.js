import {Component} from 'react'
import Loader from 'react-loader-spinner'
import SimilarMovieImage from '../SimilarMovieImage'
import './index.css'

class SimilarMovieData extends Component {
  state = {Movies: [], isLoading: false}

  componentDidMount() {
    this.GetSimilarMovies()
  }

  setSimilarData = (requestedData, isLoading) => {
    this.setState({
      Movies: requestedData,
      isLoading,
    })
  }

  GetSimilarMovies = async () => {
    const {id} = this.props
    const Random = Math.floor(Math.random() * 20)
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${global.API_KEY}&language=en-US&page=${Random}`,
    )
    const data = await response.json()
    const Result = data.results
    if (Result !== undefined) {
      const ResultData = data.results.slice(0, 6)
      const requestedData = ResultData.map(each => ({
        id: each.id,
        posterPath: each.poster_path,
      }))
      this.setSimilarData(requestedData, false)
    }
    return ''
  }

  onClickMovie = () => {
    this.GetSimilarMovies()
  }

  SimilarMovie = () => {
    const {movieId} = this.props
    const {Movies} = this.state
    return (
      <>
        <p className="moreMovies-heading">More Movies</p>
        <div>
          {Movies.map(each => (
            <SimilarMovieImage
              originalData={each}
              key={each.id}
              onClickMovie={this.onClickMovie}
              movieId={movieId}
            />
          ))}
        </div>
      </>
    )
  }

  renderLoader = () => (
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="#ad0725" height="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return <> {isLoading ? this.renderLoader() : this.SimilarMovie()}</>
  }
}
export default SimilarMovieData
