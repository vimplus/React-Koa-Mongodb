/**
 * @overview	IndexPage
 * @author		txBoy
 * @created		2017-03-21
 */

import React, { Component } from 'react';
import { BrowserRouter as Router, Link} from 'react-router-dom';

import logo from 'img/logo.svg';
import 'scss/global.scss';

class IndexPage extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }
    render() {
        return (
            <div className="App">
                <h3>首页内容</h3>
                <div className="App-logo"><img src={logo}/></div>
            </div>
        );
    }
}

export default IndexPage;
