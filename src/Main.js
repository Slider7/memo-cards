import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { hot } from 'react-hot-loader';
import CardsTable from './CardsTable';
import Result from './Result';
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
			cards: [],
			clickCount: 0
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
  
  getItemById = (array, id) =>{
  	for (let i = 0; i < array.length; i++){
  		if (array[i].id === id) {
  			return (array[i])
  		}
  	}
  } 


  clickCard = (id, idx) => {
  	if (this.state.openedCount === 2) {
  		return
  	}

		if (id === this.state.currCardId) {
			this.closeCards()
  		return 
  	}  	

  	if (this.getItemById(this.state.cards, id).finished === false){//если карта не отгадана
	  	let arr = copyArray(this.state.cards);
	  	let currId = this.state.currCardId, 
	  			openedCount = this.state.openedCount,
	  			finishedCount = this.state.finishedCount,
	  			clickCount = this.state.clickCount;

  		if (this.state.openedCount < 2 ) {
  			if ( currId < 0 ) currId = id; 
					arr[idx].opened = true;
					openedCount++;

				this.setState({
					openedCount: openedCount,
					finishedCount: finishedCount,
					currCardId: currId,
					cards: arr,
					clickCount: clickCount + 1
				})
				
				if (openedCount === 2) {
			  	let twinFound = false;
			  	if (arr[idx].img === this.getItemById(arr, currId).img) {
				  	setTimeout(() => {this.markTwins(id, currId)}, 600)
				  } else {
				  	setTimeout(() => {this.closeCards()}, 1000)
				  }
				}
  		}	
  	}
  }
  
  closeCards = () => {
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

  markTwins = (id1, id2) =>{
  	let arr = copyArray(this.state.cards),
  			finishedCount = this.state.finishedCount;
  	this.getItemById(arr, id1).finished = true;
  	this.getItemById(arr, id2).finished = true;

  	this.setState({
  		openedCount: 0,
  		finishedCount: finishedCount + 2,
  		currCardId: -1,
  		cards: arr
  	})

  	if (this.state.finishedCount === this.state.cards.length){
  		setTimeout(() => {this.showResult()}, 700);
  	}
  }

  showResult = () =>{

  }

  getHint = () => {
    //
  }

  initBoard = () =>{
  	this.setState({
			openedCount: 0,
			finishedCount: 0,
			currCardId: -1,
			cards: this.prepareCardsStateArray(this.cardCount),
			clickCount: 0
  	})
  };

  closeResult = () => {

  }

  checkResult = () => {
    return (true)
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
        
        <Result isOpen={this.checkResult} onClose={this.closeResult}/>

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