import React from 'react';
import { withRouter } from 'react-router'
import { connect } from "react-redux";
import SimpleSearch from './SimpleSearch';
import AdvancedSearch from './AdvancedSearch';
import { initialState as searchInitState } from '../reducers/searchReducer';
import { getApiSearchResults, simpleSearchQuery, advancedSearchQuery } from '../gitQueryFunctions';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { validateSimpleForm, validateAdvancedForm } from '../formValidators';

/**
 * Component holding the search panel.
 * Class component just to show the old way before hooks getting popular.
 */
class SearchPanel extends React.Component {

    constructor(props) {
        super(props);
        // // console.log("props:", props);
        this.pageSize = props.pageSize || 10;
        this.currPage = props.currPage || searchInitState.currPage;
        this.sortBy = props.sortBy || searchInitState.sortBy;
        this.orderBy = props.orderBy || searchInitState.orderBy;
        this.type = props.type || searchInitState.type;
    }

    /**
     * Simple form submit function
     * @param {*} form 
     */
    handleSimpleSubmit = (form) => {
        // console.log('Simple search submit page_size: ' + this.pageSize);
        const simpleFormErrors = validateSimpleForm(form);
        // console.log('errors in simple form: ', simpleFormErrors);
        if (Object.keys(simpleFormErrors).length !== 0) {
            // this should never happen, but REDUX FORM sometimes just not runs VALIDATION after RESET button...
            // console.log('%cMissing required search value!', 'font-size:20px; background: #BBB; color: red', form);
            const errorMessage = simpleFormErrors[Object.keys(simpleFormErrors)[0]];
            this.props.validationError(errorMessage);
            return false;
        }
        this.props.startSearch();
        // we need to load first page by search setting to default sort/order IMHO
        this.props.searchClick(form,
            this.pageSize,
            searchInitState.currPage,
            searchInitState.orderBy,
            searchInitState.sortBy, false);
    }

    /**
     * Advanced form submit funcion
     * @param {*} form 
     */
    handleAdvancedSubmit = (form) => {
        // console.log('Advanced search submit page_size: ' + this.pageSize);
        const advancedFormErrors = validateAdvancedForm(form);
        // console.log('errors in advanced form: ', advancedFormErrors);
        if (Object.keys(advancedFormErrors).length !== 0) {
            // this should never happen, but REDUX FORM sometimes just not runs VALIDATION after RESET button...
            // console.log('%cMissing required value!', 'font-size:20px; background: #BBB; color: red', form);
            const errorMessage = advancedFormErrors[Object.keys(advancedFormErrors)[0]];
            this.props.validationError(errorMessage);
            return false;
        }
        this.props.startSearch();
        // we need to load first page by search setting to default sort/order IMHO
        this.props.searchClick(form,
            this.pageSize,
            searchInitState.currPage,
            searchInitState.orderBy,
            searchInitState.sortBy, true);
    }

    /**
     * Toggling to Simple mode
     */
    changeTypeToSimple = () => {
        // console.log('Change to simple!');
        this.props.typeChange('simple');
    }

    /**
     * Toggling to Advanced mode
     */
    changeTypeToAvanced = () => {
        // console.log('Change to advanced!');
        this.props.typeChange('advanced');
    }

    /**
     * Reseting form should reset results,
     * so we call it here.
     * @param {*} form 
     */
    handleReset = (form) => {
        // console.log('RESET CLICK!', form);
        this.props.initState();
    }

    render() {
        return (
            <Container fluid>
                <Row className='searchContainer'>
                    <Col>
                        {this.props.type === 'simple' ? <SimpleSearch onSubmit={this.handleSimpleSubmit} onReset={this.handleReset} onTypeToggle={this.changeTypeToAvanced} />
                            : <AdvancedSearch onSubmit={this.handleAdvancedSubmit} onReset={this.handleReset} onTypeToggle={this.changeTypeToSimple} />}
                    </Col>
                </Row>
                {this.props.isError ? (<Row>
                    <Col>
                        <Alert variant="danger">
                            {this.props.isError.errorType} <strong>{this.props.isError.message}</strong><br />
                            {this.props.isError.limitRemain}
                            {this.props.isError.limitUsed}
                            {this.props.isError.remainingSecs}
                        </Alert>
                    </Col>
                </Row>) : ('')}
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orderBy: state.search.orderBy,
        sortBy: state.search.sortBy,
        currPage: state.search.currPage,
        isError: state.search.error,
        type: state.search.type
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchClick: (form, pageSize, loadPage, orderByParam, sortByParam, isAdvanced) => {
            // console.log("searchForm, isAdvanced: " + isAdvanced, form);
            let gitQueryString;
            if (isAdvanced) {
                gitQueryString = advancedSearchQuery(form);
            } else {
                gitQueryString = simpleSearchQuery(form);
            }
            const encodedQuery = encodeURIComponent(gitQueryString);
            // console.log('gitQueryString', gitQueryString);
            return getApiSearchResults(encodedQuery, pageSize, loadPage, orderByParam, sortByParam).then(response => {
                // console.log('SEARCH result', response);
                if (response.status === 200) {
                    // console.log('Pagination Links: ' + response.headers['link']);
                    dispatch({
                        type: "SEARCH_FINISHED",
                        payload: {
                            result: response.data,
                            links: response.headers['link'],
                            queryString: gitQueryString,
                            currPage: loadPage,
                            sortBy: sortByParam,
                            orderBy: orderByParam,
                            url: response.config.url
                        }
                    })
                } else {
                    dispatch({
                        type: "SEARCH_ERROR",
                        payload: {}
                    })
                }
            }).catch(function (errorObj) {
                // console.log('Error in search promise', errorObj);
                dispatch({
                    type: "SEARCH_ERROR",
                    payload: { error: /*JSON.stringify(errorObj)*/ errorObj }
                });
            });
        },
        initState: () => {
            // console.log("SearchForm initState");
            dispatch({
                type: "INIT_STATE",
                payload: {}
            });
        },
        validationError: (errorMessage) => {
            // console.log("Validation error");
            dispatch({
                type: "SEARCH_ERROR",
                payload: { 
                    customErrorType: 'Form validation error: ',
                    error: { message: errorMessage}
                } 
            });
        },
        typeChange: (newType) => {
            // console.log(" Search type chage to: " + newType);
            dispatch({
                type: "TYPE_TOGGLE",
                payload: { type: newType }
            });
        },
        startSearch: () => dispatch({
            type: "SEARCH_START",
            payload: {}
        })
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPanel));