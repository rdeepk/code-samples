import Router from '@screens/navigation/Router'
import { Layout } from 'antd'
import * as React from 'react'
import AppFooter from './components/AppFooter'
import AppHeader from './components/AppHeader'
import './styles.css'

const { Header, Footer, Content } = Layout

interface IAppLayoutProps {
  isLoggedIn: boolean
  checkSession: () => void
  logout: () => void
  profile: {
    FirstName: string
    PictureLink: string
  }
  setUserProfile: () => void
}

class AppLayout extends React.Component<IAppLayoutProps> {
  public componentDidMount() {
    this.props.checkSession()
    this.props.setUserProfile()
  }
  
  public render() {
    return (
        <Layout className="admin">
          <Header>
            <AppHeader isLoggedIn = {this.props.isLoggedIn} logout = {this.props.logout} profile = {this.props.profile} />
          </Header>
          <Content>
            <Router />
          </Content>
          <Footer>
            <AppFooter />
          </Footer>
        </Layout>
    )
  }
}

export default AppLayout