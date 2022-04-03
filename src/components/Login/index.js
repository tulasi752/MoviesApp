import {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isError: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = (token, UserDetails) => {
    const {username, password} = UserDetails
    const {history} = this.props
    Cookies.set('jwt_token', token, {expires: 30})
    localStorage.setItem('user', username)
    localStorage.setItem('password', password)
    history.replace('/')
  }

  onFailureLogin = () => {
    this.setState({isError: true})
  }

  onsubmitForm = async event => {
    event.preventDefault()
    const API_KEY = '43cdec2ae13aa18beee5c974eb579a54'
    const url = `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const token = data.request_token
    this.requiredToken(token)
  }

  requiredToken = async token => {
    const {username, password} = this.state
    const UserDetails = {
      username,
      password,
      request_token: token,
    }
    const API_KEY = '43cdec2ae13aa18beee5c974eb579a54'
    const url = `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${API_KEY}`
    const options = {
      method: 'POST',
      body: JSON.stringify(UserDetails),
      headers: {
        'Content-type': 'application/json',
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (data.success === true) {
      this.onSubmitSuccess(token, UserDetails)
    } else {
      this.setState({isError: true})
    }
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-filed"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-filed"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  signUp = () =>
    alert(
      'You are re-directing to a website which provides data to this application. Do follow instruction to reset the password and login with same one!',
    )

  forgetPassword = () =>
    alert(
      'You are re-directing to a website which provides data to this application. Do follow instruction to signup with ur details and use them while login into this application',
    )

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {isError} = this.state
    return (
      <>
        <div>
          <Link to="/">
            <div>
              <svg
                width="26"
                height="39"
                viewBox="0 0 26 39"
                fill="none"
                className="M-navbar"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.3173 0.425631H25.8955C25.8955 12.6381 25.8864 24.8427 25.868 37.0394C23.5135 37.1732 22.3677 37.248 20.0367 37.4016L20.0564 10.8704C18.6201 19.8099 17.1944 28.7507 15.779 37.6929C13.4481 37.8582 12.2866 37.9488 9.95561 38.1338C8.40949 29.294 6.88167 20.4424 5.37217 11.579C5.37217 20.5553 5.37217 29.5342 5.37217 38.5157C3.22173 38.7008 2.15044 38.7952 0 39V0.417755H8.57823C10.0773 9.28904 11.5867 18.1577 13.1067 27.0237C14.4932 18.1603 15.8968 9.29429 17.3173 0.425631Z"
                  fill="#E50014"
                />
              </svg>
              <svg
                width="19"
                height="37"
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
                width="22"
                height="36"
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
                width="7"
                height="37"
                viewBox="0 0 7 37"
                fill="none"
                className="i-navbar"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.95594 0.409897C6.95594 12.3231 6.95594 24.2351 6.95594 36.1457C4.48765 36.0748 3.2515 36.0473 0.783203 35.9961C0.783203 24.1353 0.783203 12.2733 0.783203 0.409897H6.95594Z"
                  fill="#E50014"
                />
              </svg>
              <svg
                width="18"
                height="38"
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
                width="19"
                height="39"
                viewBox="0 0 19 39"
                fill="none"
                className="s-navbar"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.0825 2.42517C4.61292 0.814952 6.87325 0 9.86739 0C12.8615 0 15.1179 0.822823 16.6483 2.49603C18.1787 4.16924 18.9479 6.57472 18.9479 9.69673V10.9093L13.1205 10.7636V9.18886C13.1205 7.88179 12.8576 6.92905 12.3356 6.32276C12.0422 6.0106 11.6845 5.76645 11.2873 5.60733C10.8901 5.44822 10.4631 5.37798 10.0361 5.40151C9.61318 5.36666 9.18784 5.42587 8.79035 5.5749C8.39286 5.72394 8.03303 5.95913 7.73655 6.2637C7.21333 6.84637 6.95172 7.78074 6.95172 9.06682C6.92759 10.5634 7.39048 12.0272 8.27023 13.2361C9.45472 14.7502 10.7777 16.15 12.2219 17.4171C13.469 18.5497 14.6483 19.7552 15.7536 21.0273C16.7017 22.1614 17.4754 23.4314 18.0492 24.795C18.7032 26.3652 19.0265 28.054 18.9989 29.7555C18.9989 32.8776 18.2141 35.2161 16.6444 36.7437C15.0748 38.2712 12.7987 38.8893 9.81637 38.6452C6.83401 38.4011 4.55013 37.4169 2.98047 35.6964C1.41081 33.976 0.625977 31.6256 0.625977 28.6099V26.3422C2.95693 26.4564 4.12239 26.5154 6.45334 26.6375V29.3185C6.45334 31.7476 7.52072 33.0311 9.64761 33.1807C11.7745 33.3303 12.838 32.1807 12.838 29.7162C12.8605 28.193 12.3987 26.7023 11.5194 25.4603C10.352 23.9148 9.0291 22.494 7.57172 21.2202C6.33516 20.1002 5.15638 18.9175 4.03997 17.677C3.09752 16.5959 2.32235 15.3789 1.74042 14.0668C1.08685 12.5793 0.761584 10.9677 0.78688 9.34241C0.
              776416 6.33195 1.54162 4.0262 3.0825 2.42517Z"
                  fill="#E50014"
                />
              </svg>
            </div>
          </Link>
        </div>
        <div className="login-form-container">
          <form className="form-container" onSubmit={this.onsubmitForm}>
            <h1 className="heading-signIn-login">Sign In</h1>
            <div className="login-container">
              <div className="input-container">
                {this.renderUsernameField()}
              </div>
              <div className="input-container">
                {this.renderPasswordField()}
              </div>
              <button type="submit" className="signIn">
                Sign in
              </button>
              {isError ? (
                <p className="error-msg">
                  Please enter a valid Email & Password
                </p>
              ) : (
                ''
              )}
            </div>
            <div className="forget-password-container">
              <div className="signup-container">
                <p className="forget-password-label">Forget your password ?</p>
                <a
                  href="https://www.themoviedb.org/reset-password"
                  className="signup-label"
                  onClick={this.forgetPassword}
                  target="_self"
                >
                  Reset Password
                </a>
              </div>
              <div className="signup-container">
                <p className="forget-password-label">New To Movies ?</p>
                <a
                  href="https://www.themoviedb.org/signup"
                  className="signup-label"
                  target="_self"
                  onClick={this.signUp}
                >
                  Sign Up now !{' '}
                </a>
              </div>
            </div>
          </form>
        </div>
      </>
    )
  }
}

export default Login
