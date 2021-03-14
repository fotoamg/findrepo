import { required, lengthMin, number, validateSimpleForm, validateAdvancedForm } from './formValidators'

describe("required function", () => {

    test("it should return error for empty required value", () => {
        expect(required('')).not.toBeUndefined();
    });

    test("it should return no error fornon empty required value", () => {
        expect(required('foo')).toBeUndefined();
    });

});


describe("lengthMin function", () => {

    test("it should return error for 1 char value", () => {
        expect(lengthMin('a')).not.toBeUndefined();
    });
    
    test("it should return error for 2 char value", () => {
        expect(lengthMin('ab')).not.toBeUndefined();
    });

    test("it should not return error for 3 char value", () => {
        expect(lengthMin('abc')).toBeUndefined();
    });
    
    test("it should not return error for longer than 3 char value", () => {
        expect(lengthMin('abcdefg')).toBeUndefined();
    });

});


describe("number function", () => {

    test("it should return error for not number value", () => {
        expect(number('a')).not.toBeUndefined();
    });
    
    test("it should not return error for number value", () => {
        expect(number('112123')).toBeUndefined();
    });

});
