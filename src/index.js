import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/*
class Square extends React.Component {
     render() {
      return (
        <button 
          className="square" 
          onClick={() => this.props.onClick()}>
          {this.props.value}
        </button>
      );
    }
  }*/

  // now the Square is a function component instead of a class component
  function Square(props) {
    return (
      <button 
          className="square" 
          onClick={props.onClick}>
          {props.value}
        </button>
    );
  }
  
  class Board extends React.Component {
    /* To collect data from multiple children, 
    or to have two child components communicate with each other, 
    you need to declare the shared state in their parent component instead. 
    The parent component can pass the state back down to the children by using props; 
    this keeps the child components in sync with each other and with the parent component. */
    constructor(props){
       /*In JavaScript classes, you need to always call super when defining the constructor of a subclass. 
      All React component classes that have a constructor should start with a super(props) call. */
      super(props);
      this.state = {
        squares: Array(9).fill(null),
        xIsNext: true,
      };
    }
    
    handleClick(i) {
      /* .slice() to create a copy of the squares array to modify instead of modifying the existing array */
      const squaresCopy = this.state.squares.slice();
      // ignores a click when someone wins
      if(calculateWinner(squaresCopy) || squaresCopy[i]){ 
        return;
      }

      squaresCopy[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        squares : squaresCopy,
        xIsNext : !this.state.xIsNext,
      });
    }
    
    renderSquare(i) {
      return <Square 
        value={this.state.squares[i]} 
        onClick ={() => this.handleClick(i)}
      />;
    }
  
    render() {
      const winner = calculateWinner(this.state.squares);
      let status;
      if(winner){
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  