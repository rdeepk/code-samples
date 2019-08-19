import Link from '@components/Link'
import Paths from '@screens/navigation/Paths'
import AppConfig from '@src/config'
import { Col, Dropdown, Icon, Menu, Row } from 'antd'
import * as React from 'react'
// import { Redirect } from 'react-router-dom'
import './../styles.css'

interface IHeaderProps {
  isLoggedIn: boolean
  logout: () => void
  profile: {
    FirstName: string
    PictureLink: string
  }
}

const Header = (props: IHeaderProps) =>{
  const { isLoggedIn } = props
  const userLogout = () => {
    const { logout } = props
    logout()
    document.location.href = Paths.Public.Login
    // return <Redirect to={Paths.Public.Login} />
  }
  const menu = (
    <Menu>
      <Menu.Item>
        <Link onClick={userLogout} text="Logout" />
      </Menu.Item>
    </Menu>
  )

  const profileImage = props.profile  &&  props.profile.PictureLink ? props.profile.PictureLink : AppConfig.defaultUserIcon
  const firstName = props.profile && props.profile.FirstName ? props.profile.FirstName: ''

  const headerJSX = (
    <Row>
        <Col lg={{ span: 20, offset: 2 }}>
          <Row>
            <Col xs={18}>
              <img src={AppConfig.logoBlues} />
            </Col>
            <Col xs={6} className="headerDropdown">
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link  profile-menu" href="#">
                <img src={ profileImage } alt="Profile Image"/>
                  { firstName }&nbsp;&nbsp;
                  <Icon type="down" />
                </a>
              </Dropdown>
            </Col>
          </Row>
        </Col>
      </Row>
  )
  return (
    <div className="header">
      {isLoggedIn && headerJSX}
    </div>
  )
}

export default Header
