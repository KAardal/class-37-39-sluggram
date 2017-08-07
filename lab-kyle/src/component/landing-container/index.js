import React from 'react'
import { connect } from 'react-redux'
import AuthForm from '../auth-form'
import * as util from '../../lib/util.js'
import { signupRequest, loginRequest } from '../../action/auth-actions.js'

class LandingContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { params } = this.props.match
    let handleComplete = params.auth === 'login'
      ? this.props.login
      : this.props.signup

    return (
      <div className="landing-container">
        <AuthForm auth={params.auth} onComplete={handleComplete} />
      </div>
    )
  }
}

let mapStateToProps = () => ({})
let mapDispatchToProps = dispatch => {
  return {
    signup: user => dispatch(signupRequest(user)),
    login: user => dispatch(loginRequest(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer)
