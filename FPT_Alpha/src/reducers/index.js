import { combineReducers } from "redux";
import { types, pieces } from "../constants/action.types";

const inital_state = {
  number_cell: null,
  array_board: null,
  piece_current: pieces.X
};
const main = (state = inital_state, action) => {
  switch (action.type) {
    case types.SET_NUMBER_CELL: {
      return { ...state, number_cell: parseInt(action.number_cell) };
    }
    case types.INIT_ARRAY: {
      return { ...state, array_board: action.array_board };
    }
    case types.SWITCH_PIECE: {
      return { ...state, piece_current: action.data };
    }
    case types.TICK: {
      return {...state, array_board: action.array_new}
    }
    default:
      return state;
  }
};
export default combineReducers({ main });
