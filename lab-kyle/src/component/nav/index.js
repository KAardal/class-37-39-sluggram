import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as util from '../../lib/util.js'
import { profileFetchRequest } from '../../action/profile-actions.js'
import { tokenSet, logout } from '../../action/auth-actions.js'

class Nav extends React.Component {
  constructor(props) {
    super(props)

    this.handleLogout = this.handleLogout.bind(this)
    this.validateRoute = this.validateRoute.bind(this)
  }

  componentDidMount() {
    this.validateRoute(this.props)
  }

  handleLogout() {
    this.props.logout()
    this.props.history.push('/welcom/login')
  }

  validateRoute(props) {
    let { match, history } = props
    let token = util.readCookie('X-Sluggram-Token')

    if (!token) {
      return history.replace('/welcome/signup')
    }

    this.props.tokenSet(token)
    this.props.profileFetch().catch(() => {
      console.log('PROFILE FETCH ERROR: user does not have a userProfile')
      if (!match.url.startsWith('/settings')) {
        return history.replace('/settings')
      }
    })
  }

  render() {
    return (
      <div className="nav">
        <nav>
          <ul>
            <li><Link to="/welcome/signup"> signup </Link> </li>
            <li><Link to="/welcome/login"> login </Link> </li>
            <li><Link to="/dashboard"> dashboard </Link> </li>
            <li><Link to="/settings"> settings </Link> </li>
            <li><button onClick={this.handleLogout}>logout</button></li>
          </ul>
        </nav>
      </div>
    )
  }
}

let mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
})
let mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  tokenSet: token => dispatch(tokenSet(token)),
  profileFetch: () => dispatch(profileFetchRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
