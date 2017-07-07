/**
 * @overview	IndexPage
 * @author		txBoy
 * @created		2017-03-21
 */

import { Component } from 'react';

// import logo from 'img/logo.svg';
import 'scss/global.scss';

class IndexPage extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }
    componentDidMount() {

    }
    render() {
        return (
            <div className="index-content">
                <p className="welcome-text">欢迎使用！</p>
            </div>
        );
    }
}

export default IndexPage;
