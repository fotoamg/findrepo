import React from 'react';

/**
 * Radio field for redux form
 * @param {*} param0 
 */
export const RenderRadio = ({ id, input, label, type, meta: { touched, error, warning } }) => (
    <span>
        <input {...input} id={id} type={type} />
        <label htmlFor={id}>{label}</label>
    </span>
)