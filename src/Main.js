import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { hot } from 'react-hot-loader';
import CardsTable from './CardsTable';
import { Button, ButtonGroup } from 'reactstrap';
import './css/style.css';
import { copyArray, shuffle } from './utils.js';

class Main extends React.Component {
	
  constructor() {
    super();
		this.cols = 6;
		this.cardCount = 12;

		this.state = {
			openedCount: 0,
			finishedCount: 0,
			currCardId: -1,
			cards: []
		}
  }
  
  prepareCardsStateArray = (n) => {
		let arr = [], k = 1;
		for (let i = 0; i < n; i++) {
			arr.push({
				id: k,
				img: i + 1
			});

			k++;

			arr.push({
				id: k,
				img: i + 1
			});

			k++;
		}
		return ( shuffle(arr) );
  }
    
  clickCard = (id) => {
  	/*
  	//если открытых карт 2 то проверяем поле через 1сек.
  	if (count === 2) {
  		setTimeout(this.checkCards, 1000); 
  	};
  	*/
  	alert(id);
  }

  getHint = () => {
    //
  }

  initBoard = () =>{
  	this.setState({
			openedCount: 0,
			finishedCount: 0,
			currCardId: -1,
			cards: this.prepareCardsStateArray(this.cardCount)
  	})
  };

  checkCards = () => {
  	//проверка массива карт
  }

  componentDidMount(){
  	this.initBoard();
  }
  
  render() {
    return (
      <div className="mainDiv">
        <h2 className="game-title">Игра на запоминание карточек</h2>
        <ButtonGroup>
          <Button color="primary" onClick={this.initBoard}>Рестарт</Button>
          <Button color="warning" onClick={this.getHint}>Подсказка</Button>
        </ButtonGroup>
        <CardsTable
        	clickCard = {this.clickCard}
        	cardCount = {this.cardCount}
        	cols = {this.cols}
        	cards = {this.state.cards}
        />
      </div>
    )
  }

}

export default hot(module)(Main);