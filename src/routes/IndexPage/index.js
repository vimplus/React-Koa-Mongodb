/**
 * @overview	IndexPage
 * @author		txBoy
 * @created		2017-03-21
 */

import { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from 'img/logo.svg';
import 'scss/global.scss';

class IndexPage extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }
    geToLogin() {
        location.href = '/login'
    }
    render() {
        return (
            <div className="App">
                <h3>首页内容</h3>
                <div className="App-logo"><img src={logo}/></div>
                <div style={{fontSize: 16, cursor: 'pointer',}} onClick={this.geToLogin.bind(this)}>登录</div>
            </div>
        );
    }
}

export default IndexPage;
