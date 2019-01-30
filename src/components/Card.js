import React from 'react';

function Card(props) {
	const handleClick = () => {
	  props.clickCard(props.id, props.index);
	}

  return (
	  <img 
	    className={props.cardClass + " default-card"} 
	    onClick = {handleClick} 
      alt = ""
      src = {"images/" + props.img + ".jpg"}
	  />
  ) 
}

export default Card;