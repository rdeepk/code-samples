import { IPromoCode } from '@store/PromoCodes/types'
export interface IPromoCodeProps {
  promoCodes: ReadonlyArray<IPromoCode>
  getPromoCodes: () => ReadonlyArray<IPromoCode>
  fetchPromoCodes: (searchText: string) => void
  savePromoCode: (promoCode: IPromoCode) => void
  deletePromoCode: (id: number) => void
  isAdmin: () => boolean
  isSuperAdmin: () => boolean
  logout: () => void
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

export interface IPromoCodeState {
  promoCodes: ReadonlyArray<IPromoCode>,
  isModalVisible: boolean
  editCodeId: number
  editMode: boolean
  promoCodeError: Error
}
