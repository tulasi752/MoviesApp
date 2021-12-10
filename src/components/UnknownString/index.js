import {Component} from 'react'
import Navbar from '../Navbar'
import './index.css'

class UnknownString extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div className="container-unknown">
          <img
            src="https://i.ibb.co/qM856W5/Screenshot-61.png"
            className="data-notFound"
            alt="img"
          />
        </div>
      </>
    )
  }
}
export default UnknownString
