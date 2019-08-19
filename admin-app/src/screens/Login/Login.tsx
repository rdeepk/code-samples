import Paths from '@screens/navigation/Paths'
import AppConfig from '@src/config'
import { Button, Col, Form, Icon, Input, Row } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import * as React from 'react'
import { Redirect } from 'react-router-dom'
import './styles.css'

const FormItem = Form.Item

interface ILoginProps {
  login: (username: string, password: string) => Promise<boolean>
  errorMessage: React.SFC
  isLoggedIn: boolean
  loginError: string
}

class Login extends React.Component<ILoginProps & FormComponentProps> {

  public state = {
    showErrorMessage: false
  }

  public render() {
    const { getFieldDecorator } = this.props.form
    const { 
      isLoggedIn, 
      loginError } = this.props
//    const { showErrorMessage } = this.state
//    const { errorMessage } = this.props
    if(isLoggedIn) return <Redirect to={Paths.Dashboard} />

    return (
      <Row>
        <Col lg={{ offset: 8, span: 6 }}>
        <Form onSubmit={this.login} className="loginForm">
          <img src={AppConfig.logoBlues} className="logo" />
          <div className="error" id="error">{loginError}</div>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Email cannot be blank' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
            )}
          </FormItem>
          <FormItem>
          {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Password cannot be blank' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            {/* <a className="login-form-forgot" href="">Forgot password</a> */}
            <Button type="primary" htmlType="submit" className="login-form-button">
              Login
            </Button>
          </FormItem>
        </Form>
        </Col>
      </Row>
    )
  }

  private login = (e: React.FormEvent<Form>) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if(!err) {
        const { username, password } = values
        this.props.login(username, password)
      }
    })
  }
}

export default Form.create()(Login)