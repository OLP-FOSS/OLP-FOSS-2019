import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Home from "../components/home";
import * as home_actions from "../actions/home.action";
import { pieces } from "../constants/action.types";
import { isWin } from "../algorithm/main";

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      is_win: -1,
      pieces_win: null
    };
  }

  tick(row, col) {
    const { actions, array_board, piece_current, number_cell } = this.props;
    if (this.state.is_win == 1) {
      return;
    }
    // count number of tick 
    let count_tmp = this.state.count + 1;
    this.setState({ count: count_tmp });

    // update board 
    let array_new = [...array_board];
    array_new[row][col] = piece_current;
    actions.tick(array_new);

    // check win 
    const pieces_win = isWin(array_new, row, col, piece_current);
    if (pieces_win.length > 0) {
      this.setState({ is_win: 1, pieces_win: pieces_win });
    } else if (count_tmp ==  number_cell * number_cell) {
      this.setState({ is_win: 0 });
    } else {
      // switch player
      actions.switch_piece(piece_current == pieces.X ? pieces.O : pieces.X);
    }
  }

  reset_map() {
    this.props.actions.init_array(
      Array(this.props.number_cell)
        .fill(null)
        .map(() => Array(this.props.number_cell).fill(null))
    );
    this.props.actions.switch_piece(pieces.X);
    this.setState({
      count: 0,
      is_win: -1,
      pieces_win: null
    });
  }

  render() {
    const { actions, array_board, piece_current } = this.props;
    const { is_win, pieces_win } = this.state;
    return (
      <Home
        setNumberCell={numberCell => {
          const number_cell = parseInt(numberCell);
          actions.set_number_cell(number_cell);
          actions.init_array(
            Array(number_cell)
              .fill(null)
              .map(() => Array(number_cell).fill(null))
          );
        }}
        array_board={array_board}
        tick={(row, col) => this.tick(row, col)}
        piece_current={piece_current}
        is_win={is_win}
        pieces_win={pieces_win}
        reset_map={() => this.reset_map()}
      />
    );
  }
}

const mapStateToProps = state => ({
  number_cell: state.main.number_cell,
  array_board: state.main.array_board,
  piece_current: state.main.piece_current
});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(home_actions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
