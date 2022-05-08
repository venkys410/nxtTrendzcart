// Write your code here

import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let cartTotal = 0
      cartList.forEach(eachItem => {
        cartTotal += eachItem.price * eachItem.quantity
      })
      return (
        <div className="cart-summary-container">
          <div className="summary-card">
            <h1 className="cart-total">
              Order Total:{' '}
              <span className="cart-total-value">Rs {cartTotal}/-</span>{' '}
            </h1>
            <p className="item-count">{cartList.length} Items in cart</p>
            <button type="button" className="checkout">
              Checkout
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
