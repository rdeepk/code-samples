import Link from '../../References/components/node_modules/@components/Link'
import { dateHelper } from '../../References/components/node_modules/@services/utils'
import { Alert, Button, Table } from 'antd'
import * as React from 'react'
import PromoCodeModal from './PromoCodeModal'
import './style.css'
import { IPromoCodesListProps } from './types'

const { formatDate } = dateHelper

const editPromoCode = (props: IPromoCodesListProps, id: number) => {
  props.setEditId(id)
  if(!props.editMode) {
    props.toggleEditMode()
  }
  props.toggleVisible()
}

const columns = (props: IPromoCodesListProps) => {
  return [{
    dataIndex: 'code',
    key: 'code',
    render: (code: string) => <span>{code}</span>,
    title: 'Promo Code'
  },
  {
    dataIndex: 'points',
    key: 'points',
    render: (points: number) => <span>{points}%</span>,
    sorter: (a: {points: number}, b: {points: number}) => a.points - b.points,
    title: 'Points',
  },
  {
    dataIndex: 'createDate',
    key: 'createDate',
    render: (createDate: string) => <span>{createDate ? formatDate(createDate): ''}</span>,
    sorter: (a: {createDate: string}, b: {createDate: string}) => {
      const date1 = +new Date(a.createDate)
      const date2 = +new Date(b.createDate)
      return (date2 - date1)
    },
    title: 'Create Date',
  },
  {
    dataIndex: 'expiryDate',
    key: 'expiryDate',
    render: (expiryDate: string) => <span>{expiryDate ? formatDate(expiryDate): ''}</span>,
    sorter: (a: {expiryDate: string}, b: {expiryDate: string}) => {
      const date1 = +new Date(a.expiryDate)
      const date2 = +new Date(b.expiryDate)
      return (date1 - date2)
    },
    title: 'Expiry Date',
  },
  {
    dataIndex: 'usageType',
    key: 'usageType',
    render: (usageType: number) => <span>{ usageType === 1 ? 'Single' : 'Multiple'}</span>,
    title: 'Single/Multiple Use'
  },
  {
    key: 'edit',
    // tslint:disable-next-line:no-any
    render: (code: string, record: any ) =>
    // tslint:disable-next-line:jsx-no-lambda
    <Link onClick={() => {editPromoCode(props, record.id)}} text="Edit" />
  }]
}

const PromoCodeList = (props: IPromoCodesListProps) => {
  const { promoCodes } = props
  const dataSource = promoCodes.map(promoCode => ({
    code: promoCode.code,
    createDate: promoCode.createDate,
    points: promoCode.pointts,
    expiryDate: promoCode.expiryDate,
    id: promoCode ? promoCode.id : null,
    usageType: promoCode.usageType,
  }))

  const handleAddCode = () => {
    if(props.editMode) {
      props.toggleEditMode()
    }
    props.toggleVisible()
  }

  return (
    <div className="promoCodes">
      {props.promoCodeError && <Alert message={props.promoCodeError} type="error" />}
      <Button onClick={handleAddCode} className="add-button">Add Promo Code</Button>
      <Table columns={columns(props)} dataSource={dataSource} />
      <PromoCodeModal
        isVisible={props.isVisible}
        toggleVisible={props.toggleVisible}
        codeId={props.editCodeId}
        savePromoCode={props.savePromoCode}
        setEditId={props.setEditId}
        promoCodes={props.promoCodes}
        editMode={props.editMode}
        deletePromoCode={props.deletePromoCode}
        form={props.form}
        promoCodeError={props.promoCodeError} />
    </div>
  )
}

export default PromoCodeList
