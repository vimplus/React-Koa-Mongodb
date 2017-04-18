/**
 * @overview	List
 * @author		txBoy
 * @created		2017-03-21
 */

import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import fetcher from 'utils/fetcher';
import { md5, formatTimestamp } from 'utils/util';

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    render: (text, item) => <Link to = {'/user/detail/'+item.name}> {text} </Link>,
}, {
    title: 'Age',
    dataIndex: 'age',
}, {
    title: 'Address',
    dataIndex: 'address',
    render: (text, item) => (
        <span>
          <a href="#">Action - {item.name}</a>
          <span className="ant-divider" />
          <a href="#">Delete</a>
        </span>
    ),
}];
const data = [{
    key: '1',
    name: 'txBoy',
    age: 25,
    address: 'New York No. 1 Lake Park',
}, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
}, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
}, {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
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
    componentDidMount() {
        fetcher.get('/getList', {data: {page: 1, size: 10}}).then(res => {
            console.log(res)
        })
        fetcher.post('/info', {data: {username: 'txBoy'}}).then(res => {
            console.log(res)
        })
        var timestamp = new Date().getTime();
        console.log(formatTimestamp(timestamp))
    }
    render() {
        return ( <Table rowSelection={rowSelection} columns={columns} dataSource={data} /> );
    }
}

export default ListPage;
