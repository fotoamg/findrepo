import React, { useEffect } from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import StickyNavbar from './StickyNavbar';
import SearchPage from './pages/SearchPage';
import HistoryPage from './pages/HistoryPage';


/**
 * Main component holding the router and navbar
 * @param {*} props 
 */
function App(props) {
  useEffect(() => {
    document.title = "Git Repo Search App"
 }, []);

  return (
    <Router basename="/findrepo">
      <StickyNavbar></StickyNavbar>
      <div className="mainContainer">
        <Switch>
          <Route exact path="/">
              <Redirect to="/search" />
          </Route>
          <Route path="/history" component={HistoryPage} />
          <Route path="/search" component={SearchPage} />
        </Switch>
      </div>
    </Router>
  )
};

export default App;
