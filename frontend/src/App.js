import data from './data.json';

import React, { Component } from "react";
import ReactDOM from "react-dom";

import Header from "./components/Header";
import Products from "./components/Products";
import ModalCurrencyScore from "./components/ModalCurrencyScore";

class App extends Component {
  constructor(){
    super()
    this.state = {
      products: [],
      cart: [],
      totalItems: 0,
      totalAmount: 0,
      term: "",
      category: "",
      cartBounce: false,
      quantity: 1,
      modalResult: false,
      currecyList: {},
      valute: ''
    }

    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.sumTotalItems = this.sumTotalItems.bind(this);
    this.sumTotalAmount = this.sumTotalAmount.bind(this);
    this.checkProduct = this.checkProduct.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.openModalResult = this.openModalResult.bind(this);
    this.closeModalResult = this.closeModalResult.bind(this);
  }

  handleAddToCart(selectedProducts) {
    let cartItem = this.state.cart;
    let productID = selectedProducts.id;
    let productQty = selectedProducts.quantity;
    if (this.checkProduct(productID)) {
      let index = cartItem.findIndex(x => x.id == productID);
      cartItem[index].quantity =
        Number(cartItem[index].quantity) + Number(productQty);
      this.setState({
        cart: cartItem
      });
    } else {
      cartItem.push(selectedProducts);
    }
    this.setState({
      cart: cartItem,
      cartBounce: true
    });
    setTimeout(
      function() {
        this.setState({
          cartBounce: false,
          quantity: 1
        });
      }.bind(this),
      1000
    );
    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
  }

  handleRemoveProduct(id, e) {
    let cart = this.state.cart;
    let index = cart.findIndex(x => x.id == id);
    cart.splice(index, 1);
    this.setState({
      cart: cart
    });
    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
    e.preventDefault();
  }

  checkProduct(productID) {
    let cart = this.state.cart;
    return cart.some(function(item) {
      return item.id === productID;
    });
  }

  handleSearch(event) {
    this.setState({ term: event.target.value });
  }

  sumTotalItems() {
    let total = 0;
    let cart = this.state.cart;
    total = cart.length;
    this.setState({
      totalItems: total
    });
  }
  sumTotalAmount() {
    let total = 0;
    let cart = this.state.cart;
    for (var i = 0; i < cart.length; i++) {
      total += cart[i].price * parseInt(cart[i].quantity);
    }
    this.setState({
      totalAmount: total
    });
  }

  updateQuantity(qty) {
    this.setState({
      quantity: qty
    });
  }

  getProducts(){
    this.setState({
      products: data
    })
  }

  componentWillMount(){
    this.getProducts()
  }

  handleCategory(event) {
    this.setState({ category: event.target.value });
    console.log(this.state.category);
  }

  openModalResult(obj, valute){
    this.setState({
      modalResult: true,
      currecyList: obj,
      valute: valute
    })
  }

  closeModalResult(){
    this.setState({
      modalResult: false
    })
  }

  render(){
    return(
      <div className="container">
        <Header
          cartBounce={this.state.cartBounce}
          total={this.state.totalAmount}
          totalItems={this.state.totalItems}
          cartItems={this.state.cart}
          removeProduct={this.handleRemoveProduct}
          handleSearch={this.handleSearch}
          handleCategory={this.handleCategory}
          categoryTerm={this.state.category}
          updateQuantity={this.updateQuantity}
          productQuantity={this.state.moq}
          openModalResult={this.openModalResult}
          closeModalResult={this.closeModalResult}
        />

        <Products
          productsList={this.state.products}
          searchTerm={this.state.term}
          addToCart={this.handleAddToCart}
          productQuantity={this.state.quantity}
          updateQuantity={this.updateQuantity}
         />

        {this.state.modalResult ?
          <ModalCurrencyScore closeModalResult={this.closeModalResult} currecyList={this.state.currecyList} valute={this.state.valute}/> :
          null
        }

      </div>
    )
  }

}

export default App