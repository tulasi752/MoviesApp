import {Component} from 'react'
import './index.css'

class Footer extends Component {
  render() {
    return (
      <div className="footer-container-1">
        <div className="footer">
          <img
            src="https://i.ibb.co/tmMpntg/google.png"
            alt="google"
            className="google"
          />

          <img
            src="https://i.ibb.co/3SN0mh6/youtube.png"
            alt="youtube"
            className="youtube"
          />
          <img
            src="https://i.ibb.co/hmSmdtc/twitter.png"
            alt="twitter"
            className="twitter"
          />
          <img
            src="https://i.ibb.co/7bKjN5m/instagram.png"
            alt="instagram"
            className="instagram"
          />
        </div>

        <p className="contact">Contact Us</p>
      </div>
    )
  }
}

export default Footer
