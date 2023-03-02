import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'
import Navbar from '../Navbar'
import Footer from '../Footer'
import Counter from '../Counter'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  isLoading: 'LOADING',
}

class BookDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    eachBookDetails: {},
  }

  componentDidMount() {
    this.getEachBookDetails()
  }

  getEachBookDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.isLoading})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)

    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        aboutAuthor: data.book_details.about_author,
        aboutBook: data.book_details.about_book,
        authorName: data.book_details.author_name,
        coverPic: data.book_details.cover_pic,
        id: data.book_details.id,
        rating: data.book_details.rating,
        readStatus: data.book_details.read_status,
        title: data.book_details.title,
      }
      console.log(updatedData)
      this.setState({
        eachBookDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  successEachBook = () => {
    const {eachBookDetails} = this.state
    const {
      aboutAuthor,
      aboutBook,
      authorName,
      coverPic,
      id,
      rating,
      readStatus,
      title,
    } = eachBookDetails
    return (
      <li key={id} className="list-container">
        <div className="cover-pic-container">
          <img src={coverPic} alt={title} className="cover-pic" />
          <div>
            <h1 className="book-title">{title}</h1>
            <p className="book-author">{authorName}</p>
            <p className="book-avg-rating">
              Avg Rating <BsFillStarFill className="rating-star" />
              {rating}
            </p>
            <p className="book-status">
              Status: <span className="span-element-status">{readStatus}</span>
            </p>
            <Counter />
          </div>
        </div>
        <hr />
        <h1 className="book-author-name">About Author</h1>
        <p className="about-author">{aboutAuthor}</p>
        <h1 className="book-title-name">About Book</h1>
        <p className="about-book">{aboutBook}</p>
      </li>
    )
  }

  onClickTryAgain = () => {
    this.getEachBookDetails()
  }

  failureBookDetails = () => (
    <div className="failure-data-container">
      <img
        src="https://res.cloudinary.com/drhuebylf/image/upload/v1675565138/Group_7522_txreee.png"
        alt="failure view"
      />
      <p className="failure-description">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        onClick={this.onClickTryAgain}
        className="try-again-button"
      >
        Try Again
      </button>
    </div>
  )

  loadingBookDetails = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderingBookDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successEachBook()
      case apiStatusConstants.failure:
        return this.failureBookDetails()
      case apiStatusConstants.isLoading:
        return this.loadingBookDetails()
      default:
        return null
    }
  }

  render() {
    // const {eachBookDetails} = this.state
    return (
      <div>
        <Navbar />
        <div className="book-details-card-container">
          {this.renderingBookDetails()}
        </div>
        <div className="footer-container-card">
          <Footer />
        </div>
      </div>
    )
  }
}
export default BookDetails
