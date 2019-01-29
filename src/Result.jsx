import React from 'react';

function Result(props){
	function getStars(clicks, cardCount){
		let n = Math.round((cardCount / clicks) * 10);
		switch (n) {
			case 0: return "&#9734;&#9734;&#9734;&#9734;&#9734;";
			case 1: return `&#9733;&#9734;&#9734;&#9734;&#9734;`;
			case 2: return `&#9733;&#9733;&#9734;&#9734;&#9734;`;
			case 3: return `&#9733;&#9733;&#9733;&#9734;&#9734;`;
			case 4: return `&#9733;&#9733;&#9733;&#9733;&#9734;`;
			default: return `&#9733;&#9733;&#9733;&#9733;&#9733;`;
		}
	}

	var rating = getStars(props.clickCount, props.cardCount);

	return (
		<div className={props.isOpen ? "result" : "result closed"}>
			<h2>Игра окончена</h2>
			<h2>Количество кликов: {props.clickCount} </h2>
			<h2>Рейтинг: {rating}; &#9734;&#9734;&#9734; </h2>
			<button onClick={props.onClose}>Закрыть</button>
		</div>
	)
}

export default Result;