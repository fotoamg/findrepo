import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from "react-redux";
import RepoRow from './RepoRow';
import SortControl from './SortControl';
import PagerControl from './PagerControl';

/**
 * Component for result panel.
 * 
 * Reusable to also display data from history
 * as gets the data from props.repos, not from state directly.
 * 
 * If props.includeControls property is true it show the controls.
 * 
 * @param {*} props
 */
function ResultPanel(props) {
    const isLoading = useSelector(state => state.search.isLoading);

    const renderItems = () => (!props.repos || props.repos.length === 0) ? (
        <div className="emptyResult">
            Search results are coming here
        </div>
    ) : <Container fluid className="repoList">
            {props.includeControls ? <SortControl></SortControl> : ''}
            {props.repos.map((repo, repoIdx) => (
                <RepoRow repo={repo} key={repoIdx} keyProp={repoIdx}></RepoRow>
            ))}
            {props.includeControls ? <PagerControl></PagerControl> : ''}
        </Container>;

    const spinningLoader = <div className="spinningLoader"></div>

    return <Container fluid>
        <Row>
            <Col className="resultCol justify-content-md-center">
                {isLoading ? spinningLoader : renderItems()}
            </Col>
        </Row>
    </Container>
}

export default (ResultPanel);