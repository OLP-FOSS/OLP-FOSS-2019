import { types, pieces } from "../constants/action.types";

export const set_number_cell = number_cell => ({
    type: types.SET_NUMBER_CELL,
    number_cell
})

export const init_array = array_board => ({
    type: types.INIT_ARRAY,
    array_board
})

export const tick =  (array_new) => ({
    type: types.TICK,
    array_new
})

export const switch_piece = (data) => ({
    type: types.SWITCH_PIECE,
    data
})
