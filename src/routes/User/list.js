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
            data: null,
            userList: []
        }
    }
    componentDidMount() {

        this.getList();

        var timestamp = new Date().getTime();
        console.log(formatTimestamp(timestamp))
    }
    // 获取列表数据
    getList() {
        var params = Object.assign({}, this.state.query);
        params.filter = JSON.stringify(params.filter);

        fetcher.get('/api/user/getUsers', {data: params}).then(res => {
            console.log(res)
            if (res && res.code === 10000) {
                var data = res.data;
                var userList = data.list || [];
                this.setState({
                    data: data,
                    userList: userList
                })
            }
        })
    }

    renderTable() {
        var _this = this;
        var data = this.state.data;
        const pagination = {
            current: _this.state.query.page,
            total: data && data.total || 0,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                _this.state.query.page = current;
                _this.state.query.size = pageSize;
                _this.forceUpdate();
                _this.getList();
            },
            onChange(current) {
                _this.state.query.page = current;
                _this.getList();
            }
        };

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
            )
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

        return (<Table rowKey="uid" rowSelection={rowSelection} columns={columns} pagination={pagination} dataSource={this.state.userList} />)
    }

    render() {
        return (
            <div className="module-table">
                {this.renderTable()}
            </div>
        );
    }
}

export default ListPage;
