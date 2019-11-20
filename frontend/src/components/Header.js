import React, { Component } from "react";
import CartScrollBar from "./CartScrollBar";
import config from "../config.js";
import axios from 'axios';
import { findDOMNode } from "react-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCart: false,
      cart: this.props.cartItems,
      valute: 'EUR'
    };
    this.handleSendToServer = this.handleSendToServer.bind(this);
    this.selectChange = this.selectChange.bind(this);
  }
  handleCart(e) {
    e.preventDefault();
    this.setState({
      showCart: !this.state.showCart
    });
  }

  async axiosGetPrice(){
  try {
    return await axios.post(config.urlApi,{
      total: this.props.total,
      valute: this.state.valute
    })
  } catch (error) {
    console.error(error)
  }
}

async handleSendToServer() {
    this.setState({showCart: false})
    let objPrice = await this.axiosGetPrice();
    this.props.openModalResult(objPrice.data, this.state.valute);
  }

  handleClickOutside(event) {
    const cartNode = findDOMNode(this.refs.cartPreview);
    if (cartNode.classList.contains("active")) {
      if (!cartNode || !cartNode.contains(event.target)) {
        this.setState({
          showCart: false
        });
        event.stopPropagation();
      }
    }
  }

  componentDidMount() {
    document.addEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );

  }
  componentWillUnmount() {
    document.removeEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }

  selectChange(event) {
    this.setState({valute: event.target.value});
  }

  render() {
    let cartItems;
    cartItems = this.state.cart.map(product => {
      return (
        <li className="cart-item" key={product.name}>
          <img className="product-image" src={product.image} />
          <div className="product-info">
            <p className="product-name">{product.name}</p>
            <p className="product-price">{product.price}</p>
          </div>
          <div className="product-total">
            <p className="quantity">
            </p>
            <p className="amount">{product.quantity * product.price}</p>
          </div>
          <a
            className="product-remove"
            href="#"
            onClick={this.props.removeProduct.bind(this, product.id)}
          >
            ×
          </a>
        </li>
      );
    });

    return (
      <header>
        <div className="container">
          <div className="search">
            <form
              action="#"
              className={"search-form"}
            >
              <input
                type="search"
                ref="searchBox"
                placeholder="Введите товар для поиска"
                className="search-keyword"
                onChange={this.props.handleSearch}
              />
            </form>
          </div>

          <div className="cart">
            <div className="cart-info">
              <table>
                <tbody>
                  <tr>
                    <td>Товаров</td>
                    <td>:</td>
                    <td>
                      <strong>{this.props.totalItems}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Сумма</td>
                    <td>:</td>
                    <td>
                      <strong>{this.props.total}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <a
              className="cart-icon"
              href="#"
              onClick={this.handleCart.bind(this)}
              ref="cartButton"
            >
              <img
                className={this.props.cartBounce ? "tada" : " "}
                src="https://res.cloudinary.com/sivadass/image/upload/v1493548928/icons/bag.png"
                alt="Cart"
              />
              {this.props.totalItems ? (
                <span className="cart-count">{this.props.totalItems}</span>
              ) : (
                ""
              )}
            </a>
            <div
              className={
                this.state.showCart ? "cart-preview active" : "cart-preview"
              }
              ref="cartPreview"
            >
              <CartScrollBar>
                {cartItems}
              </CartScrollBar>
              {this.state.cart.length > 0 ? 
                <div className="action-block">

                  <select className="cart-input" defaultValue="EUR" onChange={this.selectChange}>
                    <option value="AMD">AMD</option>
                    <option value="AUD">AUD</option>
                    <option value="AZN">AZN</option>
                    <option value="AUD">AUD</option>
                    <option value="BGN">BGN</option>
                    <option value="BRL">BRL</option>
                    <option value="BYN">BYN</option>
                    <option value="CAD">CAD</option>
                    <option value="CHF">CHF</option>
                    <option value="CNY">CNY</option>
                    <option value="CZK">CZK</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="HKD">HKD</option>
                    <option value="HUF">HUF</option>
                    <option value="INR">INR</option>
                    <option value="JPY">JPY</option>
                    <option value="KGS">KGS</option>
                    <option value="KRW">KRW</option>
                    <option value="KZT">KZT</option>
                    <option value="MDL">MDL</option>
                    <option value="NOK">NOK</option>
                    <option value="PLN">PLN</option>
                    <option value="RON">RON</option>
                    <option value="SEK">SEK</option>
                    <option value="SGD">SGD</option>
                    <option value="TJS">TJS</option>
                    <option value="TMT">TMT</option>
                    <option value="TRY">TRY</option>
                    <option value="UAH">UAH</option>
                    <option value="USD">USD</option>
                    <option value="UZS">UZS</option>
                    <option value="UZS">UZS</option>
                    <option value="XDR">XDR</option>
                    <option value="ZAR">ZAR</option>
                  </select>

                  <button
                    type="button"
                    className={this.state.cart.length > 0 ? " " : "disabled"}
                    onClick = {this.handleSendToServer}
                  >
                    Посчитать в валюте
                  </button>
                </div>
               : null
             }



            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
