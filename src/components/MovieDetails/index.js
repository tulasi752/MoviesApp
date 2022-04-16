import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import SimilarMovieData from '../SimilarMovieData'
import Navbar from '../Navbar'
import NotFound from '../NotFound'
import './index.css'

class MovieDetails extends Component {
  state = {movieData: [], isLoading: true, dataFailure: false}

  componentDidMount() {
    this.getMovieDetails()
  }

  selectedMovie = (formattedData, isLoading) => {
    this.setState({
      movieData: formattedData,
      isLoading,
    })
  }

  getMovieDetails = async () => {
    const {match, history} = this.props
    const {params} = match
    const {id} = params
    this.getMovies = () => id
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=43cdec2ae13aa18beee5c974eb579a54&language=en-US`,
    )
    console.log(response.status)
    console.log('response.status')
    if (response.status === 404) {
      this.setState({isLoading: false})
      return history.replace('/NotFound')
    }
    const data = await response.json()
    console.log(response)
    console.log(data)
    console.log('data')
    const formattedData = {
      eachId: data.id,
      backdropPath: data.backdrop_path,
      posterPath: data.poster_path,
      name: data.original_name,
      genres: data.genres,
      RatingCount: data.vote_count,
      RatingAverage: data.vote_average,
      originalLanguage: data.original_language,
      AudioAvailable: data.spoken_languages,
      ReleaseDate: data.release_date,
      title: data.original_title,
      overview: data.overview,
      releaseDate: data.release_date,
      runtime: data.runtime,
      budget: data.budget,
    }
    return this.selectedMovie(formattedData, false)
  }

  genres = () => {
    const {movieData} = this.state
    const {genres} = movieData
    if (genres !== undefined) {
      const genreData = genres.map(each => (
        <li className="list">{each.name}</li>
      ))
      return genreData
    }
    return ''
  }

  AudioAvailable = () => {
    const {movieData} = this.state
    const {AudioAvailable} = movieData
    if (AudioAvailable !== undefined) {
      const languageData = AudioAvailable.map(each => (
        <li className="list2">{each.english_name}</li>
      ))

      return languageData
    }
    return ''
  }

  movieDetails = () => {
    const {movieData} = this.state
    const {RatingCount, RatingAverage, ReleaseDate, budget} = movieData

    return (
      <>
        <div>
          <p className="genre" id="font">
            Genres
            {this.genres()}
          </p>

          <p className="audio" id="font1">
            AudioAvailable
            {this.AudioAvailable()}
          </p>
        </div>
        <div>
          <p className="RatingCount">
            RatingCount <li className="RatingCountList">{RatingCount}</li>
          </p>

          <p className="RatingAverage">
            RatingAverage
            <li className="RatingAverageList">{RatingAverage}</li>
          </p>
        </div>
        <div>
          <p className="budget">
            Budget
            <li className="budgetAmount">{budget}</li>
          </p>
          <p className="ReleaseDate">
            ReleaseDate
            <li className="ReleaseDateList">{ReleaseDate}</li>
          </p>
        </div>
      </>
    )
  }

  renderLoader = () => (
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="red" height="50" />
    </div>
  )

  runtime = () => {
    const {movieData} = this.state
    const {runtime} = movieData
    const hours = Math.ceil(runtime / 60)
    const minutes = runtime % 60
    return <span className="span-runtime">{`${hours}hr ${minutes}m`}</span>
  }

  upper = () => {
    const {movieData} = this.state
    const {originalLanguage} = movieData
    if (originalLanguage !== undefined) {
      return (
        <span className="originalLanguage">
          {originalLanguage.toUpperCase()}
        </span>
      )
    }
    return ''
  }

  ReleaseDate = () => {
    const {movieData} = this.state
    const {ReleaseDate} = movieData
    if (ReleaseDate !== undefined) {
      return (
        <span className="Re-date">{ReleaseDate.toString().slice(0, 4)}</span>
      )
    }
    return ''
  }

  overview = () => {
    const {movieData} = this.state
    const {overview} = movieData
    if (overview !== undefined) {
      return `${overview.slice(0, 120)} ...`
    }
    return ''
  }

  renderMovieDetails = () => {
    const {movieData} = this.state
    const {title, productionCountries} = movieData
    return (
      <>
        <h1 className="title">{title}</h1>
        <p className="time">
          {this.runtime()}
          {this.upper()}
          {this.ReleaseDate()}
          {productionCountries}
        </p>
        <p className="overview">{this.overview()}</p>
        <button type="button" className="play-button">
          Play
        </button>
      </>
    )
  }

  render() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    localStorage.setItem('movieDetails', this.getMovieDetails)
    const {movieData, isLoading, dataFailure} = this.state
    const {backdropPath, posterPath} = movieData
    return (
      <>
        <Navbar />
        <>
          <div className="bg-container-2">
            {isLoading ? (
              this.renderLoader()
            ) : (
              <>
                <div
                  className="bg_image-posterPath-container"
                  style={{
                    backgroundImage: `url(${`https://image.tmdb.org/t/p/original/${backdropPath}`})`,
                    backgroundSize: 'cover',

                    color: '#f5f5f5',
                  }}
                >
                  <div className="left-linear-spe">
                    <div className="container-moviesDetails">
                      {this.renderMovieDetails()}
                    </div>
                    <div className="movieDetails">{this.movieDetails()}</div>
                    <div className="moviesDetails-similar-container">
                      <SimilarMovieData id={id} />
                    </div>
                  </div>
                </div>
                <div
                  className="bg_image-backdropPath-container"
                  style={{
                    backgroundImage: `url(${`https://image.tmdb.org/t/p/original/${posterPath}`})`,
                    backgroundSize: 'cover',
                    color: '#f5f5f5',
                  }}
                >
                  <div className="left-linear-spe">
                    {' '}
                    <div className="container-moviesDetails">
                      {this.renderMovieDetails()}
                    </div>
                    <div className="movieDetails">{this.movieDetails()}</div>
                    <div className="moviesDetails-similar-container">
                      <SimilarMovieData id={id} />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      </>
    )
  }
}
export default MovieDetails
