import React from 'react';
import { Field, reduxForm, change, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Search, ArrowUpSquareFill, StarFill, ArrowDownUp } from 'react-bootstrap-icons';
import { useSelector } from "react-redux";
import { validateAdvancedForm } from '../formValidators';
import { RenderField } from './formElements/RenderField';
import { RenderCheckBoxes } from './formElements/RenderCheckBoxes';
import { RenderRadio } from './formElements/RenderRadio';

/**
 * Component holding the advanced search form
 * @param {*} props 
 */
let AdvancedSearch = (props) => {
    const { handleSubmit, reset, submitting, pristine, valid, onReset, onTypeToggle, starsCheckedVal, sizeCheckedVal } = props;
    const isLoading = useSelector(state => state.search.isLoading);

    const onCombinedReset = (...args) => {
        reset(...args);
        onReset(...args);
    }

    return (
        <form onSubmit={handleSubmit}>
            <Container fluid>
                <Row className="simpleSearchRow">
                    <Col xs lg={4} className="searchCell">
                        <label htmlFor="searchValue">Search by: </label>
                        <Field name="searchValue" component={RenderField}
                            type="text" label="search by" />
                    </Col>
                    <Col xs lg={6}>
                        <Field name="filter" id="filter" component={RenderCheckBoxes} type="checkbox" />
                    </Col>
                    <Col className="modToggleOuter">
                        Advanced <span onClick={onTypeToggle}><ArrowUpSquareFill size={18}></ArrowUpSquareFill></span>
                    </Col>
                </Row>
                <Row className="simpleSearchRow">
                    <Col xs lg={4} className="searchCell">
                        <label htmlFor="user">User name: </label>
                        <Field name="user" component={RenderField}
                            type="text" label="user name" />
                    </Col>
                    <Col xs lg={6} className="langTopicOuter">
                        <span className="langTopic">
                            <label htmlFor="lang">Language: </label>
                            <Field name="lang" component={RenderField}
                                type="text" label="language" />
                            <label htmlFor="topic">Topic: </label>
                            <Field name="topic" component={RenderField}
                                type="text" label="topic" />
                        </span>
                    </Col>
                    <Col className="searchButtonsOuter">
                        <Button className="searchButton" variant="secondary" size="sm" type="submit" disabled={submitting || !valid || isLoading}>
                            {isLoading ? 'Loading' : (<Search color="white" size={16}></Search>)}
                        </Button>
                        <Button className="searchButton" variant="secondary" size="sm" type="button" disabled={submitting || isLoading || pristine}
                            onClick={onCombinedReset}>Reset</Button>
                    </Col>
                </Row>
                <Row className="simpleSearchRow">
                    <Col xs={4} className="searchCell">
                        <label htmlFor="org">Organization: </label>
                        <Field name="org" component={RenderField}
                            type="text" label="organization" />
                    </Col>
                    <Col>
                    </Col>
                    <Col>
                    
                    </Col>
                </Row>
                <Row>
                    <Col xs lg={6} className="starsFilterOuter">
                        <span className="starsFilter">
                            <StarFill color="yellow" size={12}></StarFill>
                            <span className="starsMainLabel">Stars</span>
                            <Field
                                name="starCheck"
                                component={RenderRadio}
                                value="equal"
                                id="starCheckEqual"
                                type="radio"
                                label="equal"
                            >
                            </Field>
                            <Field
                                name="starCheck"
                                component={RenderRadio}
                                value="greater"
                                id="starCheckgreat"
                                type="radio"
                                label="greater than"
                            >
                            </Field>
                            <Field
                                name="starCheck"
                                component={RenderRadio}
                                value="less"
                                id="starCheckLess"
                                type="radio"
                                label="less than"
                            >
                            </Field>
                            <Field
                                name="starCheck"
                                component={RenderRadio}
                                value="between"
                                id="starCheckBetween"
                                type="radio"
                                label="between"
                            >
                            </Field>
                            <span className="starsFilterNumberRow">
                                <label htmlFor="starsNumber">{starsCheckedVal === 'between' ? 'Min: ' : 'Number: '} </label>
                                <Field name="starsNumber" component={RenderField}
                                    type="text" label="number" />
                                <label className={starsCheckedVal === 'between' ? '' : 'hiddenContent'}
                                    htmlFor="starsMax">
                                    Max:
                                </label>
                                <Field className={starsCheckedVal === 'between' ? '' : 'hiddenContent'}
                                    name="starsMax" component={RenderField}
                                    type="text" label="number" />
                            </span>
                        </span>
                    </Col>
                    <Col xs lg={6} className="sizeFilterOuter">
                        <span className="sizeFilter">
                            <ArrowDownUp color="lightblue" size={12}></ArrowDownUp>
                            <span className="sizeMainLabel">Size</span>
                            <Field
                                name="sizeCheck"
                                component={RenderRadio}
                                value="equal"
                                id="sizeCheckEqual"
                                type="radio"
                                label="equal"
                            >
                            </Field>
                            <Field
                                name="sizeCheck"
                                component={RenderRadio}
                                value="greater"
                                id="sizeCheckgreat"
                                type="radio"
                                label="greater than"
                            >
                            </Field>
                            <Field
                                name="sizeCheck"
                                component={RenderRadio}
                                value="less"
                                id="sizeCheckLess"
                                type="radio"
                                label="less than"
                            >
                            </Field>
                            <Field
                                name="sizeCheck"
                                component={RenderRadio}
                                value="between"
                                id="sizeCheckBetween"
                                type="radio"
                                label="between"
                            >
                            </Field>
                            <span className="sizeFilterNumberRow">
                                <label htmlFor="sizeNumber">{sizeCheckedVal === 'between' ? 'Min: ' : 'Number: '} </label>
                                <Field name="sizeNumber" component={RenderField}
                                    type="text" label="number" />
                                <label className={sizeCheckedVal === 'between' ? '' : 'hiddenContent'}
                                    htmlFor="sizeMax">
                                    Max:
                                </label>
                                <Field className={sizeCheckedVal === 'between' ? '' : 'hiddenContent'}
                                    name="sizeMax" component={RenderField}
                                    type="text" label="number" />
                            </span>
                        </span>
                    </Col>

                    <Col>
                        
                    </Col>
                </Row>
            </Container>
        </form>
    )

}

// Decorate the form component
AdvancedSearch = reduxForm({
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: false,
    // enableReinitialize: true, // enable if want to kill your PC !!!
    form: 'simpleSearch', // a unique name for this form
    validate: validateAdvancedForm
})(AdvancedSearch);

const selector = formValueSelector('simpleSearch') // <-- same as form name
AdvancedSearch = connect(
    state => {
        const starCheckValFromState = selector(state, 'starCheck');
        const sizeCheckValFromState = selector(state, 'sizeCheck');
        return {
            initialValues: state.form.simpleSearch,
            starsCheckedVal: starCheckValFromState,
            sizeCheckedVal: sizeCheckValFromState,
        }
    }, (dispatch) => {
        return { change: change }
    }
)(AdvancedSearch)

export default AdvancedSearch;
