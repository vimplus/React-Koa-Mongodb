'use strict';

// 0* 通用错误
const common = {
    success: {
		code: 10000,
		msg: '请求成功!',
        status: 'success!'
	},
	error: {
		code: 99999,
		msg: 'System Error!',
        status: 'error'
	},
    notLogin: {
		code: 88888,
		msg: '未登录或登录超时，请重新登录!',
        status: 'error'
	}
}

// 1* 为用户报错信息
const account = {
	notInfo: {
		code: 10001,
		msg: '用户名或密码不能为空!',
        status: 'error'
	},
    dupName: {
		code: 10002,
		msg: '用户名已存在!',
        status: 'error'
	},
    notUser: {
		code: 10003,
		msg: '用户不存在!',
        status: 'error'
	},
    pwdError: {
		code: 10004,
		msg: '用户名或密码错误!',
        status: 'error'
	},
    noAccess: {
		code: 10005,
		msg: '暂时无权访问!',
        status: 'error'
	}
}

// 2* 为权限报错信息
/*const auth = {
	noAccess: {
		code: 20001,
		msg: '暂时无权访问'
	}
}*/

export {
    common,
	account
}
