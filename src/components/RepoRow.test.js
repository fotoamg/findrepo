import React from 'react';
import RepoRow from './RepoRow';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

const LangCell = (props) => {
    React.useEffect(() => {
        // console.log('Props for Mock LangCell: ', props);
    });
    return (
        <div data-testid="langCell">
            {props.language} - {props.langUrl}
        </div>
    );
};

/**
 * Need to be in a separate function to avoid 
 * not allowed to reference any out-of-scope variables error.
 */
jest.mock("./LangCell", () => LangCell);

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

const mockRepo = {
    name: '_repoName_',
    full_name: '_repoFullName_',
    stars: '_stars_',
    watchers: '_watchers_',
    description: '_this is a sample description_',
    created_at: 'CREATED_12_TOOLONG',
    updated_at: 'UPDATED_12_TOOLONG',
    language: '_theLang_',
    languages_url: '_langUrl_',
    issues: '_issues_',
    owner: '_owner_'
}


it("renders repo object data from props and adds language props to sub component", () => {
    act(() => {
        render(<RepoRow repo={mockRepo} keyProp="rowKey" />, container);
    });

    expect(container.textContent).toMatch(mockRepo.name);
    expect(container.textContent).toMatch(mockRepo.full_name);
    expect(container.textContent).toMatch(mockRepo.stars);
    expect(container.textContent).toMatch(mockRepo.watchers);
    expect(container.textContent).toMatch(mockRepo.description);
    expect(container.textContent).toMatch(mockRepo.language);
    expect(container.textContent).toMatch(mockRepo.languages_url);
    expect(container.textContent).toMatch(mockRepo.owner);
    expect(container.textContent).toMatch(mockRepo.language);
    expect(container.textContent).toMatch(mockRepo.created_at.substring(0, 10));
    expect(container.textContent).toMatch(mockRepo.updated_at.substring(0, 10));
    expect(container.textContent).toMatch(mockRepo.issues);
    expect(container.textContent).not.toMatch('TOOLONG');
});