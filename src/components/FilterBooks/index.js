import './index.css'

const FilterBooks = props => {
  const {filterBooks, onChangeName} = props
  const {label, value} = filterBooks

  const changeCategory = () => {
    onChangeName(value)
  }

  return (
    <div>
      <p onClick={changeCategory} className="category-label-headings">
        {label}
      </p>
    </div>
  )
}
export default FilterBooks
