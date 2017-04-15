/**
 * @overview	Detail
 * @author		txBoy
 * @created		2017-03-21
 */

import { Component } from 'react';

class DetailPage extends Component {
    render() {
        return (
            <div className="detail">用户姓名: {this.props.match.params.name}</div>
        );
    }
}

export default DetailPage;
