import React from 'react';
import ResultPanel from './ResultPanel';
import { act } from "react-dom/test-utils";
import { render, fireEvent, screen } from '../test-utils'

const RepoRow = (props) => {
    return (
        <div data-testid="repoRowCell">
            REPO_ROW
        </div>
    );
};

const SortControl = (props) => {
    return (
        <div data-testid="sortControl">
            SORT_CONTROL
        </div>
    );
};

const PagerControl = (props) => {
    return (
        <div data-testid="pagerControl">
            PAGER_CONTROL
        </div>
    );
};

jest.mock("./RepoRow", () => RepoRow);
jest.mock("./SortControl", () => SortControl);
jest.mock("./PagerControl", () => PagerControl);

const mockRepos = [{
    name: '_mockRepo1_'

}]

it("Shows controls when not loading ", () => {
    act(() => {
        render(<ResultPanel repos={mockRepos} includeControls={true} />,  { initialState: { search: { isLoading: false } } });
    });

    //screen.debug();
    //expect(screen.getByText(/SORT_CONTROL/i)).toBeInTheDocument()
    //expect(screen.getByText(/PAGER_CONTROL/i)).toBeInTheDocument()
    expect(screen.queryByText(/SORT_CONTROL/i)).toBeTruthy()
    expect(screen.queryByText(/PAGER_CONTROL/i)).toBeTruthy();
});

it("Does NOT show controls when loading ", () => {
    act(() => {
        render(<ResultPanel repos={mockRepos} includeControls={true} />,  { initialState: { search: { isLoading: true } } });
    });

    //screen.debug();
    expect(screen.queryByText(/SORT_CONTROL/i)).toBeNull();
    expect(screen.queryByText(/PAGER_CONTROL/i)).toBeNull();
});

it("Does NOT show controls when NOT loading but controls are disabled", () => {
    act(() => {
        render(<ResultPanel repos={mockRepos} includeControls={false} />,  { initialState: { search: { isLoading: false } } });
    });

    //screen.debug();
    expect(screen.queryByText(/SORT_CONTROL/i)).toBeNull();
    expect(screen.queryByText(/PAGER_CONTROL/i)).toBeNull();
});

it("Shows REPO row if passed data and not loading", () => {
    act(() => {
        render(<ResultPanel repos={mockRepos} includeControls={false} />,  { initialState: { search: { isLoading: false } } });
    });

    //screen.debug();
    expect(screen.queryByText(/REPO_ROW/i)).not.toBeNull();
});

it("Shows empty message if passed data empty and not loading", () => {
    act(() => {
        render(<ResultPanel repos={ [] } includeControls={false} />,  { initialState: { search: { isLoading: false } } });
    });

    //screen.debug();
    expect(screen.queryByText(/REPO_ROW/i)).toBeNull();
    expect(screen.queryByText(/Search results are coming here/i)).toBeTruthy();
});
