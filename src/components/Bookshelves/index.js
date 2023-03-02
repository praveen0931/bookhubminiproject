import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsFillStarFill, BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import Footer from '../Footer'
import FilterBooks from '../FilterBooks'
import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  isLoading: 'LOADING',
}

class Bookshelves extends Component {
  state = {
    activeCategory: 'ALL',
    searchInput: '',
    filterDataBooks: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getBookshelvesDetails()
  }

  getBookshelvesDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.isLoading})
    const {activeCategory, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${activeCategory}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok === true) {
      const fetched = await response.json()
      //  console.log(fetched)
      const updatedFetchedData = fetched.books.map(eachFetchedData => ({
        authorName: eachFetchedData.author_name,
        coverPic: eachFetchedData.cover_pic,
        id: eachFetchedData.id,
        rating: eachFetchedData.rating,
        readStatus: eachFetchedData.read_status,
        title: eachFetchedData.title,
      }))
      // console.log(updatedFetchedData)
      this.setState({
        filterDataBooks: updatedFetchedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeName = activeCategory => {
    this.setState({activeCategory}, this.getBookshelvesDetails)
  }

  searchData = event => {
    this.setState({searchInput: event.target.value}, this.getBookshelvesDetails)
  }

  successFilteredBooks = () => {
    const {filterDataBooks, searchInput} = this.state
    console.log(filterDataBooks.length)
    return filterDataBooks.length > 0 ? (
      filterDataBooks.map(eachFilteredBooks => (
        <li key={eachFilteredBooks.id} className="filtered-list-container">
          <Link to={`/books/${eachFilteredBooks.id}`} className="link-books">
            <img
              src={eachFilteredBooks.coverPic}
              alt={eachFilteredBooks.title}
              className="cover-pic-image"
            />
            <div className="filter-content-details-container">
              <h1 className="filter-books-title">{eachFilteredBooks.title}</h1>
              <p className="filter-books-author-name">
                {eachFilteredBooks.authorName}
              </p>

              <p className="filter-books-rating">
                Avg Rating <BsFillStarFill className="star" />
                {eachFilteredBooks.rating}
              </p>
              <p className="filter-books-status">
                Status:
                <span className="span-element">
                  {eachFilteredBooks.readStatus}
                </span>
              </p>
            </div>
          </Link>
        </li>
      ))
    ) : (
      <div className="failure-container">
        <img
          src="https://res.cloudinary.com/drhuebylf/image/upload/v1675616375/Group_au4yma.png"
          alt="no books"
        />
        <p className="failure-description">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    )
  }

  onClickTryAgainBookshelvesData = () => {
    this.setState({apiStatus: apiStatusConstants.isLoading})
    this.getBookshelvesDetails()
  }

  failureFilterResults = () => (
    <div className="failure-filter-data-container">
      <img
        src="https://res.cloudinary.com/drhuebylf/image/upload/v1675565138/Group_7522_txreee.png"
        alt="failure view"
      />
      <p className="failure-description">
        Something went wrong, Please try again.
      </p>
      <button
        type="button"
        onClick={this.onClickTryAgainBookshelvesData}
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
        return this.successFilteredBooks()
      case apiStatusConstants.failure:
        return this.failureFilterResults()
      case apiStatusConstants.isLoading:
        return this.loadingFetchedData()
      default:
        return null
    }
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getBookshelvesDetails()
    }
  }

  render() {
    const {activeCategory, searchInput} = this.state
    return (
      <div>
        <Navbar />
        <div className="bg-container">
          <ul className="book-shelves-container">
            <h1 className="bookshelves-heading">Bookshelves</h1>
            {bookshelvesList.map(eachFilterBooks => (
              <FilterBooks
                filterBooks={eachFilterBooks}
                key={eachFilterBooks.id}
                isActive={activeCategory}
                onChangeName={this.onChangeName}
              />
            ))}
          </ul>
          <div className="filter-data-bg-container">
            <div className="filter-search-container">
              <h1 className="filtered-category-heading">
                {activeCategory} Books
              </h1>
              <div className="input-search-container" testid="searchButton">
                <input
                  type="search"
                  placeholder="Search"
                  onChange={this.searchData}
                  onKeyDown={this.onEnterSearchInput}
                  value={searchInput}
                  className="input-search-element"
                />
                <BsSearch className="search-icon" value={searchInput} />
              </div>
            </div>
            <div className="book-shelves-feteched-container">
              {this.renderingFetchedData()}
            </div>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    )
  }
}
export default Bookshelves
