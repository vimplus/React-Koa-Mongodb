/**
 * @overview	Router Config
 * @author		txBoy
 * @created		2017-03-21
 */

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, BrowserRouter, Link} from 'react-router-dom';
import LazyRoute from 'lazy-route';

import IndexPage from './IndexPage';

const childRoutes = [
    {
        path: '/list',
        component: './Items/list'
    },
    {
        path: '/detail',
        component: './Items/detail'
    }
]


// 定义路由组件
const RouteWithSubRoutes = (route) => (
  <Route path={route.path} render={ props => (
    <LazyRoute {...props} component={import(route.component + '.js')}/>
  )}/>
)

// 渲染所有路由
const renderRoutes = (routes) => {
    return routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route}/>
    ))
}


class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <IndexPage routesChildren = {renderRoutes(childRoutes)}/>
        </BrowserRouter>
    );
  }
}


// <Route exact path='/' component={IndexPage}/>
// <Route path='/list' render={(props) => <LazyRoute {...props} component={import('./loan/list/component')} />}/>
// <Route path='/detail' render={(props) => <LazyRoute {...props} component={import('./loan/detail/component')} />}/>

export default App;
