import React from 'react';
import Card from './Card.js';

const CardsTable = (props) => {
	const colWidtn = (120 + 2) * props.cols + (props.cols) * 6 ;
	var cardsArray = [];
	var cardClass = "", k = 1;

	for (var i = 0; i < props.cards.length; i++) {
		cardClass = props.cards[i].opened ?  "card-opened" : "card-closing" ;
		
		if (props.cards[i].finished) { cardClass = "card-finished" }
    
		cardsArray.push(
			<Card
				cardClass = {cardClass}
				key = {i}
				index = {i}
				id = {props.cards[i].id}
				img = {props.cards[i].opened ? props.cards[i].img : 'card-back'}
				clickCard = {props.clickCard}
			/>
		)
	}
  return(
		<div className="cardTable" style={{width: colWidtn}}>
		  {cardsArray}
		</div>
	);
}

export default CardsTable;

