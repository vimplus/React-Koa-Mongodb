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


// const RouteWithSubRoutes = (route) => (
//   <Route path={route.path} render={props => (
//     // pass the sub-routes down to keep nesting
//     //<LazyRoute {...props} component={route.component} />
//     <route.component {...props} routes={route.routes}/>
//   )}/>
// )

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


// <Route exact path='/' component={IndexPage}/>
// <Route path='/list' render={(props) => <LazyRoute {...props} component={import('./loan/list/component')} />}/>
// <Route path='/detail' render={(props) => <LazyRoute {...props} component={import('./loan/detail/component')} />}/>

export default App;

// [
//   { component: App,
//     routes: [
//       { path: '/',
//         exact: true,
//         component: IndexPage
//       },
//       { path: '/list',
//         component: ListPage
//         },
//         {
//             path: '/detail',
//             component: DetailPage
//         }
//     ]
//   }
// ]

// {
//     path: '/',
//     component: App,
//     routes: childRoutes,
//     indexRoute: {component: IndexPage}
// }
