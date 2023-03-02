import './index.css'

const TopRatedBooksCardHome = props => {
  const {homeTopRatedBooks} = props
  const {authorName, title, coverPic} = homeTopRatedBooks
  return (
    <li className="top-rated-books-list-container">
      <img src={coverPic} alt={title} className="cover-pic-image" />
      <h1 className="title-heading">{title}</h1>
      <p className="author-name" value={authorName}>
        {authorName}
      </p>
    </li>
  )
}
export default TopRatedBooksCardHome
