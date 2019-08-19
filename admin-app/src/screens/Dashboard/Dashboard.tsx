import { Col, Row, Tabs } from 'antd'
import * as React from 'react'
import Agreements from './Agreements'
import Announcements from './Announcements'
import References from './References'
import Referees from './Referees'
import PromoCodes from './PromoCodes'

const { TabPane } = Tabs
interface IDashboardProps {
  tabChange: (tab: number) => void
  selectedTab: number
}

const Dashboard = (props: IDashboardProps) => (
  <Row>
    <Col lg={{ span: 18, offset: 3 }}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Referees" key="1"><Referees /></TabPane>
        <TabPane tab="References" key="2"><References /></TabPane>
        <TabPane tab="Announcements" key="3"><Announcements /></TabPane>
        <TabPane tab="Agreements" key="4"><Agreements /></TabPane>
        <TabPane tab="Promo Codes" key="6"><PromoCodes /></TabPane>
      </Tabs>
    </Col>
  </Row>
)

export default Dashboard
