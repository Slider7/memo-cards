import React from 'react';
import Card from './Card.jsx';
import { shuffle } from './utils.js';


const CardsTable = (props) => {
	const colWidtn = (120 + 2) * props.cols + (props.cols) * 6 ;
	var cardsArray = [];
	var cardClass = "", k = 1;

	for (var i = 0; i < props.cards.length; i++) {
		cardsArray.push(
			<Card
				cardClass = {cardClass}
				key = {props.cards[i].id}
				id = {props.cards[i].id}
				img = {props.cards[i].img}
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

