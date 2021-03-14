import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";

/**
 * Component to show the language or fetch languages from API.
 * If fetched it should come from the loader state cache.
 * @param {*} props 
 */
function LangCell(props) {
    const { language, langUrl } = props;
    const langList = useSelector(state => state.loader[langUrl]);
    const dispatch = useDispatch();
    /**
     * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     * TODO: set it back to false if set to true !!!!
     * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     */
    // eslint-disable-next-line
    const [isFetchStarted, setFetchStarted] = useState(true);

    useEffect(() => {
        if (!langList && !isFetchStarted) {
            setFetchStarted(true);
            // console.log('Start fetching: ' + langUrl);
            axios.get(langUrl).then(response => {
                // console.log('langUrl result', response);
                if (response.status === 200) {
                    dispatch({
                        type: "URL_FETCHED",
                        payload: {
                            data: response.data,
                            url: langUrl
                        }
                    })
                } else {
                    // console.log('Error lang fetch!');
                    // setTimeout(() =>{setFetchStarted(false);}, 1500+(Math.random() * (response.status) +1));
                }
            }).catch(function (errorObj) {
                // console.log('Error in lang fetch', errorObj);
                // setTimeout(() =>{setFetchStarted(false);}, 1000+(Math.random() * (500) +1));
            });
        }
    }, [ dispatch, isFetchStarted, langList, langUrl])


    return <Col className="repoColLangs" xs={1}>
        {!langList ? <Button variant="secondary" size="sm" disabled={true}>{language}</Button> : ''} 
        {(langList || []).map((lang, idx) => (
            <Button variant="secondary" key={idx} size="sm" disabled={true}>{lang}</Button>
        ))}
    </Col>

}

export default LangCell;