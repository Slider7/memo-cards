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
			cards: Array(this.rows).fill().map(() => Array(this.cols).fill({
				name: "",
				closed: true,
				finished: false
			})),
			currCardName: "",
			cRow: -1,
			cCol: -1,
			openedCards: 0,
			active: true
		}
  }

  clickCard = (row, col) =>{
  	if (this.state.active) {
	  	let cardsArr = JSON.parse(JSON.stringify( this.state.cards ));
	  	let currName = cardsArr[row][col].name;
	  	let aRow = this.state.cRow;
	  	let aCol = this.state.cCol;
	  	let count = this.state.openedCards;
	  	//проверка это те же самая карта или нет, если да, то перевернем назад и уменьшаем счетчик открытых карт
/*	  	console.log(row + '  ' + col);
	  	console.log(aRow + '  ' + aCol);*/
	  	if (aRow === row && aCol === col ) {
	  		cardsArr[row][col].closed = true;
	  		aRow = -1; 
	  		aCol = -1;
	  		count = count - 1;
	  		currName = '';
	  	} else { //если это другая карта, то откроем и увеличиваем счетчик открытых карт
	  		cardsArr[row][col].closed = false;
	  		aRow = row; 
	  		aCol = col; 
	  		count = count + 1;
	  	}
  
	  	this.setState({
	  		cards: cardsArr,
	  		currCardName: currName,
	  		cRow: aRow,
	  		cCol: aCol,
	  		active: (count < 2),//если открытых карт меньше двух то поле активно
	  		openedCards: count
	  	})
	  	
	  	//если открытых карт 2 то проверяем поле через 1сек.
	  	if (count === 2) {
	  		setTimeout(this.checkCards, 1000); 
	  	};
	  }; 
  }

  getHint = () => {
    //
  }

  initBoard = () => {
  	this.setState({
      //2-мерн.массив значений false-состояние клеток на доске
			cards: Array(this.rows).fill().map(() => Array(this.cols).fill({
				name: "",
				closed: true,
				finished: false
			})),
			currCardName: "",
			cRow: -1,
			cCol: -1,
			openedCards: 0,
			active: true
		})
  };

  checkCards = () =>{
  	//проверка массива карт
  	let cardsArr = JSON.parse(JSON.stringify( this.state.cards ));
  	for(let i = 0; i < this.rows; i++){
  		for(let j = 0; j < this.cols; j++){
  			if (cardsArr[i][j].finished === false){
  				if (cardsArr[i][j].closed === false) {
  			  	cardsArr[i][j].closed = true;
  			  };
  			}
  		 }
  	}	
	  this.setState({
	  	cards: cardsArr,
	  	currName: '',
			cRow: -1,
			cCol: -1,
	  	openedCards: 0,
	  	active: true
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