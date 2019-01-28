import React from 'react';

function Result(props){

	return (
		<div className={props.isOpen ? "result open" : "result"}>
			<h2>Congrratulations</h2>
			<button onClick={props.onClose}>Закрыть</button>
		</div>
	)
}

export default Result;