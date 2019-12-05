import React, { Component } from "react";
import Cell from "./cell";
class Row extends Component {
  render() {
    const { elements, row, tick, pieces_win } = this.props;
    const cells = elements.map((e, index) => (
      <Cell
        data={e}
        row={row}
        col={index}
        tick={(row, col) => tick(row, col)}
        pieces_win={pieces_win}
      />
    ));
    return cells;
  }
}

export default Row;
