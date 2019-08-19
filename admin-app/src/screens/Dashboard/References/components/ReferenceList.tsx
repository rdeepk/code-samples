import Link from '@components/Link'
import { dateHelper } from '@services/utils'
import { IReference } from '@store/References/types'
import { notification, Popconfirm, Table } from 'antd'
import * as React from 'react'
import { IReferenceListProps } from './types'

const { formatDate } = dateHelper

const locale = {
  emptyText: 'No references found matching search criteria.',
}

const linkJSX = (state: { referenceId: number, state: string }, callback: (id: number, operation: string) => void) => {
 let jsx
  switch(state.state) {
    case 'active':
    case 'past':
    // tslint:disable-next-line:jsx-no-lambda
    jsx = (<span><Popconfirm title="Are you sure you want to deactivate this reference?" onConfirm={() =>callback(state.referenceId, 'deactivate')} okText = "Yes"><Link onClick={() => null} text="Deactivate" /></Popconfirm></span>)
    break
    case 'deactivated':
    // tslint:disable-next-line:jsx-no-lambda
    jsx = (<span><Popconfirm title="Are you sure you want to reactivate this reference?" onConfirm={() =>callback(state.referenceId, 'reactivate')} okText = "Yes"><Link onClick={() => null} text="Reactivate" /></Popconfirm></span>)
    break
  }
  return jsx
}

const columns = (props: IReferenceListProps) => {
  return [{
    dataIndex: 'referenceName',
    key: 'referenceName',
    title: 'Reference Title'
  }, {
    dataIndex: 'refereeName',
    key: 'refereeName',
    title: 'Referee'
  }, {
    dataIndex: 'referenceDate',
    key: 'referenceDate',
    render: (referenceDate: string) => <span>{referenceDate ? formatDate(referenceDate): ''}</span>,
    sorter: true,
    title: 'Reference Date'
  }, {
    dataIndex: 'state',
    key: 'state',
    render: (state: string) => (state.toLowerCase().replace(/[a-z]/i, t => t.toUpperCase())),
    title: 'Status'
  }, {
    key: 'status',
    render: (state: { referenceId: number, state: string }) => {
      return linkJSX(state, props.toggleReferenceActivation)
    },
  }]
}

const ReferenceList = (props: IReferenceListProps) => {
  const { references, error, toggleStateError, toggleStateSuccess } = props
  let type = ''
  let message = ''
  if(toggleStateError) {
    type = 'error'
    message = toggleStateError
    props.resetMessages()
  }

  if(toggleStateSuccess) {
    type = 'success'
    message = toggleStateSuccess
    props.resetMessages()
  }
  if(error) {
    locale.emptyText = error
  }

  const getReferencesData = (pagination: object, filters: string[], sorter: object) => {
    props.getReferencesData(pagination, sorter)
  }

  let dataSource: IReference[] = []
  if(references.references && Array.isArray(references.references)) {
    dataSource = references.references
  }

  return (<div>
    {type === 'error' && notification[type]({
      description: null,
      message,
    })}
    {type === 'success' && notification[type]({
      description: null,
      duration: 5,
      message,
    })}
    <Table locale={locale} columns={columns(props)} dataSource={dataSource} onChange={getReferencesData} pagination={ { defaultPageSize: props.pageSize, total: props.totalReferences, current: props.currentPage }} />
    </div>)
}

export default ReferenceList
