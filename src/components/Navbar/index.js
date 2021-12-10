import {Component} from 'react'
import {Link} from 'react-router-dom'
import Nav from '../Nav'
import './index.css'

class Navbar extends Component {
  constructor() {
    super()
    this.state = {
      searchShow: false,
      clickNav: false,
    }
  }

  onclickSearch = () => {
    this.setState({searchShow: true})
  }

  onClickNavItems = () => {
    this.setState(prev => ({clickNav: !prev.clickNav}))
  }

  onchangeInput = event => {
    this.setState({
      getString: localStorage.setItem('string', event.target.value),
    })
  }

  renderNavbar = () => {
    const {searchShow} = this.state
    const {sendSearchApi} = this.props
    const {homePage} = this.props

    const Home = homePage ? 'font1' : ''
    const Popular = homePage ? '' : 'font1'
    return (
      <>
        <div className="navbar-nav"> </div>
        <Link to="/">
          <div>
            <svg
              className="M-navbar"
              viewBox="0 0 35 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.0897 0.567508H34.5272C34.5272 16.851 34.515 33.1239 34.4906 49.3864C31.3513 49.5649 29.8235 49.6646 26.7156 49.8693L26.7417 14.494C24.8268 26.4135 22.9257 38.3348 21.0386 50.2578C17.9307 50.4782 16.382 50.599 13.2741 50.8457C11.2126 39.0592 9.17552 27.2569 7.16287 15.4389C7.16287 27.4074 7.16287 39.3794 7.16287 51.3549C4.29563 51.6016 2.86724 51.7276 0 52.0005V0.557007H11.4376C13.4363 12.3855 15.4489 24.2105 17.4755 36.0321C19.3242 24.214 21.1956 12.3925 23.0897 0.567508Z"
                fill="#E50014"
              />
            </svg>
            <svg
              viewBox="0 0 19 37"
              fill="none"
              className="o-navbar"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.52475 2.37792C4.13366 0.803139 6.45151 0.0157471 9.47835 0.0157471C12.5078 0.0157471 14.823 0.803139 16.4319 2.37792C18.0408 3.95271 18.8375 6.14165 18.8375 8.99201V27.5272C18.8375 30.3776 18.0317 32.602 16.4202 34.2004C14.8087 35.7988 12.4895 36.6544 9.46264 36.7673C6.43319 36.8775 4.11402 36.1925 2.50904 34.6767C0.90406 33.161 0.0996058 30.9445 0.10353 28.043C0.10353 21.7438 0.10353 15.4447 0.10353 9.14556C0.108762 6.22958 0.915848 3.9737 2.52475 2.37792ZM9.45871 31.6059C11.5895 31.539 12.6569 30.3343 12.6569 27.98V8.64556C12.6569 6.28339 11.5921 5.11148 9.46264 5.12985C7.33313 5.14823 6.2671 6.3385 6.26449 8.70068V28.1611C6.25141 30.5285 7.31612 31.6768 9.45871 31.6059Z"
                fill="#E50014"
              />
            </svg>
            <svg
              viewBox="0 0 22 36"
              fill="none"
              className="v-navbar"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.0235 0.405914H21.7017C19.6873 12.2168 17.6703 24.0355 15.6507 35.8622C11.9698 35.8622 10.1294 35.8622 6.44853 35.8819C4.4289 24.071 2.41186 12.247 0.397461 0.409855H6.62117L11.3302 29.3268C12.8946 19.6865 14.4591 10.0462 16.0235 0.405914Z"
                fill="#E50014"
              />
            </svg>
            <svg
              viewBox="0 0 7 37"
              fill="none"
              className="i-navbar"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.95594 0.409897C6.95594 12.3231 6.95594 24.2351 6.95594 36.1457C4.48765 36.0748 3.2515 36.0473 0.783203 35.9961C0.783203 24.1353 0.783203 12.2733 0.783203 0.409897H6.95594Z"
                fill="#E50014"
                top="1"
              />
            </svg>
            <svg
              viewBox="0 0 18 38"
              fill="none"
              className="e-navbar"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.3272 15.8665C15.3272 17.961 15.3272 19.0161 15.3272 21.0987C11.9406 20.9885 10.2493 20.9373 6.86272 20.8507C6.86272 25.0908 6.86272 27.2128 6.86272 31.4529C11.1244 31.6222 13.2552 31.7207 17.5129 31.9451V37.197C11.9092 36.8741 6.30288 36.5985 0.693952 36.3702C0.693952 24.3808 0.684817 12.3954 0.666504 0.41394H17.4854C17.4854 2.51628 17.4854 3.56351 17.4854 5.66979C13.2277 5.63042 11.0969 5.61073 6.83527 5.57923V15.6697C10.2493 15.7445 11.9406 15.7799 15.3272 15.8665Z"
                fill="#E50014"
              />
            </svg>
            <svg
              viewBox="0 0 14 27"
              fill="none"
              className="s-navbar"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.20892 1.67896C3.34257 0.564198 5.01688 0 7.23474 0C9.45261 0 11.124 0.569647 12.2576 1.72802C13.3913 2.8864 13.961 4.55173 13.961 6.71312V7.55261L9.64443 7.45176V6.36152C9.64443 5.45663 9.44968 4.79703 9.06308 4.37729C8.84574 4.16119 8.58073 3.99216 8.28653 3.882C7.99233 3.77184 7.67603 3.72321 7.35972 3.73951C7.04645 3.71538 6.73138 3.75637 6.43694 3.85955C6.14251 3.96273 5.87597 4.12555 5.65635 4.33641C5.26878 4.7398 5.075 5.38667 5.075 6.27703C5.05712 7.31315 5.40001 8.32649 6.05167 9.16343C6.92906 10.2117 7.90905 11.1808 8.97881 12.058C9.90257 12.8421 10.7761 13.6767 11.5949 14.5574C12.2972 15.3425 12.8703 16.2217 13.2954 17.1658C13.7797 18.2528 14.0192 19.422 13.9988 20.6C13.9988 22.7614 13.4175 24.3804 12.2547 25.4379C11.092 26.4954 9.4061 26.9234 7.19695 26.7544C4.98781 26.5854 3.29605 25.904 2.13335 24.7129C0.970637 23.5218 0.389282 21.8946 0.389282 19.8068V18.2369C2.1159 18.316 2.97921 18.3568 4.70583 18.4413V20.2975C4.70583 21.9791 5.49648 22.8677 7.07195 22.9713C8.64742 23.0748 9.43515 22.279 9.43515 20.5727C9.45189 19.5182 9.10978 18.4862 8.45848 17.6264C7.59371 16.5564 6.61379 15.5728 5.53425 14.6909C4.61829 13.9155 3.74513 13.0968 2.91816 12.2379C2.22005 11.4895 1.64585 10.647 1.2148 9.73853C0.730666 8.70878 0.489732 7.59305 0.50847 6.46782C0.500718 4.38366 1.06753 2.78737 2.20892 1.67896Z"
                fill="#E50014"
              />
            </svg>
          </div>
        </Link>
        <Link to="/">
          <p className={`${Home} Home-navbar`}>Home</p>
        </Link>
        <Link to="/popular/page">
          <p className={`${Popular} popular-nav`}>Popular</p>
        </Link>
        {searchShow ? (
          <>
            <input
              type="search"
              className="searchBar"
              onChange={this.onchangeInput}
            />
            <Link to={`/home/search/${localStorage.getItem('string')}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="white"
                onClick={localStorage.getItem('sendSearchApi')}
                className="search-1"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </Link>
          </>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="white"
            className="search"
            onClick={this.onclickSearch}
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        )}
        <div className="avatar-image-container">
          <Link to="/account">
            <img
              src="https://i.ibb.co/1RYHf2B/Avatar.png"
              alt="Avatar"
              border="0"
              className="img-avatar"
            />
          </Link>
        </div>
        <nav className="navbar-for-small" onClick={this.onClickNavItems}>
          <div className="nav-small">
            <svg
              width="30"
              height="12"
              viewBox="0 0 19 1"
              fill="none"
              className="nav-one"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.75 1.75H0.875C0.4625 1.75 0.125 1.4125 0.125 1C0.125 0.5875 0.4625 0.25 0.875 0.25H17.75C18.1625 0.25 18.5 0.5875 18.5 1C18.5 1.4125 18.1625 1.75 17.75 1.75Z"
                fill="white"
              />
            </svg>
            <svg
              width="30"
              height="10"
              viewBox="0 0 19 2"
              fill="none"
              className="nav-two"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.75 1.75H0.875C0.4625 1.75 0.125 1.4125 0.125 1C0.125 0.5875 0.4625 0.25 0.875 0.25H17.75C18.1625 0.25 18.5 0.5875 18.5 1C18.5 1.4125 18.1625 1.75 17.75 1.75Z"
                fill="white"
              />
            </svg>
            <div className="nav-last-line">
              <svg
                width="25"
                height="15"
                viewBox="0 0 19 3"
                fill="none"
                onClick={sendSearchApi}
                className="nav-three"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.375 1.75H0.875C0.4625 1.75 0.125 1.4125 0.125 1C0.125 0.5875 0.4625 0.25 0.875 0.25H8.375C8.7875 0.25 9.125 0.5875 9.125 1C9.125 1.4125 8.7875 1.75 8.375 1.75Z"
                  fill="white"
                />
              </svg>
            </div>
            <svg
              width="25"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              className="arrow-down"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.71247 9.4624C8.59997 9.4624 8.44997 9.4249 8.33747 9.3874L1.24997 5.52491C0.987465 5.37491 0.837465 5.14991 0.874965 4.84991C0.874965 4.58741 1.02497 4.32491 1.28747 4.17491L8.37497 0.612418C8.59997 0.499918 8.89997 0.499919 9.12497 0.649918C9.34997 0.799918 9.49997 1.02492 9.49997 1.28742V8.71241C9.49997 8.97491 9.34997 9.2374 9.12497 9.3499C8.97497 9.4249 8.86247 9.4624 8.71247 9.4624ZM3.23746 4.88741L7.96247 7.43741V2.48741L3.23746 4.88741Z"
                fill="white"
              />
            </svg>
          </div>
        </nav>
      </>
    )
  }

  render() {
    const {clickNav} = this.state
    const {homePage} = this.props
    return (
      <>
        {this.renderNavbar()}
        {clickNav ? <Nav homeNav={homePage} /> : ''}
      </>
    )
  }
}

export default Navbar
