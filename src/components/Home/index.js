import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import Posters from '../Posters'
import Originals from '../Originals'
import TrendingMovies from '../TrendingMovies'
import Footer from '../Footer'
import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 700,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },

    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
  ],
}

class Home extends Component {
  state = {
    isLoading: true,
    MoviesData: [],
    TopRated: [],
    originals: [],
    originalsRandom: [],
  }

  componentDidMount() {
    this.getTrending()
    this.getTopRated()
    this.getOriginals()
    this.renderOriginalRandomMovies()
  }

  setTrending = (trendingData, isLoading) => {
    this.setState({
      MoviesData: trendingData,
      isLoading,
    })
  }

  getTrending = async () => {
    const response = await fetch(
      'https://api.themoviedb.org/3/trending/all/week?api_key=43cdec2ae13aa18beee5c974eb579a54',
    )
    const data = await response.json()
    const trendingData = data.results.map(each => ({
      id: each.id,
      posterPath: each.poster_path,
      backdropPath: each.backdrop_path,
      name: each.original_title,
      overView: each.overview,
    }))

    this.setTrending(trendingData, false)
  }

  renderTrendingList = () => {
    const {MoviesData} = this.state

    return (
      <Slider {...settings}>
        {MoviesData.map(each => (
          <Posters posterData={each} key={each.id} />
        ))}
      </Slider>
    )
  }

  setTopRated = (topRatedData, isLoading) => {
    this.setState({
      TopRated: topRatedData,
      isLoading,
    })
  }

  getTopRated = async () => {
    const response = await fetch(
      'https://api.themoviedb.org/3/movie/top_rated?api_key=43cdec2ae13aa18beee5c974eb579a54&language=en-US',
    )
    const data = await response.json()
    const topRatedData = data.results.map(each => ({
      id: each.id,
      overview: each.overview,
      name: each.original_name,
      backdropPath: each.backdrop_path,
      posterPath: each.poster_path,
    }))

    this.setTopRated(topRatedData, false)
  }

  renderTopRatedList = () => {
    const {TopRated} = this.state
    return (
      <Slider {...settings}>
        {TopRated.map(each => (
          <TrendingMovies backdropData={each} key={each.id} />
        ))}
      </Slider>
    )
  }

  setOriginal = (requestedData, isLoading) => {
    this.setState({
      originals: requestedData,
      isLoading,
    })
  }

  getOriginals = async () => {
    const response = await fetch(
      'https://api.themoviedb.org/3/discover/tv?api_key=43cdec2ae13aa18beee5c974eb579a54',
    )
    const data = await response.json()
    const OriginalData = data.results
    const requestedData = OriginalData.map(each => ({
      id: each.id,
      overview: each.overview,
      name: each.original_name,
      backdropPath: each.backdrop_path,
      posterPath: each.poster_path,
    }))

    this.setOriginal(requestedData, false)
  }

  renderOriginalsList = () => {
    const {originals} = this.state
    return (
      <Slider {...settings}>
        {originals.map(each => (
          <Originals originalData={each} key={each.id} />
        ))}
      </Slider>
    )
  }

  renderLoader = () => (
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="red" height="50" />
    </div>
  )

  renderOriginalRandomMovies = async () => {
    const RandomNumber = Math.floor(Math.random() * 200)
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/all/week?api_key=43cdec2ae13aa18beee5c974eb579a54&page=${RandomNumber}`,
    )
    const data = await response.json()
    const result = data.results.map(each => ({
      id: each.id,
      overview: each.overview,
      name: each.name || each.title,
      backdropPath: each.backdrop_path,
      posterPath: each.poster_path,
    }))

    const random = Math.floor(Math.random() * result.length)

    this.setState({originalsRandom: result[random]})
  }

  overview = () => {
    const {originalsRandom} = this.state
    if (originalsRandom.overview !== undefined) {
      return `${originalsRandom.overview.slice(0, 120)}...`
    }
    return ''
  }

  MoviesData = () => {
    const {originalsRandom} = this.state
    return (
      <>
        <div className="container-home">
          <h1 className="title-home-random">{originalsRandom.name}</h1>
          <p className="overview-home-random">{this.overview()}</p>
          <button type="button" className="play-button-home">
            Play
          </button>{' '}
        </div>
        <div className="home-page">
          <div style={{width: '85vw'}}>
            <p className="heading2">Trending Movies</p>
            {this.renderTrendingList()}
            <p className="heading3">Top Rated</p>
            {this.renderTopRatedList()}
            <p className="heading4">Originals</p>
            {this.renderOriginalsList()}
          </div>
          <Footer />
        </div>
      </>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    const {isLoading} = this.state
    const {originalsRandom} = this.state
    return (
      <>
        <Navbar homePage={`${true}`} />
        <div className="bg-container-1">
          {isLoading ? (
            this.renderLoader()
          ) : (
            <>
              <div
                className="bg_image-poster-container"
                style={{
                  backgroundImage: `url(${`https://image.tmdb.org/t/p/original/${originalsRandom.posterPath}`})`,
                  backgroundSize: 'cover',
                  color: '#f5f5f5',
                }}
              >
                {' '}
              </div>
              <div
                className="bg_image-backdrop-container"
                style={{
                  backgroundImage: `url(${`https://image.tmdb.org/t/p/original/${originalsRandom.backdropPath}`})`,
                  backgroundSize: 'cover',
                  color: '#f5f5f5',
                }}
              >
                {' '}
              </div>
              <div className="linear">{this.MoviesData()}</div>
            </>
          )}
        </div>
      </>
    )
  }
}
export default Home
