import React from "react";
import Board from "./Board";
import "../index.css";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xIsNext: true,
      stepNumber: 0,
      isAscending: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = [...current.squares];
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          position: i,
        },
      ]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  jumpTo(step) {
    this.setState({ stepNumber: step, xIsNext: step % 2 === 0 });
  }

  toggleMoves() {
    this.setState({
      isAscending: !this.state.isAscending,
    });
  }

  calculateWinner(squares) {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return [squares[a], lines[i]];
      }
    }
    return null;
  }

  getPosition(index) {
    const col = 1 + (index % 3);
    const row = 1 + Math.floor(index / 3);
    return [col, row];
  }

  render() {
    const history = this.state.history;
    const { squares } = history[this.state.stepNumber];

    const moves = history.map((step, move) => {
      const position = this.getPosition(step.position);
      const col = position[0];
      const row = position[1];
      const desc = move
        ? `Go to move # ${move} (${col}, ${row})`
        : "Go to game start";
      return (
        <li key={move}>
          <button
            className={
              move === this.state.stepNumber ? "btn item_selected" : "btn"
            }
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;
    let winningInfo;
    const winner = this.calculateWinner(squares);
    if (winner) {
      status = "The winner is " + winner[0];
      winningInfo = winner[1];
    } else if (!winner && this.state.stepNumber === 9) {
      status = "It's a draw!";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={squares}
            onClick={(i) => this.handleClick(i)}
            winningInfo={winningInfo}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <br />
          <button onClick={() => this.toggleMoves()} className="btn">
            Sort in {this.state.isAscending ? "Ascending" : "Descending"} order
          </button>
          <ol>{this.state.isAscending ? moves : moves.reverse()}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
