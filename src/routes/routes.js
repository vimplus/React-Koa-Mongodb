/**
 * @overview	Router Config
 * @author		txBoy
 * @created		2017-03-21
 */

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
    },
    {
        path: 'account',
        icon: 'solution',
        name: '账户',
        childRoutes: [
            {
                name: '修改密码',
                path: '/account/changePwd',
                component: './Account/changePwd'
            }
        ]
    }
]

export default routesConfig;
