import React from 'react';

function Card(props) {
	const handleClick = () => {
	  props.clickCard(props.row, props.col);
	}

  return (
	  <div 
	    className={props.cardClass + " default-card"} 
	    id={props.cardId}
	    onClick = {handleClick}>
	  </div>
  ) 
}

export default Card;