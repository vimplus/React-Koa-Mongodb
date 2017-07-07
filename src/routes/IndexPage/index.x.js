/**
 * @overview	IndexPage
 * @author		txBoy
 * @created		2017-03-21
 */

import { Component } from 'react';
import { Link } from 'react-router-dom';

import fetcher from 'utils/fetcher';
import storage from 'utils/storage';
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
    onLogout() {
        fetcher.get('/api/user/logout', function (err, res) {
            console.log(res)
        })
        location.href = '/login'
        storage.setCookie('userInfo', '');
    }
    render() {
        return (
            <div className="App">
                <h3>首页内容</h3>
                <div className="App-logo"><img src={logo}/></div>
                <div style={{fontSize: 16, cursor: 'pointer',}} onClick={this.onLogout.bind(this)}>退出</div>
            </div>
        );
    }
}

export default IndexPage;
