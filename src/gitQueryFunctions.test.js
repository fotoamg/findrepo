import { simpleSearchQuery, advancedSearchQuery } from './gitQueryFunctions'

describe("simpleSearchQuery function", () => {

    test("it should generate the right query string from form data with name checked ", () => {
        const form = {
            searchValue: 'cica',
            name: true
        };
        const expectedOutputString = 'cica in:name'
        expect(simpleSearchQuery(form)).toEqual(expectedOutputString);
    });

    test("it should generate the right query string from form data with name and readme checked ", () => {
        const form = {
            searchValue: 'cica',
            name: true,
            readme: true
        };
        const expectedOutputString = 'cica in:name in:readme'
        expect(simpleSearchQuery(form)).toEqual(expectedOutputString);
    });

    test("it should generate the right query string from form data with name, readme and desc. checked ", () => {
        const form = {
            searchValue: 'cica',
            name: true,
            readme: true,
            description: true
        };
        const expectedOutputString = 'cica in:name in:description in:readme'
        expect(simpleSearchQuery(form)).toEqual(expectedOutputString);
    });

});


describe("advancedSearchQuery function on single filter", () => {

    test("it should generate the right query string searching on language", () => {
        const form = {
            lang: 'c'
        };
        const expectedOutputString = 'language:c'
        expect(advancedSearchQuery(form)).toEqual(expectedOutputString);
    });

    test("it should generate the right query string searching on topic", () => {
        const form = {
            topic: 'redux'
        };
        const expectedOutputString = 'topic:redux'
        expect(advancedSearchQuery(form)).toEqual(expectedOutputString);
    });

    test("it should generate the right query string searching on organization", () => {
        const form = {
            org: 'ssi'
        };
        const expectedOutputString = 'org:ssi'
        expect(advancedSearchQuery(form)).toEqual(expectedOutputString);
    });

    test("it should generate the right query string searching on user", () => {
        const form = {
            user: 'fotoamg'
        };
        const expectedOutputString = 'user:fotoamg'
        expect(advancedSearchQuery(form)).toEqual(expectedOutputString);
    });

    test("it should generate the right query string searching on equal stars", () => {
        const form = {
            starCheck: 'equal',
            starsNumber: '11111'
        };
        const expectedOutputString = 'stars:11111'
        expect(advancedSearchQuery(form)).toEqual(expectedOutputString);
    });

    test("it should generate the right query string searching on equal stars", () => {
        const form = {
            starCheck: 'equal',
            starsNumber: '11111'
        };
        const expectedOutputString = 'stars:11111'
        expect(advancedSearchQuery(form)).toEqual(expectedOutputString);
    });

    test("it should generate the right query string searching on less than stars", () => {
        const form = {
            starCheck: 'less',
            starsNumber: '11111'
        };
        const expectedOutputString = 'stars:<11111'
        expect(advancedSearchQuery(form)).toEqual(expectedOutputString);
    });

    test("it should generate the right query string searching on greater than stars", () => {
        const form = {
            starCheck: 'greater',
            starsNumber: '11111'
        };
        const expectedOutputString = 'stars:>11111'
        expect(advancedSearchQuery(form)).toEqual(expectedOutputString);
    });

});

describe("advancedSearchQuery function on mixed filter", () => {

    test("it should generate the right query string searching on mixed filter", () => {
        const form = {
            lang: 'javascript',
            starCheck: 'greater',
            starsNumber: '11111',
            topic: 'redux'
        };
        const expectedOutputString = 'language:javascript topic:redux stars:>11111'
        expect(advancedSearchQuery(form)).toEqual(expectedOutputString);
    });

});


describe("advancedSearchQuery function on size filter", () => {

    test("it should generate the right query string searching on mixed filter", () => {
        const form = {
            sizeCheck: 'greater',
            sizeNumber: '100000000'
        };
        const expectedOutputString = 'size:>100000000'
        expect(advancedSearchQuery(form)).toEqual(expectedOutputString);
    });

});

