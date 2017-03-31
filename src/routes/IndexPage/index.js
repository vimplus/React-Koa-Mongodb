/**
 * @overview	IndexPage
 * @author		txBoy
 * @created		2017-03-21
 */

import React, { Component } from 'react';
import { BrowserRouter as Router, Link} from 'react-router-dom';

import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

import logo from 'img/logo.svg';
import 'scss/global.scss';

class IndexPage extends React.Component {
    state = {
        collapsed: false,
        mode: 'inline',
    };
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({
            collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        });
    }
    render() {
        return (
            <Layout>
                <Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
                >
                    <div className="logo">网金贷平台</div>
                    <Menu theme="dark" mode={this.state.mode} defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}>
                        <SubMenu
                        key="sub1"
                        title={<span><Icon type="user" /><span className="nav-text">User</span></span>}
                        >
                            <Menu.Item key="1"><Link to="/">首页</Link></Menu.Item>
                            <Menu.Item key="2"><Link to="/list">List</Link></Menu.Item>
                            <Menu.Item key="3"><Link to="/detail">Detail</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu
                        key="sub2"
                        title={<span><Icon type="team" /><span className="nav-text">Team</span></span>}
                        >
                        <Menu.Item key="4">Team 1</Menu.Item>
                        <Menu.Item key="5">Team 2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="6">
                            <span>
                                <Icon type="file" />
                                <span className="nav-text">File</span>
                            </span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#454545'}} />
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '12px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Content</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: '600px' }}>
                            This is Content.

                            {this.props.routesChildren}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2016 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default IndexPage;
