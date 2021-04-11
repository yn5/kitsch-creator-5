import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ResetStyles from './styles/reset';
import GlobalStyles from './styles/global';
import BobrossSketchView from './components/views/bobross-sketch-view';
import HomeView from './components/views/home-view';

function App() {
  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route component={HomeView} path="/" exact />
          <Route component={BobrossSketchView} path="/sketches/bobross" exact />
        </Switch>
      </BrowserRouter>
      <ResetStyles />
      <GlobalStyles />
    </>
  );
}

export default App;
