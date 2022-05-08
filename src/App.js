import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = product => {
    const {cartList} = this.state

    const productItem = cartList.find(eachItem => eachItem.id === product.id)

    console.log(productItem)

    if (productItem) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (eachItem.id === product.id) {
            const newQuantity = eachItem.quantity + product.quantity
            return {...eachItem, quantity: newQuantity}
          }
          return eachItem
        }),
      }))
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }

    // this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    //   TODO: Update the code here to implement addCartItem
  }

  removeCartItem = productId => {
    const {cartList} = this.state
    const filteredCartList = cartList.filter(
      eachItem => eachItem.id !== productId,
    )
    this.setState({cartList: filteredCartList})
  }

  incrementCartItemQuantity = itemId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (eachItem.id === itemId) {
          const newQuantity = eachItem.quantity + 1
          return {...eachItem, quantity: newQuantity}
        }
        return eachItem
      }),
    }))
  }

  decrementCartItemQuantity = itemId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (eachItem.id === itemId) {
          if (eachItem.quantity > 1) {
            const newQuantity = eachItem.quantity - 1
            return {...eachItem, quantity: newQuantity}
          }

          this.removeCartItem(itemId)
        }
        return eachItem
      }),
    }))
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
