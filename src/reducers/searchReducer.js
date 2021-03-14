import parseLinkHeader from 'parse-link-header';

/**
 * Initial state for the search state
 */
export const initialState = {
    repos: [],
    isloading: false,
    searchHistory: [],
    currPage: 1,
    orderBy: 'desc',
    sortBy: 'stars',
    type: 'simple'
};

/**
 * Helper function to shorten and flatten repo values stored in state.
*/
const itemTransformer = (item) => {
    return {
        name: item.name,
        full_name: item.full_name,
        html_url: item.html_url,
        stars: item.stargazers_count,
        forks: item.forks,
        /*issues: item.open_issues_count,*/
        language: item.language,
        languages_url: item.languages_url,
        owner: item.owner.login,
        description: item.description,
        created_at: item.created_at,
        updated_at: item.updated_at,
        owner_html_url: item.owner.html_url,
        owner_avatar_url: item.owner.avatar_url
    };
};

/**
 * Search reducer handling all general actions around search logic
 * @param {*} state 
 * @param {*} action 
 */
const searchReducer = (state = { ...initialState }, action) => {
    switch (action.type) {
        case "SEARCH_START":
            // console.log("SEARCH START reducer");
            state = { ...state };
            state.isLoading = true;
            state.error = false;
            break;
        case "SEARCH_FINISHED":
            // console.log("SEARCH FINISHED reducer", action.payload);
            /*console.groupCollapsed('%crepo items', 'background-color: transparent;font-size:20px; background: #222; color: #bada55');
            console.table(action.payload.result.items.map((item) => {
                return {
                    name: item.name,
                    full_name: item.full_name,
                    stars: item.stargazers_count,
                    watchers: item.watchers,
                    forks: item.forks,
                    issues: item.open_issues_count,
                    lang: item.language,
                    owner: item.owner.login,
                    description: item.description,
                    html_url: item.html_url
                }
            }).reduce((acc, { name, ...x }) => { acc[name] = x; return acc; }, {}));
            console.groupEnd();*/
            state = { ...state };
            state.total = action.payload.result.total_count;
            const repos = action.payload.result.items.map(item => itemTransformer(item));
            state.repos = repos;
            state.currPage = action.payload.currPage || initialState.currPage;
            state.orderBy = action.payload.orderBy || initialState.orderBy;
            state.sortBy = action.payload.sortBy || initialState.sortBy;
            state.links = parseLinkHeader(action.payload.links);
            if (state.links && state.links.last) {
                state.lastPage = state.links.last.page;
            } else {
                state.lastPage = state.currPage;
            }
            state.searchHistory = [...state.searchHistory];
            if (!action.payload.skipHistory) {
                state.searchHistory.push({
                    queryString: action.payload.queryString,
                    repos: repos
                });
            }
            state.isLoading = false;

            state.url = action.payload.url;
            break;
        case "SEARCH_ERROR":
            // console.log("SEARCH ERROR reducer");
            state = { ...state };
            state.isLoading = false;
            state.error = {};
            if (action.payload.error && action.payload.error.response
                && action.payload.error.response.status === 403) {
                // console.log('Search Error Response', action.payload.error.response);
                if (action.payload.error.response.data.message) {
                    state.error.message = action.payload.error.response.data.message;
                }
                if (action.payload.error.response.headers['x-ratelimit-used']) {
                    state.error.limitRemain = ' Limit remaining: ' + action.payload.error.response.headers['x-ratelimit-remaining'] + ' ';
                    state.error.limitUsed = ' Limit used: ' + action.payload.error.response.headers['x-ratelimit-used'] + ' ';
                    const currTime = Math.round((new Date()).getTime() / 1000);
                    const resetTime = Number.parseInt(action.payload.error.response.headers['x-ratelimit-reset'], 10);
                    // // console.log('Current time :' + currTime);
                    // // console.log('Reset time :' + resetTime);
                    state.error.remainingSecs = '  Please wait for ' + (resetTime - currTime) + ' seconds. ';
                }
            } else if (action.payload.error && action.payload.error.response
                && action.payload.error.response.status === 422) {
                // console.log('Search Error Response 422', action.payload.error.response);
                if (action.payload.error.response.data.message) {
                    state.error.errorType = action.payload.error.response.data.message;
                }
                if (action.payload.error.response.data.errors &&
                    Array.isArray(action.payload.error.response.data.errors) &&
                    action.payload.error.response.data.errors.length > 0 &&
                    action.payload.error.response.data.errors[0] &&
                    action.payload.error.response.data.errors[0].message) {
                    state.error.message = action.payload.error.response.data.errors[0].message
                }
            } else {
                if (action.payload.error && action.payload.error.message) {
                    state.error.message = action.payload.error.message;
                }
            }

            state.error.errorType = state.error.errorType || action.payload.customErrorType || 'Error loading data:';

            break;
        case "SORTORDER_START":
            // console.log("SORTORDER START reducer", action.payload);
            state = { ...state };
            state.isLoading = true;
            state.error = false;
            if (action.payload.orderBy) {
                state.orderBy = action.payload.orderBy;
            }
            if (action.payload.sortBy) {
                state.sortBy = action.payload.sortBy;
            }
            break;
        case "SORTORDER_FINISHED":
            // console.log("SORTORDER FINISHED reducer", action.payload);
            state = { ...state };
            state.total = action.payload.result.total_count;
            state.repos = action.payload.result.items.map(item => itemTransformer(item));
            state.links = parseLinkHeader(action.payload.links);
            state.searchHistory = [...state.searchHistory];
            state.isLoading = false;
            state.url = action.payload.url;
            break;
        case "PAGER_START":
            // console.log("PAGER START reducer", action.payload);
            state = { ...state };
            state.isLoading = true;
            state.error = false;
            break;
        case "PAGER_FINISHED":
            // console.log("PAGER FINISHED reducer", action.payload);
            state = { ...state };
            state.total = action.payload.result.total_count;
            state.repos = action.payload.result.items.map(item => itemTransformer(item));
            state.links = parseLinkHeader(action.payload.links);
            state.searchHistory = [...state.searchHistory];
            state.isLoading = false;
            state.url = action.payload.url;
            if (action.payload.currPage) {
                state.currPage = action.payload.currPage
            }
            break;
        case "INIT_STATE":
            // console.log("INIT_STATE reducer", action.payload);
            state = { ...state, repos: [] };
            break;
        case "TYPE_TOGGLE":
            // console.log("TYPE_TOGGLE reducer", action.payload);
            state = { ...state };
            state.type = action.payload.type || initialState.type;
            break;
        default:
            // // console.log("default CASE reducer", action.payload);
            break;

    }
    return state;
};

export default searchReducer;
