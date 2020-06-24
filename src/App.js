import React, { Suspense } from "react";
import YourTimezone from "./components/YourTimezone";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import "./styles.scss";
import TimezoneAreas from "./components/TimezoneAreas";
import ErrorBoundary from './components/ErrorBoundary';

const TimezoneLocations = React.lazy(() => import('./components/TimezoneLocations'));

export default () => {
  return (
    <div className="App">
      <ErrorBoundary>
        <Router>
          <div className="nav">
            <div className="row">
              <Link to="/">Home</Link>
            </div>
          </div>

          <Switch>
            <Route path="/:area/:location">
              <Suspense fallback={<div>Loading...</div>}>
                <TimezoneLocations />
              </Suspense>
            </Route>
            <Route path="/">
              <YourTimezone />
              <TimezoneAreas />
            </Route>
          </Switch>
        </Router>
      </ErrorBoundary>
    </div>
  );
}
