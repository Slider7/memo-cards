import React from 'react';

function Result(props){
	function getStars(clicks, cardCount){
		if (clicks == 0) return "";
		let n = Math.round(((cardCount + 2) / clicks) * 5);
		let hints = props.hintCount;
		n = n - hints;
		if (n < 0) n = 0;
		let st = "", sym="";
	  for (let i = 0; i < 5; i++){
	  	if (i < n) { 
	  		sym = String.fromCharCode(0x2605) 
	  	} else {
	  		sym = String.fromCharCode(0x2606) 
	  	}
	  	st = st + sym + " ";
	  }
	  return ( st )
	}

  var rating = getStars(props.clickCount, props.cardCount);
  //var rating = getStars(55, 24);
	return (
		<div className={props.isOpen ? "result" : "result closed"}>
			<h2>Игра окончена</h2>
			<h3>Количество кликов: {props.clickCount}</h3>
			<h3>Использовано подсказок: {props.hintCount}</h3>
			<h3>Рейтинг: <span className='rating'>{rating}</span> </h3>
			<button onClick={props.onClose} className="closeResult">Закрыть</button>
		</div>
	)
}

export default Result;