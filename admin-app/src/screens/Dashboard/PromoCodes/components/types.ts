import { IPromoCode } from '@store/PromoCodes/types'
// import { FormComponentProps } from 'antd/lib/form'

export interface IPromoCodesListProps {
  promoCodes: ReadonlyArray<IPromoCode>
  toggleEditMode: () => void
  toggleVisible: () => void
  isVisible: boolean
  deletePromoCode: (id: number) => void
  editCodeId: number
  editMode: boolean
  savePromoCode: (promoCode: IPromoCode) => void
  setEditId: (id: number) => void
  promoCodeError: Error
  form: {
    // tslint:disable-next-line:no-any
    getFieldDecorator: (name: string, func: any) => any,
    setFieldsValue: (obj: { numPoints: string }) => void
    getFieldsValue: () => void
    resetFields: () => void
    validateFields: (name: (err: Error, values: object) => void) => void
   }
}

export interface IAddPromoCodeState {
  isVisible: boolean
}

export interface IPromoCodeFormProps {
  promoCodes?: object
}

export interface IPromoCodeModalProps {
  promoCode?: object
  promoCodes: ReadonlyArray<IPromoCode>
  editMode: boolean
  isVisible: boolean
  toggleVisible: () => void
  codeId: number
  deletePromoCode: (id: number) => void
  savePromoCode: (promoCode: IPromoCode) => void
  setEditId: (id: number) => void
  promoCodeError: Error
  form: {
    // tslint:disable-next-line:no-any
    getFieldDecorator: (name: string, func: any) => any,
    setFieldsValue: (obj: { numPoints: string }) => void
    getFieldsValue: () => void
    resetFields: () => void
    validateFields: (name: (err: Error, values: object) => void) => void
   }
}

export interface IEditpromoCodeProps {
 promoCode: IPromoCode
}
