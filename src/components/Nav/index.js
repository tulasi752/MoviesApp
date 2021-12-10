import {Component} from 'react'
import {Link} from 'react-router-dom'
import {RiCloseCircleLine} from 'react-icons/ri'
import './index.css'

class Nav extends Component {
  state = {close: false}

  closeNavItems = () => {
    this.setState(prev => ({close: !prev.close}))
  }

  render() {
    const {homeNav} = this.props
    const {close} = this.state
    const home = homeNav ? 'font2' : ''
    const popular = homeNav ? '' : 'font2'
    return (
      <>
        {close ? (
          ''
        ) : (
          <div className="nav-small-devices">
            <Link to="/">
              <p className={`${home} Home-Nav`}>Home</p>
            </Link>
            <Link to="/popular/page">
              <p className={`${popular} Popular-Nav`}>Popular</p>
            </Link>
            <Link to="/account">
              <p className="Account-Nav">Account</p>
            </Link>
            <RiCloseCircleLine
              className="closeIcon"
              onClick={this.closeNavItems}
            />
          </div>
        )}
      </>
    )
  }
}
export default Nav
