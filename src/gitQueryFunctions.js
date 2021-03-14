import axios from 'axios';

/**
 * Loads search result form Git API.
 * @param {*} simpleQueryString 
 * @param {*} pageSize 
 * @param {*} currPage 
 * @param {*} orderBy 
 * @param {*} sortBy 
 * 
 * @returns Promise of Axios call
 */
const getApiSearchResults = (encodedQueryString, pageSize, currPage, orderBy, sortBy) => {
    const url = `https://api.github.com/search/repositories?q=${encodedQueryString}&page=${currPage}&per_page=${pageSize}&sort=${sortBy}&order=${orderBy}`;
    return axios.get(url)
};

/**
 * Generates query string for simple search form
 *  @param {*} form 
 */
const simpleSearchQuery = (form) => {
    let result = `${form.searchValue}${form.name ? ' in:name' : ''}${form.description ? ' in:description' : ''}${form.readme ? ' in:readme' : ''}`;
    return result;
}

/**
 * Generates query string for advanced search form
 * @param {*} form 
 */
const advancedSearchQuery = (form) => {
    let result = '';

    if (form.searchValue && form.searchValue.length > 2) {
        result += `${form.searchValue}${form.name ? ' in:name' : ''}${form.description ? ' in:description' : ''}${form.readme ? ' in:readme' : ''}`;
    }

    if (form.user && form.user.length > 2) {
        if (result.length > 0) {
            result += ' ';
        }
        result += `user:${form.user}`;
    }

    if (form.org && form.org.length > 2) {
        if (result.length > 0) {
            result += ' ';
        }
        result += `org:${form.org}`;
    }

    if (form.lang && form.lang.length > 0) {
        if (result.length > 0) {
            result += ' ';
        }
        result += `language:${form.lang}`;
    }

    if (form.topic && form.topic.length > 2) {
        if (result.length > 0) {
            result += ' ';
        }
        result += `topic:${form.topic}`;
    }

    if (form.starCheck && form.starsNumber && form.starsNumber.length > 0 && !isNaN(Number(form.starsNumber))) {
        if (result.length > 0) {
            result += ' ';
        }
        if (form.starCheck === 'equal') {
            result += `stars:${form.starsNumber}`;
        } else if (form.starCheck === 'greater') {
            result += `stars:>${form.starsNumber}`;
        } else if (form.starCheck === 'less') {
            result += `stars:<${form.starsNumber}`;
        } else if (form.starCheck === 'between' &&
            form.starsMax && form.starsMax.length > 0 && !isNaN(Number(form.starsMax))) {
            result += `stars:${form.starsNumber}..${form.starsMax}`;
        }
    }

    if (form.sizeCheck && form.sizeNumber && form.sizeNumber.length > 0 && !isNaN(Number(form.sizeNumber))) {
        if (result.length > 0) {
            result += ' ';
        }
        if (form.sizeCheck === 'equal') {
            result += `size:${form.sizeNumber}`;
        } else if (form.sizeCheck === 'greater') {
            result += `size:>${form.sizeNumber}`;
        } else if (form.sizeCheck === 'less') {
            result += `size:<${form.sizeNumber}`;
        } else if (form.sizeCheck === 'between' &&
            form.sizeMax && form.sizeMax.length > 0 && !isNaN(Number(form.sizeMax))) {
            result += `size:${form.sizeNumber}..${form.sizeMax}`;
        }
    }

    return result;
}

export { getApiSearchResults, simpleSearchQuery, advancedSearchQuery };
