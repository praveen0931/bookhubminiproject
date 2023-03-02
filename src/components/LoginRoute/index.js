import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginRoute extends Component {
  state = {username: '', password: '', isVallid: false, errorMsg: ''}

  loginSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  loginFailure = errorMsg => {
    this.setState({isVallid: true, errorMsg})
  }

  enterUserName = event => {
    this.setState({username: event.target.value})
  }

  enterPassword = event => {
    this.setState({password: event.target.value})
  }

  submitLoginDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const apiUrl = 'https://apis.ccbp.in/login'
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    console.log(response)

    if (response.ok === true) {
      this.loginSuccess(data.jwt_token)
    } else {
      this.loginFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, isVallid, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <div className="login-container">
          <div className="login-banner-container">
            <img
              src="https://res.cloudinary.com/drhuebylf/image/upload/v1675509151/Ellipse_99_rb8aqd.png"
              className="ellipse-image"
              alt="login website logo"
            />
            <img
              src="https://res.cloudinary.com/drhuebylf/image/upload/v1675509328/Rectangle_1467_gymhzq.png"
              className="ellipse-image-large-screen"
              alt="login website logo"
            />

            <img
              src="https://res.cloudinary.com/drhuebylf/image/upload/v1675512216/Group_7732_ihqsqv.png"
              alt="website login"
              className="book-hub-image"
            />
          </div>

          <form className="form-container" onSubmit={this.submitLoginDetails}>
            <img
              src="https://res.cloudinary.com/drhuebylf/image/upload/v1675512216/Group_7732_ihqsqv.png"
              alt="website login"
              className="book-hub-large-image"
            />
            <label htmlFor="username" className="input-heading">
              Username*
            </label>
            <input
              type="text"
              id="username"
              className="input-element"
              onChange={this.enterUserName}
              value={username}
            />
            <label htmlFor="password" className="input-heading">
              Password*
            </label>
            <input
              type="password"
              id="password"
              className="input-element"
              onChange={this.enterPassword}
              value={password}
            />
            {isVallid && <p className="error-msg">{errorMsg}</p>}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}
export default LoginRoute
