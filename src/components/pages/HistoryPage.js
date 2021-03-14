import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from 'react-bootstrap';
import ResultPanel from '../ResultPanel';

/**
 * History page coponent
 * @param {*} props 
 */
const HistoryPage = (props) => {
    const history = useSelector(state => state.search.searchHistory);
    const selectedItems = useSelector(state => state.history.items);
    const selectedIindex = useSelector(state => state.history.selectedIndex);
    const dispatch = useDispatch();

    return <div>
        <Container className="historyContainer" fluid>
            <Row className="historyContainerRow">
                <Col className="historyLeft" xs={2}>
                    <div className="historyTotalReq">
                        Total requests: {history.length}
                    </div>
                    {history.map((item, mapIdx) => (
                        <span key={mapIdx} className={mapIdx === selectedIindex ? 'historyItemSelected' : 'historyItem'}
                            onClick={(event) => {
                                // // console.log('click', event);
                                dispatch({
                                    type: 'HISTORY_SELECT',
                                    payload: {
                                        index: mapIdx,
                                        items: item.repos
                                    }
                                });
                                return true;
                            }} >
                            <textarea rows={5} maxLength={900} disabled={false} readOnly
                                value={item.queryString}></textarea>
                        </span>
                    ))}
                    <br />
                </Col>
                <Col className="historyRight" xs={10}>
                    <ResultPanel repos={selectedItems || []} includeControls={false}></ResultPanel>
                </Col>
            </Row>
        </Container>
    </div>;
}

export default HistoryPage;

