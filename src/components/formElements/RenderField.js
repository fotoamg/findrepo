import React from 'react';

/**
 * General input field for redux form
 * @param {*} param0 
 */
export const RenderField = ({ className, input, label, type, meta: { touched, error, warning } }) => (
    <span className={className}>
        <input {...input} placeholder={label} type={type} />
        <div className="inputErrorHolder">
            {touched && ((error && <span className="errorMsg">{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </span>
)