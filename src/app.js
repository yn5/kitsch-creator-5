import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalStyle from './styles/reset';
import BobrossSketchView from './components/views/bobross-sketch-view';
import HomeView from './components/views/home-view';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route
            component={HomeView}
            path="/"
            exact
          />
          <Route
            component={BobrossSketchView}
            path="/sketches/bobross"
            exact
          />
        </Switch>
      </BrowserRouter>
      <GlobalStyle />
    </>
  );
}

export default App;
