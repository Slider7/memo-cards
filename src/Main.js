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
				img: i + 1,
				opened: false,
				finished: false
			});

			k++;

			arr.push({
				id: k,
				img: i + 1,
				opened: false,
				finished: false
			});

			k++;
		}
		return ( shuffle(arr) );
  }
  
  getCard = (id) =>{
  	for (let i = 0; i < this.state.cards.length; i++){
  		if (this.state.cards[i].id === id) {
  			return (this.state.cards[i])
  		}
  	}
  } 


  clickCard = (id, idx) => {
  	let arr = copyArray(this.state.cards);
  	let currId = this.state.currCardId, 
  			openedCount = this.state.openedCount,
  			finishedCount = this.state.finishedCount;
    
  	if (this.getCard(id).finished === false){//если карта не отгадана
  		if (this.state.openedCount < 2 ) {
  			if ( currId < 0 ) {
					arr[idx].opened = true;
					currId = id;
					openedCount++;
  			} else {
					arr[idx].opened = true;
					openedCount++;
  			  if (arr[idx].img === this.getCard(currId).img) {
  			  	arr[idx].finished = true;	
  			  	finishedCount++;
  			  }
  			}
  		}
  		this.setState({
  			openedCount: openedCount,
  			finishedCount: finishedCount,
  			currCardId: currId,
  			cards: arr 
  		});
  	}

  	if (this.state.openedCount === 2) {//если открытых карт 2 то проверяем поле через 1.5сек.
  		setTimeout(this.checkCards(), 1500); 
		};

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
  	let arr = copyArray(this.state.cards),
  			finishedCount = this.state.finishedCount;

  	for (let i = 0; i < arr.length; i++){
  		if (arr[i].opened && !arr[i].finished) {
  			arr[i].opened = false;
  		}
  	}
  	this.setState({
  		openedCount: 0,
  		finishedCount: finishedCount,
  		currCardId: -1,
  		cards: arr
  	})
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