import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Spinner, NotFound } from './components';
import { Home, AuthPage, ProductPage } from './pages';

const browserHistory = createBrowserHistory();

function App() {
  return (
    <BrowserRouter history={browserHistory}>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/user" component={AuthPage} />
          <Route path="/product" component={ProductPage} />
          <Route path="/" exact component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
