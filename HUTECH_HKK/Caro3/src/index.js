import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import './index.css';

const defaultWidth = 16;
const defaultHeight = 10;
const minSize = 5;
const maxSize = 25;
const nSquareToWin = 5;

function Square(props) {
  return (props.win) ? (
    <button className="square square-highlight" onClick={props.onClick}>
      {props.value}
    </button>
  ) : (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>  
  )  ;
}

class SquareRow extends React.Component {
  render() {
    let squareRow = this.props.row.map((square, idx) => {
      let k = "s" + idx;
      let win = false;
      let winner = this.props.winner;
      let rowIdx = this.props.rowIdx;
      if (winner) {
        if (winner.direction === "ToRight" &&
          idx >= winner.x && idx <= winner.x + nSquareToWin - 1 && rowIdx === winner.y) {
            win = true;
        }
        if (winner.direction === "ToDown" &&
            rowIdx >= winner.y && rowIdx <= winner.y + nSquareToWin - 1 && idx === winner.x) {
            win = true;
        }
        if (winner.direction === "ToRightDown" &&
          idx >= winner.x && idx <= winner.x + nSquareToWin - 1 && idx - winner.x === rowIdx - winner.y) {
            win = true;
        }
        if (winner.direction === "ToLeftDown" &&
          idx <= winner.x && idx >= winner.x - nSquareToWin + 1 && winner.x - idx === rowIdx - winner.y) {
            console.log(winner.x+' '+winner.y+' '+idx+' '+rowIdx+' '+nSquareToWin);
            win = true;
        }
      }
      return (
        <Square win={win} value={square} onClick={() => this.props.onClick(this.props.rowIdx, idx)} key={k} />
      )
    })
    return (
      <div className="board-row">
        {squareRow}
      </div>
    )
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]} 
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  render() {
    let board;
    board = this.props.squares.map((row, idx) => {
      let k = "r" + idx;
      return (
        <SquareRow winner={this.props.winner} rowIdx={idx} row={row} onClick={this.props.onClick} key={k}/>
      )
    })
    return (
      <div>
        {board}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    let tmpArr = Array(defaultHeight);
    for (let i = 0; i < defaultHeight; i++) {
      tmpArr[i] = Array(defaultWidth).fill(null);
    }
    this.state = {
      inputWidth: defaultWidth,
      inputHeight: defaultHeight,
      width: defaultWidth,
      height: defaultHeight,
      history: [{
        squares: tmpArr,
        location: null,
      }],
      stepNumber: 0,
      xIsNext: true,
      isDescending: true,
    };
    this.handleChangeHeight = this.handleChangeHeight.bind(this);
    this.handleChangeWidth = this.handleChangeWidth.bind(this);
    this.sort = this.sort.bind(this);
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }
  handleClick(i, j) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    current.squares.map((row, idx) => {
      squares[idx] = current.squares[idx].slice();
      return true;
    })
    if (calculateWinner(squares) || squares[i][j]) {
      return;
    }
    squares[i][j] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        location: {x: i, y: j}
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
  sort() {
    this.setState({isDescending: !this.state.isDescending});
  }
  handleChangeWidth(e) {
    const val = Number(e.target.value);
    this.setState({inputWidth: val});
    if (val >= minSize && val <= maxSize) {
      let tmpArr = Array(this.state.height);
      for (let i = 0; i < this.state.height; i++) {
        tmpArr[i] = Array(val).fill(null);
      }
      this.setState({
        width: val,
        history: [{
          squares: tmpArr,
          location: null,
        }],
        stepNumber: 0,
        xIsNext: true,
      });
    }
  }
  handleChangeHeight(e) {
    const val = Number(e.target.value);
    this.setState({inputHeight: val});
    if (val >= minSize && val <= maxSize) {
      let tmpArr = Array(val);
      for (let i = 0; i < val; i++) {
        tmpArr[i] = Array(this.state.width).fill(null);
      }
      this.setState({
        height: Number(val),
        history: [{
          squares: tmpArr,
          location: null,
        }],
        stepNumber: 0,
        xIsNext: true,
      });
    }
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let moves = history.map((step, move) => {
      const desc = move ?
        'Bước đi #' + move + ' (' + step.location.x + ',' + step.location.y + ')' :
        'Bước đi ';
      return (this.state.stepNumber === move) ? (
        <li key={move}>
          <button className="btn btn-info" onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      ) : (
        <li key={move}>
        <button className="btn btn-info" onClick={() => this.jumpTo(move)}>{desc}</button>
      </li>
      );
    });
    if (!this.state.isDescending) {
      moves = moves.reverse();
    }

    let status;
    if (winner) {
      status = 'Người Chiến Thắng: ' + winner.val;
    } else {
      status = 'Đến lượt chơi: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    let arrow = this.state.isDescending ? '↓' : '↑'
    return (
      <div class="content">
        <div className="game">

          <div className="game-board">
          <div className="game-config">
          <div className="text-jutify"><h1>TEAM HKK: Trò Chơi Ca Rô</h1>{status} </div>
          <br />
          <label className="">Số Ô Chiều Rộng:</label><input className="form-control" type="number" placeholder="Chiều rộng" value={this.state.inputWidth} onChange={this.handleChangeWidth} />
          <br />
          <label className="">Số Ô Chiều Cao:</label><input className="form-control" type="number" placeholder="Chiều cao" value={this.state.inputHeight} onChange={this.handleChangeHeight} />
        </div>
            <Board
              squares={current.squares}
              onClick={(i, j) => this.handleClick(i, j)}
              winner={winner}
            />
            <div className="game-info">
            <div>
              <h4>Thứ tự bước đi</h4>
            </div>
            <span>{moves}</span>
          </div>
          <div className="save-game-blockchain">
              <label className="">Nhập mã trò chơi:</label><input className="form-control" type="text" placeholder="Nhập mã để lưu trò chơi" value="" />

              <button className="btn btn-primary">Save</button>
          </div>
          <div className="open-game-blockchain">
          <label className="">Nhập mã trò chơi:</label><input className="form-control" type="text" placeholder="Nhập mã để mở trò chơi" value="" />

          <button className="btn btn-success">Open</button>
          </div>
          </div>

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
  let win;
  for (let i = 0; i < squares.length; i++) {
    for (let j = 0; j < squares[i].length; j++) {
      //Kiểm trang NSquareToWin ô liên tiếp từ ô xuất phát sang phải, xuống góc phải dưới, xuống góc trái dưới
      //Nếu có NSquareToWin - 1 cặp liên tiếp giống nhau thì thắng
      //Direction: ToRight, ToRightDown, ToDown, ToLeftDown
      if (!squares[i][j]) continue;
      if (j <= squares[i].length - nSquareToWin) {
        win = true;
        for (let k = 0; k < nSquareToWin - 1; k++) {
          if (squares[i][j + k] !== squares[i][j + k + 1]) {
            win = false
          }
        }
        if (win) return {val: squares[i][j], x: j, y: i, direction: 'ToRight'};
      }
      if (i <= squares.length - nSquareToWin) {
        win = true;
        for (let k = 0; k < nSquareToWin - 1; k++) {
          if (squares[i + k][j] !== squares[i + k + 1][j]) {
            win = false
          }
        }
        if (win) return {val: squares[i][j], x: j, y: i, direction: 'ToDown'};
      }
      if (j <= squares[i].length - nSquareToWin && i <= squares.length - nSquareToWin) {
        win = true;
        for (let k = 0; k < nSquareToWin - 1; k++) {
          if (squares[i + k][j + k] !== squares[i + k + 1][j + k + 1]) {
            win = false
          }
        }
        if (win) return {val: squares[i][j], x: j, y: i, direction: 'ToRightDown'};
      }
      if (i <= squares.length - nSquareToWin && j >= nSquareToWin - 1) {
        win = true;
        for (let k = 0; k < nSquareToWin - 1; k++) {
          if (squares[i + k][j - k] !== squares[i + k + 1][j - k - 1]) {
            win = false
          }
        }
        if (win) return {val: squares[i][j], x: j, y: i, direction: 'ToLeftDown'};
      }
    }
  }
  return null;
}