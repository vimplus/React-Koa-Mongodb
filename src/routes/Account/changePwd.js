/**
 * @overview	Login
 * @author		txBoy
 * @created		2017-04-13
 */

import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

import './account.scss';

class ForgetPassword extends Component {
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
    oldPassword = (rule, value, callback) => {
    	const form = this.props.form;
    	if (value && this.state.confirmDirty) {
    		form.validateFields(['oldPassword'], {
    			force: true
    		});
    	}
    	callback();
    }
    newPassword = (rule, value, callback) => {
    	const form = this.props.form;
    	if (value && this.state.confirmDirty) {
    		form.validateFields(['newPassword'], {
    			force: true
    		});
    	}
    	callback();
    }
    checkPassword = (rule, value, callback) => {
    	const form = this.props.form;
    	if (value && value !== form.getFieldValue('password')) {
    		callback('两次密码不一致!');
    	} else {
    		callback();
    	}
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
            <div className="retrieve-module">
                <div className="login-form-header">修改密码</div>
                <Form onSubmit = {this.handleSubmit}>
                    <FormItem { ...formItemLayout } label = "原密码" hasFeedback>
                    {
                        getFieldDecorator('oldPassword', {
                            rules: [{
                                required: true,
                                message: 'Please input your password!',
                            }, {
                                validator: this.oldPassword,
                            }],
                        })( <Input type = "password" / > )
                    }
                    </FormItem>
                    <FormItem { ...formItemLayout } label = "新密码" hasFeedback>
            		{
            			getFieldDecorator('password', {
            				rules: [{
            					required: true,
            					message: 'Please input your password!',
            				}, {
            					validator: this.newPassword,
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
            		      <Button className="account-form-button" type = "primary" htmlType="submit" size="large" > 确认修改 < /Button>
                    </FormItem>
                </Form>
            </div>
    	);
    }
}

const RetrieveFrom = Form.create()(ForgetPassword);

export default RetrieveFrom;
