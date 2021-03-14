export const initialState = {};

/**
 * Reducer to cache URL calls for languages list,
 * but could be used for general caching too.
 * @param {*} state 
 * @param {*} action 
 */
const loaderReducer = (state = { ...initialState }, action) => {
    switch (action.type) {
        case "URL_FETCHED":
            // console.log("URL_FETCHED", action.payload.url, action.payload.data);
            state = { ...state };
            state[action.payload.url] = Object.keys(action.payload.data);
            break;
        default:
            // // console.log("default CASE reducer", action.payload);
            break;
    }
    return state;
};

export default loaderReducer;
