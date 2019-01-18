import React from 'react';
import Card from './Card.jsx';

const CardsTable = (props) => {
	const colWidtn = (120 + 2) * props.cols + (props.cols) * 6 ;
	var cardLines = [];
	var cardClass = "";
	for (var i = 0; i < props.rows; i++) {
		for (var j = 0; j < props.cols; j++) {
			let cardId = i + "_" + j;
			if (props.cards[i][j].closed == false){
				cardClass = "card-opening";
			} else cardClass = "card-closing card-closed";

			cardLines.push(
				<Card
					cardClass = {cardClass}
					key={cardId}
					cardId={cardId}
					row={i}
					col={j}
					clickCard={props.clickCard}
				/>
			)
		}
	}
  return(
		<div className="cardTable" style={{width: colWidtn}}>
		  {cardLines}
		</div>
	);
}

export default CardsTable;

