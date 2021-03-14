import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { ChevronBarLeft, ChevronLeft, ChevronRight, ChevronBarRight } from 'react-bootstrap-icons';
import axios from 'axios';

/**
 * Component for pagination
 * @param {*} props 
 */
function PagerControl(props) {
    const currPage = useSelector(state => state.search.currPage);
    const lastPage = useSelector(state => state.search.lastPage || currPage);
    const links = useSelector(state => state.search.links || []);
    const dispatch = useDispatch();

    const startPaging = (pageType) => {
        // console.log('Loading page: ' + pageType);
        const newUrl = links[pageType].url + '';
        const newPage = links[pageType].page + '';
        dispatch({
            type: "PAGER_START",
            payload: {}
        })
        axios.get(newUrl).then(response => {
            // console.log('PAGER result', response);
            if (response.status === 200) {
                // console.log('Pagination Links: ' + response.headers['link']);
                dispatch({
                    type: "PAGER_FINISHED",
                    payload: {
                        result: response.data,
                        links: response.headers['link'],
                        url: response.config.url,
                        currPage: newPage
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
                payload: { error: errorObj}
            });
        });
        return true;
    }

    const onNextClicked = (event) => {
        startPaging('next');
    }

    const onPrevClicked = (event) => {
        startPaging('prev');
    }

    const onFirstClicked = (event) => {
        startPaging('first');
    }

    const onLastClicked = (event) => {
        startPaging('last');
    }

    return <Row className="pagerRow">
        <Col>
        </Col>
        <Col className="totalResultCol">
            <span className="totalResultCurrent"> Current page: {currPage} of {lastPage} </span>
            {links.first ? <span className="pagerButton" onClick={onFirstClicked}>
                <ChevronBarLeft color="white" size={16}></ChevronBarLeft>
                <br />
                First
            </span> : ''}
            {links.prev ? <span className="pagerButton" onClick={onPrevClicked}>
                <ChevronLeft color="white" size={16}></ChevronLeft>
                <br />
                Prev
            </span> : ''}
            {links.next ? <span className="pagerButton" onClick={onNextClicked}>
                <ChevronRight color="white" size={16}></ChevronRight>
                <br />
                Next
            </span> : ''}
            {links.last ? <span className="pagerButton" onClick={onLastClicked}>
                <ChevronBarRight color="white" size={16}></ChevronBarRight>
                <br />
                Last
            </span> : ''}
        </Col>
    </Row>;

}

export default PagerControl;