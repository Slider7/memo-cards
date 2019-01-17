import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { hot } from 'react-hot-loader';
import CardsTable from './CardsTable';
import { Button, ButtonGroup } from 'reactstrap';
import './css/style.css';

class Main extends React.Component {
  constructor(){
    super();
		this.rows = 4;
		this.cols = 4;
    this.state = {
      //2-мерн.массив значений false-состояние клеток на доске
			cards: Array(this.rows).fill().map(() => Array(this.cols).fill(0))
		}
  }

  clickCard = (row, col) =>{
  	let cardsArr = JSON.parse(JSON.stringify( this.state.cards ));
    
  	if (cardsArr.indexOf(1) < 0){
  		cardsArr[row][col] = 1
  	} else {
  		if (cardsArr[row][col] === 0){
  			cardsArr[row][col] = -1;
  		}
  	}
    
  	this.setState({
  		cards: cardsArr
  	});

  	console.log(this.state.cards);
  }

   closeCard = (row, col) =>{
  	let cardsArr = JSON.parse(JSON.stringify( this.state.cards ));
  	cardsArr[row][col] = 0;
  	this.setState({
  		cards: cardsArr
  	});
  }

  getHint = () => {
    //
  }

  initBoard = () => {
  	clearInterval(this.intervalId);
    this.intervalId = setInterval(this.play, 1000);
  }

  play = () =>{
  	//Основная функция - алгоритм игры
  	let cardsArr = JSON.parse(JSON.stringify( this.state.cards ));
  	for(let i = 0; i < this.rows; i++){
  		for(let j = 0; j < this.cols; j++){
  			  if (cardsArr[i][j] === -1) {
  			  	cardsArr[i][j] === -10;
						break;
  			  };
  			  if (cardsArr[i][j] === -10) {
  			  	cardsArr[i][j] === 0;
						break;
  			  };
  			}	
  		}
  	this.setState({
  		cards: cardsArr
  	});	
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
        	cols = {this.cols}
        	rows = {this.rows}
        	clickCard = {this.clickCard}
        	closeCard = {this.closeCard}
        	cards = {this.state.cards}
        />
      </div>
    )
  }
}

const AppWithHot = hot(module)(Main);

var mountNode = document.getElementById("app");
ReactDOM.render(<AppWithHot name="React" />, mountNode);