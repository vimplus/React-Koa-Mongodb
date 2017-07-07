/**
 * @overview	Login
 * @author		txBoy
 * @created		2017-04-13
 */

import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

import fetcher from 'utils/fetcher';
import { md5 } from 'utils/util';
import storage from 'utils/storage.js';
import './auth.scss';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: null
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                values.password = md5(values.password);
                this.onLogin(values)
            }
        });
    }
    onLogin(params) {
        fetcher.post('/api/user/login', {data: params}).then(res => {
            console.log(res)
            if (res && res.code === 10000) {
                var userInfo = res.data;
                storage.setCookie('userInfo', JSON.stringify(userInfo));
                window.location.href = '/';
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-module">
                <div className="login-form-header">用户登录</div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入用户名！' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码！' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>记住我</Checkbox>
                        )}
                    <Link className="login-form-forgot" to="/resetPwd">忘记密码</Link>
                    <Button className="account-form-button" type="primary" htmlType="submit">登录</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const LoginForm = Form.create()(Login);

export default LoginForm;
