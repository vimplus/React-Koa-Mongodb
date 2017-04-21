'use strict';

// 0* 通用错误
const common = {
    success: {
		code: 1000,
		msg: '请求成功!',
        status: 'success!'
	},
	error: {
		code: 9999,
		msg: 'System Error!',
        status: 'error'
	}
}

// 1* 为用户报错信息
const account = {
	notInfo: {
		code: 1001,
		msg: '用户名或密码不能为空!',
        status: 'error'
	},
    dupName: {
		code: 1002,
		msg: '用户名已存在!',
        status: 'error'
	},
    notUser: {
		code: 1003,
		msg: '用户不存在!',
        status: 'error'
	},
    pwdError: {
		code: 1004,
		msg: '密码错误!',
        status: 'error'
	},
    noAccess: {
		code: 1005,
		msg: '暂时无权访问!',
        status: 'error'
	},
    notLogin: {
		code: 1006,
		msg: '未登录或登录超时!',
        status: 'error'
	}
}

// 2* 为权限报错信息
/*const auth = {
	noAccess: {
		code: 2001,
		msg: '暂时无权访问'
	}
}*/

export {
    common,
	account
}
