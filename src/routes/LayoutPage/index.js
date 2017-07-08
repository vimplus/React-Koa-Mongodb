/**
 * @overview	layoutPage
 * @author		txBoy
 * @created		2017-04-05
 */

import { Component } from 'react';
import { Link } from 'react-router-dom';

import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

import { removeWithoutCopy } from 'utils/util';
import fetcher from 'utils/fetcher';
import storage from 'utils/storage.js';
import 'scss/global.scss';

const userInfo = JSON.parse(storage.getCookie('userInfo') || '{}');

class LayoutPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isRenderSider: true,
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
    onLogout() {
        fetcher.get('/api/user/logout', function (err, res) {
            console.log(res)
        })
        storage.setCookie('userInfo', '', 0);
        window.location.href = '/login';
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
        // console.log(menuConfig)
        var menuKeys = this.getMenuKeys();
        return (
            <Layout>
                <Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
                >
                    <div className="logo">React-Node-Demo</div>
                    <Menu theme="dark" mode={this.state.mode} defaultOpenKeys={[menuKeys[0]]} defaultSelectedKeys={[menuKeys.join('-')]}>
                        <Menu.Item key="index">
                            <Link to="/">
                                <span>
                                    <Icon type="home" />
                                    <span className="nav-text">首页</span>
                                </span>
                            </Link>
                        </Menu.Item>
                        { this.renderMenu(menuConfig) }
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="ant-layout-header clearfix">
                        <div className="user-info">Hello, 欢迎 {userInfo.realName || userInfo.username} ^_^</div>
                        <div className="header-content">乐潇游【React-Node-Mongodb】技术栈实例平台</div>
                        <div className="login-box">
                            <a className="logout-btn" onClick={this.onLogout.bind(this)}>退  出</a>
                        </div>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb className='ant-layout-breadcrumb'>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Content</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: '600px' }}>
                            {this.props.routesChildren}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Copyright © 2017 Thinktxt Inc. All Rights Reserved.</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default LayoutPage;
