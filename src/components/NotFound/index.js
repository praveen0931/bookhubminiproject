import {Link, withRouter} from 'react-router-dom'
import './index.css'

const NotFound = props => {
  const clickOnGoBackToHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-bg-container">
      <img
        src="https://res.cloudinary.com/drhuebylf/image/upload/v1675686379/Group_7484_lj44f6.png"
        alt="not found"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-description">
        we are sorry, the page you requested could not be found, Please go back
        to the homepage.
      </p>
      <Link to="/" className="link-button">
        <button
          type="button"
          className="back-to-home-button"
          onClick={clickOnGoBackToHome}
        >
          Go Back to Home
        </button>
      </Link>
    </div>
  )
}
export default withRouter(NotFound)
