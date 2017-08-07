import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Link } from 'react-router-dom'

import * as util from '../../lib/util.js'

import Nav from '../nav'
import LandingContainer from '../landing-container'
import SettingsContainer from '../settings-container'
import DashboardContainer from '../dashboard-container'
import { tokenSet } from '../../action/auth-actions.js'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let token = util.readCookie('X-Sluggram-Token')
    if (token) this.props.tokenSet(token)
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <div>
            <header>
              <h1>INSTA!</h1>
            </header>
            <Route path="*" component={Nav} />
            <Route exact path="/welcome/:auth" component={LandingContainer} />
            <Route exact path="/dashboard" component={DashboardContainer} />
            <Route exact path="/settings" component={SettingsContainer} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

let mapStateToProps = state => ({ profile: state.profile })
let mapDispatchToProps = dispatch => ({
  tokenSet: token => dispatch(tokenSet(token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
