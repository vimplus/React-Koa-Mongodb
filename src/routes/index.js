/**
 * @overview	Router Config
 * @author		txBoy
 * @created		2017-03-21
 */

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, BrowserRouter, Link} from 'react-router-dom';
import LazyRoute from 'lazy-route';

//import IndexPage from './IndexPage';
import LayoutPage from './LayoutPage';

const routesConfig = [
    {
        path: '/',
        exact: true,
        icon: 'home',
        name: '首页',
        component: './IndexPage/index'
    },
    {
        path: 'user',
        icon: 'user',
        name: '用户',
        childRoutes: [
            {
                name: '列表',
                path: '/user/list',
                component: './User/list'
            },
            {
                name: '详情',
                path: '/user/detail/:name',
                component: './User/detail'
            }
        ]
    }
]


// 定义路由组件
const RouteWithSubRoutes = (route) => (
  <Route path={route.path} exact={route.exact} render={ props => (
    <LazyRoute {...props} component={import(route.component + '.js')}/>
  )}/>
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


class App extends Component {
    render() {
        var routes = renderRoutes(routesConfig);
        console.log(routes)
        return (
            <BrowserRouter>
                <LayoutPage routesChildren = {routes} menuConfig = {routesConfig}/>
            </BrowserRouter>
        );
    }
}


// <Route exact path='/' component={IndexPage}/>
// <Route path='/list' render={(props) => <LazyRoute {...props} component={import('./loan/list/component')} />}/>
// <Route path='/detail' render={(props) => <LazyRoute {...props} component={import('./loan/detail/component')} />}/>

export default App;
