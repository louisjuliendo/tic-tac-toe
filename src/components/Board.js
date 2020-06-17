import React from "react";
import Square from "./Square";
import "../index.css";

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        winningInfo={
          this.props.winningInfo && this.props.winningInfo.includes(i)
        }
        onClick={() => {
          this.props.onClick(i);
        }}
      />
    );
  }

  createBoard() {
    const board = [];
    const boardSize = 3;
    let index = 0;

    for (let row = 0; row < boardSize; row++) {
      let cols = [];
      for (let col = 0; col < boardSize; col++) {
        cols.push(this.renderSquare(index++));
      }
      board.push(
        <div key={row} className="board-row">
          {cols}
        </div>
      );
    }

    return board;
  }

  render() {
    return <div>{this.createBoard()}</div>;
  }
}

export default Board;
