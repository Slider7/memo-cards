import React, { Component } from "react";
import ReactDOM from "react-dom";
import CardsTable from './CardsTable';
import Result from './Result';
import { Button, ButtonGroup } from 'reactstrap';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.css';
import { copyArray, shuffle } from '../utils/utils.js';

class App extends React.Component {
	
  constructor() {
    super();
		this.cols = 6;
		this.cardCount = 12;
		this.state = {
			openedCount: 0,
			finishedCount: 0,
			currCardId: -1,
			cards: [],
			clickCount: 0,
			showResult: false,
			hints: 0,
			dropdownOpen: false
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
  		setTimeout(() => { this.setState({ showResult: true }) }, 500);
  	}
  }

  getHint = () => {
  	let arr = copyArray(this.state.cards),
		finishedCount = this.state.finishedCount;
		let hints = this.state.hints;
		let k = -1;
		if (this.state.openedCount === 0){
			for (let i = 0; i < arr.length; i++) {
	  		if (!arr[i].finished) { 
	  			k = i; 
	  			break;
	  		}
	  	}
		} else {
		  	for (let i = 0; i < arr.length; i++){
		  		if (arr[i].opened && !arr[i].finished) {
		  			k = i;
		  			break;
		  		}
		  	}
		  }
		if (k < 0) {return } else {hints++}

		for (let i = 0; i < arr.length; i++){
			if (arr[i].img === arr[k].img){
				arr[i].opened = true;
				arr[k].opened = true;
			}
		}  
		  
  	this.setState({
  		cards: arr,
  		hints: hints
  	})
  	setTimeout(() => {this.closeCards()}, 1000)
  }

  initBoard = () =>{
  	this.setState({
			openedCount: 0,
			finishedCount: 0,
			currCardId: -1,
			cards: this.prepareCardsStateArray(this.cardCount),
			clickCount: 0,
			showResult: false,
			hints: 0,
			dropdownOpen: false
  	})
  };

  closeResult = () => {
    this.initBoard()
  }

  checkResult = () => {
    return (this.state.finishedCount == this.state.cards.length);
  }

	toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
  	})
  }

  changeDiff = (event) => {
  	switch (event.target.id){
  		case "1":{
  			this.cols = 4;
  			this.cardCount = 6;
  			break;	
  		}
  		case "2":{
  			this.cols = 4;
  			this.cardCount = 8;
  			break;	
  		}
  		default:{
  			this.cols = 6;
  			this.cardCount = 12;
  			break;	
  		}
  	}
  	this.initBoard();
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

					<ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
		        <DropdownToggle caret>
		          Сложность 
		        </DropdownToggle>
		        <DropdownMenu>
		          <DropdownItem id="1" onClick={this.changeDiff}>12шт. (4 х 3)</DropdownItem>
		          <DropdownItem id="2" onClick={this.changeDiff}>16шт. (4 х 4)</DropdownItem>
		          <DropdownItem id="3" onClick={this.changeDiff}>24шт. (6 х 4)</DropdownItem>
		        </DropdownMenu>
		      </ButtonDropdown>
        </ButtonGroup>
        
        <Result 
          isOpen={this.state.showResult} 
          onClose={this.closeResult}
          cardCount={this.state.cards.length}
          clickCount={this.state.clickCount}
          hintCount={this.state.hints}
        />

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

export default App;