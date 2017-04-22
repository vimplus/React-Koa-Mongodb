/**
 * @overview	Main Entry
 * @author		txBoy
 * @created		2017-03-21
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, BrowserRouter, Route, Link} from 'react-router-dom';
import 'scss/global.scss';

import { AppContainer } from 'react-hot-loader';

import App from '../routes/index.js';


const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component/>
        </AppContainer>,
        document.getElementById('App')
    );
};


render(App);

// Hot Module Replacement API
if (module && module.hot) {
    module.hot.accept('../routes/index.js', () => {
        render(App)
    });
}
