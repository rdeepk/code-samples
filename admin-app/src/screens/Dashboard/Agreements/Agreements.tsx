import Loader from '@components/Loader'
import { redirectLogin } from '@services/utils/auth'
import { RichEditor } from '@src/components'
import { IAgreementType, IMappedAgreement } from '@store/Agreements/types'
import { Button, Col, Form, Row, Select } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import * as React from 'react'
import './styles.css'
import { IAgreementsProps } from './types'

const Option = Select.Option

class Agreements extends React.Component<IAgreementsProps & FormComponentProps> {

  public state = {
    agreementEditMode: false,
    agreementIndex: 0,
    agreementLanguage: '',
    agreementText: '',
    languageList: [],
    unsavedAgreementInEditor: '',
  }

  public componentDidMount() {
    if(this.props.isSuperAdmin() || this.props.isAdmin()) {
      this.props.fetchAgreements()
    } else {
      this.props.logout()
      redirectLogin()
    }
  }

  public render() {
    const { agreements } = this.props
    return !agreements ? <Loader />
      : this.renderAgreements()
  }

  private changeLanguage = (value: string) => {
    const agreements = this.props.agreements[this.state.agreementIndex].agreements.filter((agreement: IMappedAgreement) => {
      return agreement.language === value
    })
    this.setState({
      agreementLanguage: value,
      agreementText: agreements[0].terms,
    })
  }

  private changeAgreement = (value: string) => {
    const agreements = this.props.agreements[value].agreements.filter((agreement: IMappedAgreement) => {
      return agreement.language === 'en_US'
    })
    this.setState({
      agreementIndex: Number(value),
      agreementLanguage: 'en_US',
      agreementText: agreements[0].terms,
      languageList: this.props.agreements[value].agreements.map((agreement: IMappedAgreement) => {
        return agreement.language
      })
    })
  }

  private toggleEditMode = () => {
    if(!this.state.agreementEditMode) {
      this.setState({ unsavedAgreementInEditor: this.state.agreementText })
    }
    this.setState({
      agreementEditMode: !this.state.agreementEditMode,
    })
  }

  private saveAgreement = () => {
    this.toggleEditMode()
    const data = {
      Language: this.state.agreementLanguage,
      Terms: this.state.unsavedAgreementInEditor,
      Type: this.props.agreements[this.state.agreementIndex].type
    }
    this.props.saveAgreement(data)
    this.setState({
      agreementText: this.state.unsavedAgreementInEditor
    })
  }

  private editAgreement = () => {
    this.toggleEditMode()
    return
  }

  private cancelEditMode = () => {
    this.toggleEditMode()
  }

  private setAgreementText = (text: object) => {
    this.setState({ unsavedAgreementInEditor: text })
  }

  private getAgreementTitleForEditMode = () => {
    if(this.props.agreements[this.state.agreementIndex]) {
      return this.props.agreements[this.state.agreementIndex].typeValue
    }
    return ''
  }

  private renderAgreements = () => {
    const agreementTypes = this.props.agreements.map((agreementType: IAgreementType, index) => {
      return <Option key={agreementType.type} value={index}>{agreementType.typeValue}</Option>
    })
    const languageList = this.state.languageList.map((language, index) => {
      return <Option key={index} value={language}>{language}</Option>
    })

    const agreementEditForm = (
      <Col xs={24} className="edit-agreement">
        <Form onSubmit={this.saveAgreement}>
          <RichEditor form={this.props.form} text={this.state.agreementText} setAgreementText={this.setAgreementText} agreementTitle={this.getAgreementTitleForEditMode()} />
          <Button htmlType="submit" type="primary">Save</Button>
          <Button type="primary" onClick={this.cancelEditMode}>Cancel</Button>
        </Form>
      </Col>
    )

    const displayAgreements = (
      <div>
        <Col span={6}>
          <h2>Agreements</h2>
          <Select defaultValue="Select Agreement" style={{ width: '100% '}} onChange={this.changeAgreement}>
            {agreementTypes}
          </Select>
          <h2>Language</h2>
          <Select value={this.state.agreementLanguage} style={{ width: '100%' }} onChange={this.changeLanguage}>
            {languageList}
          </Select>
        </Col>
        <Col xs={24} lg={{offset: 1, span: 17 }}>
          <div className="agreementText" dangerouslySetInnerHTML={{ __html: this.state.agreementText }} />
          {this.props.isSuperAdmin() && <Button type="primary" onClick={this.editAgreement}>Edit</Button>}
        </Col>
      </div>
    )
    return (
      <div className="agreements">
        <Row>
          {this.state.agreementEditMode ? agreementEditForm : displayAgreements}
        </Row>
      </div>
    )
  }
}

export default Form.create()(Agreements)
