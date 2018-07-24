import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './styles/reset';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
