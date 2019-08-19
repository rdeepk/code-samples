import { deletePromoCode, fetchPromoCodes, savePromoCode } from '@store/PromoCodes/actions'
import * as Selectors from '@store/PromoCodes/reducers'
import { IPromoCode } from '@store/PromoCodes/types'
import { IAppState } from '@store/types'
import { userSelectors } from '@store/User'
import { logout } from '@store/User/actions'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import PromoCodes from './PromoCodes'

const mapStateToProps = (state: IAppState) => ({
  getPromoCodes: () => Selectors.getPromoCodes(state),
  isAdmin: () => userSelectors.isAdmin(state.user),
  isSuperAdmin: () => userSelectors.isSuperAdmin(state.user),
  promoCodeError: state.promoCodes.error,
  promoCodes: Selectors.getPromoCodes(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  deletePromoCode: (id: number) => dispatch(deletePromoCode(id)),
  fetchPromoCodes: (searchText: string) => dispatch(fetchPromoCodes(searchText)),
  logout:() => dispatch(logout()),
  savePromoCode: (promoCode: IPromoCode) => dispatch(savePromoCode(promoCode)),
})

export { PromoCodes }

// @ts-ignore - TODO: Resolve issue with type not matching properly
export default connect(mapStateToProps, mapDispatchToProps)(PromoCodes)
