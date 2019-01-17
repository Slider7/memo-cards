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

  selectCard = (row, col) =>{
  	/*let gridCopy = copyArray(this.state.gridFull);
  	gridCopy[row][col] = !gridCopy[row][col];
  	this.setState({
  		gridFull: gridCopy
  	})*/
  }

  getHint = () => {
    let a = 0;
    a = a * 3;
  }

  initBoard = () => {
  	//генерируем карточки
  	/*let gridCopy = copyArray(this.state.gridFull);
  	for(let i = 0; i < this.rows; i++){
  		for(let j = 0; j < this.cols; j++){
  			if (Math.floor(Math.random() * 4) === 1) {
  				gridCopy[i][j] = true;
  			}	
  		}
  	}
  	this.setState({ gridFull: gridCopy })	*/
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
        	selectCard = {this.selectCard}
        	cards = {this.state.cards}
        />
      </div>
    )
  }
}

const AppWithHot = hot(module)(Main);

var mountNode = document.getElementById("app");
ReactDOM.render(<AppWithHot name="React" />, mountNode);