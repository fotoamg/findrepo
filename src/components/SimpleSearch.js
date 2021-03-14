import React from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Search, ArrowDownSquareFill } from 'react-bootstrap-icons';
import { useSelector } from "react-redux";
import { required, lengthMin, validateSimpleForm } from '../formValidators';
import { RenderField } from './formElements/RenderField';
import { RenderCheckBoxes } from './formElements/RenderCheckBoxes';

/**
 * Component holding the simple search form
 * @param {*} props 
 */
let SimpleSearch = (props) => {
    const { handleSubmit, reset, /*initialize, destroy,*/ submitting, pristine, valid, onReset, onTypeToggle } = props;
    const isLoading = useSelector(state => state.search.isLoading);

    const onCombinedReset = (...args) => {
        reset(...args);
        // destroy(...args);
        // initialize(...args);
        onReset(...args);
    }

    return (
        <form onSubmit={handleSubmit}>
            <Container fluid>
                <Row className="simpleSearchRow">
                    <Col xs lg={3} className="searchCell">
                        <label htmlFor="searchValue">Search by:*</label>
                        <Field name="searchValue" component={RenderField}
                            type="text" label="search by"
                            validate={[required, lengthMin]} />
                    </Col>
                    <Col xs lg={5}>
                        <Field name="filter" id="filter" component={RenderCheckBoxes} type="checkbox" />
                    </Col>
                    <Col xs lg className="searchButtonsOuter">
                        <Button className="searchButton" variant="secondary" size="sm" type="submit" disabled={submitting || !valid || isLoading}>
                            {isLoading ? 'Loading' : (<Search color="white" size={16}></Search>)}
                        </Button>
                        <Button className="searchButton" variant="secondary" size="sm" type="button" disabled={submitting || isLoading || pristine}
                            onClick={onCombinedReset}>Reset</Button>
                    </Col>
                    <Col xs lg className="modToggleOuter">
                        Advanced <span onClick={onTypeToggle}><ArrowDownSquareFill size={18}></ArrowDownSquareFill></span>
                    </Col>
                </Row>
            </Container>
        </form>
    )

}

// Decorate the form component
SimpleSearch = reduxForm({
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: false,
    // enableReinitialize: true, // !!!! enable if want to kill your PC !!! killed my Ryzen too!!
    form: 'simpleSearch', // a unique name for this form
    validate: validateSimpleForm
})(SimpleSearch);

SimpleSearch = connect(
    state => ({
        initialValues: state.form.simpleSearch
    }), (dispatch) => {
        return { change: change }
    }
)(SimpleSearch)

export default SimpleSearch;
