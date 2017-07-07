/**
 * @overview	Router Index
 * @author		txBoy
 * @created		2017-03-21
 */

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, BrowserRouter, Link} from 'react-router-dom';
import LazyRoute from 'lazy-route';

import AuthLayout from './Auth';
/*import ResetPwd from './Auth/resetPwd';*/
import LayoutPage from './LayoutPage';

import routesConfig from './routes';

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
    constructor(props) {
        super(props)
        this.state = {
            isRenderSider: true,
        };
    }
    componentWillMount() {
        this.hideSider();
    }
    hideSider() {
        var pathname = window.location.pathname;
        var pathArr = ['login', 'register', 'resetPwd']
        for (var i = 0; i < pathArr.length; i++) {
            if (pathname.indexOf(pathArr[i]) >= 0) {
                this.setState({
                    isRenderSider: false
                })
            }
        }
        console.log(location.pathname)
    }
    renderLayoutPage() {
        var isRender = this.state.isRenderSider;
        if (isRender) {
            return (
                <LayoutPage routesChildren = {renderRoutes(routesConfig)} menuConfig = {routesConfig}/>
            )
        } else {
            return (
                <div className="simple-warp">
                    <AuthLayout/>
                </div>
            )
        }
    }
    render() {
        return (
            <BrowserRouter>
                {this.renderLayoutPage()}
            </BrowserRouter>
        );
    }
}


// <Route exact path='/' component={IndexPage}/>
// <Route path='/list' render={(props) => <LazyRoute {...props} component={import('./loan/list/component')} />}/>
// <Route path='/detail' render={(props) => <LazyRoute {...props} component={import('./loan/detail/component')} />}/>

export default App;
