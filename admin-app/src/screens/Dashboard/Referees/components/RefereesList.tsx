// import Link from '@components/Link'
import AppConfig from '@src/config'
import {
  // Popconfirm,
  Table } from 'antd'
import * as React from 'react'
import { IRefereesListProps } from './types'
const { AttendeeAppLink, RefereeProfileRoute } = AppConfig
const columns = (props: IRefereesListProps) => {
  return [{
    dataIndex: 'name',
    key: 'name',
    // tslint:disable-next-line:no-any
    render: (name: string,  record: any) => {
      return <a href={`${AttendeeAppLink}/${RefereeProfileRoute}/${record.key}`}>{name}</a>
    },
    title: 'Name'
  }, {
    dataIndex: 'email',
    key: 'email',
    title: 'Email'
  }, {
    dataIndex: 'totalReferences',
    key: 'totalReferences',
    render: (totalReferences: number) => {
      return <a href="#">{totalReferences}</a>
    },
    title: 'Total References'
  }]
}

const RefereesList = (props: IRefereesListProps) => {
  const { referees } = props
  const dataSource = referees.map(referee => ({
    email: referee.Email,
    key: referee.RefereeID,
    lastActive: referee.lastActive,
    name: referee.RefereeName,
    totalReferences: referee.totalReferences,
    status: referee.active,
  }))

  return <Table columns={columns(props)} dataSource={dataSource} />
}

export default RefereesList
