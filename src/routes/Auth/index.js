/**
 * @overview	Login
 * @author		txBoy
 * @created		2017-04-13
 */

import { Component } from 'react';
import { BrowserRouter as Router, Route, BrowserRouter, Link} from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;
import LazyRoute from 'lazy-route';

/*import LoginFrom from './login';
import ResetPwdForm from './resetPwd';*/

class AuthLayout extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    render() {
        return (
            <Layout className="layout">
                <Header>
                  <div className="logo" />
                </Header>
                <Content style={{ padding: '30px 50px' }}>
                  <div style={{ background: '#fff', padding: 24, minHeight: 600 }}>
                      <Route path='/login' render={(props) => <LazyRoute {...props} component={import('./login')} />} />
                      <Route path='/register' render={(props) => <LazyRoute {...props} component={import('./register')} />} />
                      <Route path='/resetPwd' render={(props) => <LazyRoute {...props} component={import('./resetPwd')} />} />
                  </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                  Copyright © 2017 Thinktxt Inc. All Rights Reserved.
                </Footer>
              </Layout>
        );
    }
}


export default AuthLayout;
