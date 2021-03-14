
const required = (value) => value ? undefined : 'Required!'

const lengthMin = (value) =>
    value && value.length > 2 ? undefined : `Must be at least 3 char.`

const number = value =>
    value && isNaN(Number(value)) ? 'Must be a number' : undefined

/**
 * Validates the simpel search form
 * @param {*} values 
 */
const validateSimpleForm = values => {
    const errors = {}
    // console.log('Simple form validate....', values);
    if (!values || !(values.name || values.description || values.readme)) {
        // console.log('Checkbox group invalid! ');
        errors.filter = 'Select at least one of the filters!';
    }
    const searchReq = required(values.searchValue);
    if (searchReq) {
        errors.searchValue = searchReq;
    } else {
        const searchMin = lengthMin(values.searchValue);
        if (searchMin) {
            errors.searchValue = searchMin;
        }
    }
    return errors
}

/**
 * Languages can be shorter than 3 character like 'C'...
 * @param {*} values 
 * @param {*} key 
 * @param {*} errors 
 * @param {*} oneFilled 
 */
const validateLangTextInput = (values, key, errors, oneFilled) => {
    if (values[key] && (values[key] !== "")) {
        oneFilled = true;
    }
    return oneFilled;
}

/**
 * Validates number text input
 * @param {*} values 
 * @param {*} key 
 * @param {*} errors 
 */
const validateNumberInput = (values, key, errors) => {
    let numberFilled = false;
    if (values[key] && (values[key] !== "")) {
        const errorNum = number(values[key]);
        if (errorNum) {
            errors[key] = errorNum;
        } else {
            numberFilled = true;
        }
    }
    return numberFilled;
}

/**
 * Validates number imput which has a minvalue in an other form element
 * @param {*} values 
 * @param {*} key 
 * @param {*} errors 
 * @param {*} minKey min value form element key
 */
const validateMaxNumberInput = (values, key, errors, minKey) => {
    let maxFilled = false;
    if ( values[key] && (values[key] !== "")) {
        // console.log('Max filled ' + key, values[key]);
        const errorNum = number(values[key]);
        if (errorNum) {
            errors[key] = errorNum;
        } else {
            const minNum = Number.parseInt(values[minKey], 10);
            const maxNum = Number.parseInt(values[key], 10);
            if (!(minNum < maxNum)) {
                errors[minKey] = 'Max should be greater number than Min'
            } else {
                maxFilled = true;
            }
        } 
    } else {
        errors[minKey] = 'If Min filled, Max also needs to be filled';
    }
    return maxFilled;
}

/**
 * Validates a normal text input
 * @param {*} values 
 * @param {*} key 
 * @param {*} errors 
 * @param {*} oneFilled 
 */
const validateTextInput = (values, key, errors, oneFilled) => {
    if (values[key] && (values[key] !== "")) {
        const errorMin = lengthMin(values[key]);
        if (errorMin) {
            errors[key] = errorMin;
        } else {
            oneFilled = true;
        }
    }
    return oneFilled;
}

/**
 * Validates text input and if nothing filled yet writes error here,
 * as there is no way to show cross input errors, only field level errors.
 * @param {*} values 
 * @param {*} key 
 * @param {*} errors 
 * @param {*} oneFilled 
 */
const validateLastTextInput = (values, key, errors, oneFilled) => {
    const isFilled = validateTextInput(values, key, errors, oneFilled);
    if (!isFilled && !errors[key]) {
        errors[key] = 'Fill at least one search option!'
    }
    return isFilled;
}

/**
 * Validates the advanced search form
 * @param {*} values 
 */
const validateAdvancedForm = values => {
    const errors = {}
    // console.log('Advanced validate....', values);
    let oneFilled = false;
    let starsNumberFilled = false;
    let sizeNumberFilled = false;

    if (values.searchValue && (values.searchValue !== "")) {
        const searchMin = lengthMin(values.searchValue);
        if (searchMin) {
            errors.searchValue = searchMin
        } else {
            if (!values || !(values.name || values.description || values.readme)) {
                // console.log('Checkbox group invalid! ');
                errors.filter = 'Select at least one of the filters!';
            } else {
                oneFilled = true;
            }
        }
    }

    oneFilled =  oneFilled || validateTextInput(values, 'user', errors, oneFilled);
    oneFilled =  oneFilled || validateLangTextInput(values, 'lang', errors, oneFilled);
    oneFilled =  oneFilled || validateTextInput(values, 'topic', errors, oneFilled);
    starsNumberFilled = validateNumberInput(values, 'starsNumber', errors);
    oneFilled =  oneFilled || starsNumberFilled;
    if (values.starCheck === 'between' && starsNumberFilled)  {
        const starsMaxFilled = validateMaxNumberInput(values, 'starsMax', errors, 'starsNumber');
        oneFilled = oneFilled || starsMaxFilled;
    }
    sizeNumberFilled = validateNumberInput(values, 'sizeNumber', errors);
    oneFilled =  oneFilled || sizeNumberFilled;
    if (values.sizeCheck === 'between' && sizeNumberFilled)  {
        const sizeMaxFilled = validateMaxNumberInput(values, 'sizeMax', errors, 'sizeNumber');
        oneFilled = oneFilled || sizeMaxFilled;
    }
    validateLastTextInput(values, 'org', errors, oneFilled);
    // console.log(`starsNumberFilled:${starsNumberFilled} sizeNumberFilled:${sizeNumberFilled} Errors: `, errors);
    return errors
}

export { required, lengthMin, number, validateSimpleForm, validateAdvancedForm };
