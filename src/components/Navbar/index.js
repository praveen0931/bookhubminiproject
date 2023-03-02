import {Link, withRouter} from 'react-router-dom'
import './index.css'
import Cookies from 'js-cookie'

const Navbar = props => {
  const logoutUser = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <Link to="/" className="link">
        <img
          src="https://res.cloudinary.com/drhuebylf/image/upload/v1675512216/Group_7732_ihqsqv.png"
          alt="website logo"
          className="nav-logo"
        />
      </Link>
      <ul className="nav-headings-container">
        <li className="list-heading1">
          <Link to="/" className="link">
            Home
          </Link>
        </li>
        <li className="list-heading2">
          <Link to="/shelf" className="link">
            Bookshelves
          </Link>
        </li>
        <button type="button" className="log-out-button" onClick={logoutUser}>
          Logout
        </button>
      </ul>
    </nav>
  )
}
export default withRouter(Navbar)
