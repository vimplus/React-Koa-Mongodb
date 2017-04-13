/**
 * @overview	layoutPage
 * @author		txBoy
 * @created		2017-04-05
 */

import React, { Component } from 'react';
import { BrowserRouter as Router, Link} from 'react-router-dom';

import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

import {removeWithoutCopy} from 'utils/util';
import 'scss/global.scss';

class LayoutPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuConfig: this.getNav(),
            collapsed: false,
            mode: 'inline',
        };
    }
    componentDidMount () {
        //this.formatMenuConf()
    }
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({
            collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        });
    }
    getNav () {
        var menuConfig = this.formatMenuConf();
        return menuConfig.map((x) => {
            return {
                key: x.path,
                name: x.name,
                icon: x.icon,
                subs: (x.childRoutes || []).map((y, i) => {
                    let subKey = y.path.substr(1).replace(/\//, '-');
                    return {
                        key: subKey,
                        name: y.name,
                        path: y.path
                    }
                })
            }
        })
    }
    formatMenuConf () {
        var routes = this.props.menuConfig;
        let list = routes.slice(0);
        list.forEach((x, key) => {
            (x.childRoutes || []).map( y => {
                if (y.path.indexOf(':') > 0) {
                    removeWithoutCopy(x.childRoutes, y);
                }
            })
        })
        return list;
    }
    getMenuKeys () {
        var path = location.pathname.replace(/^\//, '');
        var menuKeys = [];
        if (!path) {
            menuKeys.push('index');
        } else {
            menuKeys = path.split('/').slice(0, 2);
        }
        return menuKeys;
    }
    renderMenu (menuConfig) {
        var navs = menuConfig.slice(1);
        return navs.map(x => {
            if (x.path === '/') {
                return null;
            } else {
                return (
                    <SubMenu
                    key={x.key}
                    title={<span><Icon type={x.icon} /><span className="nav-text">{x.name || x.key}</span></span>}
                    >
                    {(x.subs || []).map(y => (
                        <Menu.Item key={y.key}><Link to={y.path}>{y.name}</Link></Menu.Item>
                    ))}
                    </SubMenu>
                );
            }
        });
    }
    render() {
        var menuConfig = this.state.menuConfig;
        var menuKeys = this.getMenuKeys();
        console.log(menuConfig)
        return (
            <Layout>
                <Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
                >
                    <div className="logo">React-Koa-Demo</div>
                    <Menu theme="dark" mode={this.state.mode} defaultOpenKeys={[menuKeys[0]]} defaultSelectedKeys={[menuKeys.join('-')]}>
                        <Menu.Item key="index">
                            <Link to="/">
                                <span>
                                    <Icon type="file" />
                                    <span className="nav-text">首页</span>
                                </span>
                            </Link>
                        </Menu.Item>
                        { this.renderMenu(menuConfig) }
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
                            {this.props.routesChildren}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2016 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default LayoutPage;
