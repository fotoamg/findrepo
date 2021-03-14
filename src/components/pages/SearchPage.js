import { connect } from "react-redux";
import SearchPanel from '../SearchPanel';
import ResultPanel from '../ResultPanel';
import { Container, Row, Col, Alert } from 'react-bootstrap';

/**
 * Search page component holding search panel,
 * result panel and some error message containers.
 * 
 * Paging size can be configured here for search panel.
 * @param {*} props 
 */
function SearchPage(props) {
    return <Container className="container" fluid>
        <Row>
            <Col>
                <SearchPanel pageSize={8}></SearchPanel>
            </Col>
        </Row>
        <Row>
            <Col>
                <ResultPanel repos={props.repos || []} includeControls={true}></ResultPanel>
            </Col>
        </Row>
        {props.isError ? (<Row>
            <Col>
                <Alert variant="danger">
                    {props.isError.errorType} <strong>{props.isError.message}</strong><br />
                </Alert>
            </Col>
        </Row>) : ('')}
    </Container>;
}


const mapStateToProps = (state) => {
    return {
        repos: state.search.repos,
        isError: state.search.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);

