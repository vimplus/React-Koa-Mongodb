'use strict';

// 0* 通用错误
const common = {
    success: {
		code: 10000,
		msg: '请求成功!',
        status: 'success'
	},
	error: {
		code: 99999,
		msg: 'System Error!',
        status: 'error'
	},
    addFail: {
        code: 99999,
		msg: '新增失败!',
        status: 'error'
    },
    updateFail: {
        code: 99999,
		msg: '更新失败!',
        status: 'error'
    },
    deleteFail: {
        code: 99999,
		msg: '删除失败!',
        status: 'error'
    },
    none: {
        code: 90005,
		msg: '参数不能为空!',
        status: 'error'
    },
    noType: {
		code: 90005,
		msg: '类型不能为空!',
        status: 'error'
	},
    noneId: {
		code: 90006,
		msg: 'id不能为空!',
        status: 'error'
	},
    missParam: {
		code: 90007,
		msg: '请检查所需的参数!',
        status: 'error'
	},
    notLogin: {
		code: 88888,
		msg: '未登录或登录超时，请重新登录!',
        status: 'error'
	},
    invalidToken: {
        code: 88888,
		msg: 'Invalid Token!',
        status: 'error'
    },
    errorToken: {
        code: 88888,
		msg: 'Token verify failed!',
        status: 'error'
    },
    timeOut: {
        code: 50004,
		msg: '处理超时!',
        status: 'error'
    },
    notPermission: {
        code: 50005,
		msg: '您暂时无权进行此操作，请联系管理员授权!',
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
		msg: '暂无访问权限!',
        status: 'error'
	},
	oldPwdErr: {
		code: 10006,
		msg: '原密码输入错误!'
	},
	notMatch: {
		code: 10007,
		msg: '用户名和密码不匹配，请核对!',
	},
    forbidden: {
		code: 10008,
		msg: '该用户已被限制登录，详情咨询管理员!',
	}
}

export {
    common,
	account
}
