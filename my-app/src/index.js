import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {

  render() {
    return (
      <button className="square"
      onClick={() => this.props.onClick()}>
       {this.props.value}
      </button>
    );
  }
}


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: new Array(9).fill(null),
      isNext: true,
    }
  }

  renderSquare(i) {
    return <Square 
    value={this.state.squares[i]} 
    onClick = {() => this.handleClick(i)}
    />;
  }

  handleClick(i) {
    const sqs = this.state.squares.slice();
    if (calculateWinner(sqs) || sqs[i]) {
      return;
    }
    sqs[i] = this.state.isNext ? 'X': 'O';
    this.setState({
      squares:sqs,
      isNext: !this.state.isNext,});
  }
 
  render() {
    const status = "next players: " + (this.state.isNext ? 'X': 'O');
    return(
      <div>
        <div className="status">{status}</div>
        <div className="broad-row">
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
        </div>
        <div className="broad-row">
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
        </div>
        <div className="broad-row">
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
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

function calculateWinner(squares) {
  const lines = [
  [1,2,3],
  [4,5,6],
  [7,8,9],
  [1,4,7],
  [2,5,8],
  [3,6,9],
  [1,5,9],
  [3,5,7],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


ReactDOM.render(
  <Game />,
  document.getElementById('root')
)

