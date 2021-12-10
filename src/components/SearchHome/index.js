import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import SearchImage from '../SearchImage'
import UnknownString from '../UnknownString'
import Footer from '../Footer'
import Navbar from '../Navbar'

import './index.css'

class SearchHome extends Component {
  state = {
    MovieData: [],
    isLoading: true,
    page: 1,
    totalPages: '',
  }

  componentDidMount() {
    this.GetSearchMovies()
  }

  GetSearchMovies = async () => {
    const {page} = this.state
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=43cdec2ae13aa18beee5c974eb579a54&language=en-US&page=${page}&query=${localStorage.getItem(
        'string',
      )}`,
    )
    const data = await response.json()
    const dataPages = data.total_pages
    const requiredData = data.results
    if (requiredData !== undefined) {
      const HomeMovieData = requiredData.map(each => ({
        id: each.id,
        page: each.page,
        name: each.original_title,
        posterPath: each.poster_path,
      }))
      this.setState({
        MovieData: HomeMovieData,
        isLoading: false,
        totalPages: dataPages,
      })
    }
    return <UnknownString />
  }

  renderLoader = () => (
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="#ad0725" height="50" />
    </div>
  )

  next = () => {
    const {page, totalPages} = this.state
    if (page < totalPages) {
      this.setState(
        prev => ({page: prev.page + 1, isLoading: true}),
        this.GetSearchMovies,
      )
      localStorage.setItem('sendSearchApi', this.GetSearchMovies)
    }
  }

  back = () => {
    const {page} = this.state
    if (page > 1) {
      this.setState(
        prev => ({page: prev.page - 1, isLoading: true}),
        this.GetSearchMovies,
      )
      localStorage.setItem('sendSearchApi', this.GetSearchMovies)
    }
  }

  render() {
    const {MovieData, page, isLoading} = this.state
    localStorage.setItem('sendSearchApi', this.GetSearchMovies)
    if (MovieData.length === 0) {
      return <UnknownString />
    }

    return (
      <>
        <div className="navbar-nav"> </div>
        <div className="home-search-container">
          <Navbar />
          {isLoading ? (
            this.renderLoader()
          ) : (
            <>
              <div className="body">
                <div className="searchImage-container">
                  <Link to="/search/home">
                    {MovieData.map(each => (
                      <SearchImage each={each} key={each.id} />
                    ))}
                  </Link>
                </div>
              </div>
            </>
          )}
          <div className="popular-footer">
            <div className="container-bottom">
              <div>
                <svg
                  width="34"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="right-box-popular"
                  onClick={this.back}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.5 4C0.5 2.067 2.067 0.5 4 0.5H23.5V23.5H4C2.067 23.5 0.5 21.933 0.5 20V4Z"
                    fill="#131313"
                    stroke="#D7DFE9"
                  />
                </svg>
                <svg
                  width="7"
                  height="12"
                  viewBox="0 0 7 12"
                  fill="none"
                  className="left-click-home-popular"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.87352 1.34331e-08L7 1.15074L2.25296 6L7 10.8493L5.87352 12L0.684789 6.69953C0.304253 6.3108 0.304254 5.68919 0.684789 5.30046L5.87352 1.34331e-08Z"
                    fill="white"
                  />
                </svg>
              </div>
              <p className="pages-home-popular">
                {page} to {MovieData.length}
              </p>
              <div>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  className="left-box-popular"
                  fill="none"
                  onClick={this.next}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.5 0.5H28C29.933 0.5 31.5 2.067 31.5 4V28C31.5 29.933 29.933 31.5 28 31.5H0.5V0.5Z"
                    fill="#131313"
                    stroke="#D7DFE9"
                  />
                </svg>
                <svg
                  width="7"
                  height="12"
                  viewBox="0 0 7 12"
                  fill="none"
                  className="right"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.12648 12L1.37224e-08 10.8493L4.74704 6L1.29376e-07 1.15074L1.12648 9.67107e-07L6.31521 5.30047C6.69575 5.6892 6.69575 6.31081 6.31521 6.69954L1.12648 12Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </>
    )
  }
}

export default SearchHome
