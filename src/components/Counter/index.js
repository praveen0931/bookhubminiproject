import {Component} from 'react'

import './index.css'

class Counter extends Component {
  state = {quantity: 0}

  onDecrement = () => {
    const {quantity} = this.state
    if (quantity > 0) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  onIncrement = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  render() {
    const {quantity} = this.state
    return (
      <div className="counter-container">
        <button type="button" onClick={this.onDecrement}>
          -
        </button>
        <div>{quantity}</div>
        <button type="button" onClick={this.onIncrement}>
          +
        </button>
      </div>
    )
  }
}

export default Counter
