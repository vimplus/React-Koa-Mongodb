/**
 * @overview	Router Index
 * @author		txBoy
 * @created		2017-03-21
 */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LazyRoute from 'lazy-route';

import AuthLayout from './Auth';
import LayoutPage from './LayoutPage';

import routesConfig from './routes';
import storage from 'utils/storage';

const userInfo = storage.getCookie('userInfo') ? JSON.parse(storage.getCookie('userInfo')) : '';
const accessReg = userInfo.accessUrls && userInfo.accessUrls.length ? new RegExp(userInfo.accessUrls.map(url => '^' + url).join('|')) : null;

// 定义路由组件
const RouteWithSubRoutes = (route) => (
    <Route path={route.path} exact={route.exact} render={ props => {
        // route.onEnter();  // 校验准入权限
        return <LazyRoute {...props} component={import(route.component + '.js')}/>;
    }}/>
)

// 渲染所有路由
const renderRoutes = (routes) => {
    return routes.map((route, i) => {
        if(route.childRoutes) {
            return renderRoutes(route.childRoutes)
        } else {
            return (<RouteWithSubRoutes key={`${route.path}-${i}`} {...route}/>)
        }
    })
}

function checkAccess() {
    var pathname = window.location.pathname;
    console.log('-----------pathname:', pathname)
    if (pathname != '/' && accessReg && !accessReg.test(pathname)) {
        location.replace('/error/403');
    }
}

function formatRoutes(routes) {
    let list = routes.slice(0);
    while (list.length) {
        let route = list.shift();
        if (!route.onEnter) {
            route.onEnter = checkAccess;
        }
        if (route.childRoutes && route.childRoutes.length) {
            list.push.apply(list, route.childRoutes);
        }
    }
    return routes;
}

var routes = formatRoutes(routesConfig);

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isRenderSider: false,
            simplePage: false
        };
    }
    componentWillMount() {
        var pathname = window.location.pathname;
        if(pathname.indexOf('/login') > -1){
            storage.setCookie('userInfo', '');
        }
        // this.hideSider();
    }
    hideSider() {
        var pathname = window.location.pathname;
        var pathArr = ['login', 'register', 'resetPwd', 'error']
        for (var i = 0; i < pathArr.length; i++) {
            if (pathname.indexOf(pathArr[i]) != -1) {
                this.setState({
                    isRenderSider: false
                })
            }
        }
    }
    renderLayoutPage() {
        var pathname = window.location.pathname;
        if(userInfo){
            this.state.isRenderSider = true;
        }
        if (pathname.indexOf('error') != -1) {
            this.state.simplePage = true;
        }
        var isRender = this.state.isRenderSider;
        var simplePage = this.state.simplePage;
        if (isRender && !simplePage) {
            return (
                <LayoutPage routesChildren = {renderRoutes(routes)} menuConfig = {routes}/>
            )
        } else if (simplePage) {
            return (
                <AuthLayout/>
            )
        } else {
            var pathname = window.location.pathname;
            if(pathname.indexOf('/login') > -1 || pathname.indexOf('/register') > -1 || pathname.indexOf('/resetPwd') > -1){
                return (
                    <AuthLayout/>
                )
            } else {
                window.location.href = '/login';
            }
        }
    }
    render() {
        return (
            <Router>
                {this.renderLayoutPage()}
            </Router>
        );
    }
}
export default App;
