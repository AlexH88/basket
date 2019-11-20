import React, { Component } from "react";
import CartScrollBar from "./CartScrollBar";

class ModalCurrencyScore extends Component {
	constructor() {
		super();
		this.state = {};

		this.closeModal = this.closeModal.bind(this);
	}

	closeModal(){
		this.props.closeModalResult();
	}

	render() {
		let list = [];
		for(let item in this.props.currecyList){
		    list.push(
		        <li key={item} className="">{`${item}  :  ${this.props.currecyList[item]}`}</li> 
		    )
		}

		return(
          <div className="modal-result">
          	<span className="btn-close" onClick={this.closeModal}><img src="http://tk-pereezd.ru/images/iks.png"/></span>
			<div className="modal-heder">
				<h3>Цены в валюте относительно {this.props.valute}</h3>
			</div>
          	<div>
	          	<CartScrollBar>
	          		<ul className="ul-list-currency">{list}</ul>
          		</CartScrollBar>
          	</div>
			<div className="modal-action">
				<button
					type="button"
					onClick = {this.closeModal}
				>
					✔ Ok
				</button>
			</div>
          </div>
		);
	}
}

export default ModalCurrencyScore;