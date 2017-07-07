/**
 * @overview	Login
 * @author		txBoy
 * @created		2017-04-13
 */

import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

import fetcher from 'utils/fetcher';
import { md5 } from 'utils/util';
import './auth.scss';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showSuccess: false,
            confirmDirty: false,
            userInfo: null
        }
    }
    handleSubmit = (e) => {
    	e.preventDefault();
    	this.props.form.validateFieldsAndScroll((err, values) => {
    		if (!err) {
    			console.log('Received values of form: ', values);
                values.password = md5(values.password);
                delete values.confirm;
                var params = values;
                this._onRegiter(params)
    		}
    	});
    }
    handleConfirmBlur = (e) => {
    	const value = e.target.value;
    	this.setState({
    		confirmDirty: this.state.confirmDirty || !!value
    	});
    }
    _onRegiter(params) {
        fetcher.post('/api/user/register', {data: params}).then(res => {
            console.log(res)
            if (res.code === 10000) {
                var userInfo = res.data;
                this.setState({
                    showSuccess: true,
                    userInfo: userInfo
                })
            }
        })
    }
    checkPassword = (rule, value, callback) => {
    	const form = this.props.form;
    	if (value && value !== form.getFieldValue('password')) {
    		callback('Two passwords that you enter is inconsistent!');
    	} else {
    		callback();
    	}
    }
    checkConfirm = (rule, value, callback) => {
    	const form = this.props.form;
    	if (value && this.state.confirmDirty) {
    		form.validateFields(['confirm'], {
    			force: true
    		});
    	}
    	callback();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
    		labelCol: {
    			xs: {
    				span: 24
    			},
    			sm: {
    				span: 6
    			},
    		},
    		wrapperCol: {
    			xs: {
    				span: 24
    			},
    			sm: {
    				span: 14
    			},
    		},
    	};
    	const tailFormItemLayout = {
    		wrapperCol: {
    			xs: {
    				span: 24,
    				offset: 0,
    			},
    			sm: {
    				span: 14,
    				offset: 6,
    			},
    		},
    	};
        var userInfo = this.state.userInfo;
        return (
            <div className="wrap-register">
                <div className={"register-module " + (this.state.showSuccess ? 'hide' : 'show') }>
                    <div className="login-form-header">用户注册</div>
                    <Form onSubmit = {this.handleSubmit}>
                        <FormItem { ...formItemLayout } label = "用户名" hasFeedback>
                        {
                            getFieldDecorator('username', {
                                rules: [{
                                    type: 'string',
                                    message: 'The input is not valid username!',
                                }, {
                                    required: true,
                                    message: 'Please input your username!',
                                }],
                            })(<Input />)
                        }
                        </FormItem>
                        <FormItem { ...formItemLayout } label = "邮箱" hasFeedback>
                        {
                            getFieldDecorator('email', {
                                rules: [{
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                }, {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                }],
                            })(<Input />)
                        }
                        </FormItem>
                        <FormItem { ...formItemLayout } label = "密码" hasFeedback>
                        {
                            getFieldDecorator('password', {
                                rules: [{
                                    required: true,
                                    message: 'Please input your password!',
                                }, {
                                  validator: this.checkConfirm,
                                }],
                            })( <Input type = "password" /> )
                        }
                        </FormItem>
                        <FormItem { ...formItemLayout } label = "确认密码" hasFeedback>
                        {
                            getFieldDecorator('confirm', {
                                rules: [{
                                    required: true,
                                    message: 'Please confirm your password!',
                                }, {
                                  validator: this.checkPassword,
                                }],
                            })( <Input type="password" onBlur = {	this.handleConfirmBlur } />)
                        }
                        </FormItem>
                        <FormItem { ...tailFormItemLayout }>
                            <Button className="account-form-button" type = "primary" htmlType="submit" size="large" > 立即注册 < /Button>
                        </FormItem>
                    </Form>
                </div>
                <div className={"success-module " + (this.state.showSuccess ? 'show' : 'hide') }>
                    <div className="iconbox icon-success">
                        <i className="line-short"></i>
                        <i className="line-long"></i>
                    </div>
                    <div className="complete-text success">恭喜你{userInfo && userInfo.username}，注册成功！</div>
                    <div className="complete-text send-to">已发送验证至：{userInfo && userInfo.email} <a className="link-to-login" href="/login">立即登录</a></div>
                </div>
            </div>
        );
    }
}

const RegisterForm = Form.create()(Register);

export default RegisterForm;
