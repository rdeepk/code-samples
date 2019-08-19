import Loader from '@components/Loader'
import { redirectLogin } from '@services/utils/auth'
import { Form } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import * as React from 'react'
import { PromoCodeList } from './components'
import { IPromoCodeProps, IPromoCodeState } from './types'

class PromoCodes extends React.Component<IPromoCodeProps & FormComponentProps> {
  public static getDerivedStateFromProps = (nextProps: IPromoCodeProps, prevState: IPromoCodeState) => ({
    promoCodeError: nextProps.promoCodeError,
    promoCodes: nextProps.promoCodes,
  })

  public state: IPromoCodeState = {
    editCodeId: 0,
    editMode: false,
    isModalVisible: false,
    promoCodeError: this.props.promoCodeError,
    promoCodes: this.props.promoCodes,
  }

  public componentDidMount() {
    if(this.props.isSuperAdmin() || this.props.isAdmin()) {
      this.props.fetchPromoCodes('')
    } else {
      this.props.logout()
      redirectLogin()
    }
  }

  public toggleModalVisibility = () => {
    this.setState((prevState: {isModalVisible: boolean}) => ({
      isModalVisible: !prevState.isModalVisible
    }))
  }

  public toggleEditMode = () => {
    this.setState((prevState: {editMode: boolean}) => ({
      editMode: !prevState.editMode
    }))
  }

  public setEditId = (id: number) => {
    this.setState({
      editCodeId: id,
    })
  }

  public render() {
    const { promoCodes } = this.state
    if (!promoCodes) return <Loader />
    return (
      <div>
        <PromoCodeList
          promoCodes={promoCodes}
          toggleVisible={this.toggleModalVisibility}
          isVisible={this.state.isModalVisible}
          editCodeId={this.state.editCodeId}
          setEditId={this.setEditId}
          savePromoCode={this.props.savePromoCode}
          editMode={this.state.editMode}
          toggleEditMode={this.toggleEditMode}
          deletePromoCode={this.props.deletePromoCode}
          promoCodeError={this.state.promoCodeError}
          form={this.props.form}
          />
      </div>
    )
  }
}

export default Form.create()(PromoCodes)
