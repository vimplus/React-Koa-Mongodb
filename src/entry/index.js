/**
 * @overview	Main Entry
 * @author		txBoy
 * @created		2017-03-21
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, BrowserRouter, Route, Link} from 'react-router-dom';
import 'scss/global.scss';


import App from '../routes/index.js';


ReactDOM.render(
    <App/>,
    document.getElementById('App')
);
