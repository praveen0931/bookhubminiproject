import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import Footer from '../Footer'
import Navbar from '../Navbar'
import TopRatedBooksCardHome from '../TopRatedBooksCardHome'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  isLoading: 'LOADING',
}

class HomeRoute extends Component {
  state = {apiStatus: apiStatusConstants.initial, topRatedBooks: []}

  componentDidMount() {
    this.getHomeBooksDetails()
  }

  getHomeBooksDetails = async () => {
    // const {apiStatus} = this.state
    this.setState({apiStatus: apiStatusConstants.isLoading})
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updateFetchedData = fetchedData.books.map(eachBookDetails => ({
        authorName: eachBookDetails.author_name,
        coverPic: eachBookDetails.cover_pic,
        id: eachBookDetails.id,
        title: eachBookDetails.title,
      }))
      console.log(updateFetchedData)
      this.setState({
        topRatedBooks: updateFetchedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  successFatchedData = () => {
    const {topRatedBooks} = this.state
    const settings = {
      dots: false,
      slidesToShow: 3,
      slidesToScroll: 1,
    }
    return (
      <ul className="list-container">
        <Slider {...settings} className="slider">
          {topRatedBooks.map(eachCard => (
            <TopRatedBooksCardHome
              homeTopRatedBooks={eachCard}
              key={eachCard.id}
            />
          ))}
        </Slider>
      </ul>
    )
  }

  onClickTryAgain = () => {
    this.getHomeBooksDetails()
    console.log('hello')
  }

  failureFatchedData = () => (
    <div className="failure-data-container">
      <img
        src="https://res.cloudinary.com/drhuebylf/image/upload/v1675565138/Group_7522_txreee.png"
        alt="failure view"
      />
      <p className="failure-description">
        Something went wrong, Please try again.
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

  loadingFetchedData = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderingFetchedData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successFatchedData()
      case apiStatusConstants.failure:
        return this.failureFatchedData()
      case apiStatusConstants.isLoading:
        return this.loadingFetchedData()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="home-bg-container">
          <Navbar />
          <h1 className="books-heading">Find Your Next Favorite Books?</h1>
          <p className="description">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you <br />
            surprisingly insightful recommendations.
          </p>
          <div className="home-card-top-rated-books">
            <div className="top-rated-nav-container">
              <h1 className="top-rated-heading">Top Rated Books</h1>
              <button type="button" className="find-books-button">
                Find Books
              </button>
            </div>
            <div>{this.renderingFetchedData()}</div>
          </div>
          <div className="contact-us-container">
            <Footer />
          </div>
        </div>
      </>
    )
  }
}
export default HomeRoute
