import React from 'react';
import { Field } from 'redux-form';

/**
 * Custom checkbox group holder component for filter options
 * @param {*} param0 
 */
export const RenderCheckBoxes = ({ input, label, type, meta: { touched, error, warning, submitting } }) => {

    return <div>
        <div className="filterCell">
            <span> In: </span>
            <span className="filterCheckItem">
                <Field name="name" id="name" component="input" type="checkbox" />
                <label htmlFor="name">name </label>
            </span>

            <span className="filterCheckItem">
                <Field name="description" id="description" component="input" type="checkbox" />
                <label htmlFor="description">description </label>
            </span>

            <span className="filterCheckItem">
                <Field name="readme" id="readme" component="input" type="checkbox" />
                <label htmlFor="readme">readme </label>
            </span>
        </div>
        <div className="filterCellError">
            {((error && <span className="errorMsg">{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
}