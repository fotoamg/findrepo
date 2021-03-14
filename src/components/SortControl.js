import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { RadioGroup, Radio } from 'react-radio-group'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

/**
 * Component for the Sort/Order controls
 * @param {*} props 
 */
function SortControl(props) {
    const totalResult = useSelector(state => state.search.total);
    const orderBy = useSelector(state => state.search.orderBy);
    const sortBy = useSelector(state => state.search.sortBy);
    const url = useSelector(state => state.search.url);
    const dispatch = useDispatch();

    const sortChanged = (val) => {
        // console.log('sortByChg', val);
        dispatch({
            type: "SORTORDER_START",
            payload: { sortBy: val }
        })
        const newUrl = url.replace('&sort='+sortBy, '&sort='+val);
        axios.get(newUrl).then(response => {
            // console.log('SORT result', response);
            if (response.status === 200) {
                // console.log('Pagination Links: ' + response.headers['link']);
                dispatch({
                    type: "SORTORDER_FINISHED",
                    payload: {
                        result: response.data,
                        links: response.headers['link'],
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
                payload: { error: errorObj }
            });
        });
        return true;
    };

    const orderChanged = (val) => {
        // console.log('orderByChg', val);
        dispatch({
            type: "SORTORDER_START",
            payload: { orderBy: val }
        })
        const newUrl = url.replace('&order='+orderBy, '&order='+val);
        axios.get(newUrl).then(response => {
            // console.log('ORDER result', response);
            if (response.status === 200) {
                // console.log('Pagination Links: ' + response.headers['link']);
                dispatch({
                    type: "SORTORDER_FINISHED",
                    payload: {
                        result: response.data,
                        links: response.headers['link'],
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
                payload: { error: errorObj }
            });
        });
        return true;
    };

    return <Row className="sortOrderRow">
        <Col className="sortByCol">
            Sort by:
            <RadioGroup name="sortBy" selectedValue={sortBy} onChange={sortChanged}>
                <Radio id="stars" name="stars" value="stars" />
                <label htmlFor="stars">stars </label>
                <Radio id="forks" name="forks" value="forks" />
                <label htmlFor="forks">forks </label>
            </RadioGroup>
        </Col>
        <Col className="orderByCol">
            Order by:
            <RadioGroup name="orderBy" selectedValue={orderBy} onChange={orderChanged}>
                <Radio id="desc" name="desc" value="desc" />
                <label htmlFor="desc">desc </label>
                <Radio id="asc" name="asc" value="asc" />
                <label htmlFor="asc">asc </label>
            </RadioGroup>
        </Col>
        <Col className="totalResultCol">
            Total results: {totalResult}
        </Col>
    </Row>;

}

export default SortControl;