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

import './auth.scss';

class ResetPwd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmDirty: false
        }
    }
    handleSubmit = (e) => {
    	e.preventDefault();
    	this.props.form.validateFieldsAndScroll((err, values) => {
    		if (!err) {
    			console.log('Received values of form: ', values);
    		}
    	});
    }
    handleConfirmBlur = (e) => {
    	const value = e.target.value;
    	this.setState({
    		confirmDirty: this.state.confirmDirty || !!value
    	});
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
        return (
            <div className="reset-pwd-module">
                <div className="login-form-header">找回密码</div>
                <Form onSubmit = {this.handleSubmit}>
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
                      })( <
                          Input / >
                      )
                  }
                    </FormItem>
                    <FormItem { ...formItemLayout } label = "新密码" hasFeedback>
                  {
                      getFieldDecorator('password', {
                          rules: [{
                              required: true,
                              message: 'Please input your password!',
                          }, {
                              validator: this.checkConfirm,
                          }],
                      })( <Input type = "password" / > )
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
                        <Button className="account-form-button" type = "primary" htmlType="submit" size="large" > 重置密码 < /Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const ResetPwdForm = Form.create()(ResetPwd);

export default ResetPwdForm;
