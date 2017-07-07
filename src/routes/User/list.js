/**
 * @overview	List
 * @author		txBoy
 * @created		2017-03-21
 */

import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import fetcher from 'utils/fetcher';
import { md5, formatTimestamp, formatGender } from 'utils/util';

const columns = [{
    title: '用户名',
    dataIndex: 'username',
    render: (text, item) => <Link to = {'/user/detail/'+item.username}> {text} </Link>
}, {
    title: '性别',
    dataIndex: 'gender',
    render: (text, item) => formatGender(item.gender)
}, {
    title: '邮箱',
    dataIndex: 'email',
}, {
    title: '操作',
    dataIndex: 'uid',
    render: (text, item) => (
        <span>
          <a href="#">Action - {item.uid}</a>
          <span className="ant-divider" />
          <a href="#">Delete</a>
        </span>
    ),
}];

// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`,
            'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
    },
    getCheckboxProps: record => ({
        //disabled: record.name === 'Disabled User', // Column configuration not to be checked
    }),
};

class ListPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: {
                page: 1,
                size: 10,
                filter: {
                    searchValue: null
                }
            },
            userList: []
        }
    }
    componentDidMount() {
        /*fetcher.get('/getList', {data: {page: 1, size: 10}}).then(res => {
            console.log(res)
        })*/
        var params = Object.assign({}, this.state.query);
        params.filter = JSON.stringify(params.filter);

        fetcher.get('/api/user/getUsers', {data: params}).then(res => {
            console.log(res)
            if (res && res.code === 10000) {
                var userList = res.data.list || [];
                this.setState({
                    userList: userList
                })
            }
        })

        var timestamp = new Date().getTime();
        console.log(formatTimestamp(timestamp))
    }

    render() {
        return ( <Table rowKey="id" rowSelection={rowSelection} columns={columns} dataSource={this.state.userList} /> );
    }
}

export default ListPage;
