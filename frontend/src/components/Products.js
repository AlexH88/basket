import React, { Component } from "react";
import Product from "./Product";

class Products extends Component {
	render(){

		let productsData
		let term = this.props.searchTerm

		function searchingFor(term) {
			return function(x) {
				return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
			};
		}

		productsData = this.props.productsList
			.filter(searchingFor(term))
			.map(product => {
				return (
					<Product
						key={product.id}
						price={product.price}
						name={product.name}
						image={product.image}
						id={product.id}
						addToCart={this.props.addToCart}
						productQuantity={this.props.productQuantity}
						updateQuantity={this.props.updateQuantity}
					/>
				);
			});

		return(
			<div className="products-wrapper">
				<div className="products">{productsData}</div>
			</div>
		)
	}
}

export default Products