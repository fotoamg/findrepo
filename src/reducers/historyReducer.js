/**
 * Inital state for history data
 */
export const initialState = { items: [], selectedIndex: -1 };

/**
 * Reducer handling history item selection
 * @param {*} state 
 * @param {*} action 
 */
const historyReducer = (state = { ...initialState }, action) => {
    switch (action.type) {
        case "HISTORY_SELECT":
            // console.log("HISTORY_SELECT reducer", action.payload );
            state = { ...state };
            state.items = action.payload.items;
            state.selectedIndex = action.payload.index;
            break;
        default:
            // // console.log("default CASE reducer", action.payload);
            break;

    }
    return state;
};

export default historyReducer;
