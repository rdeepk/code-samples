import Loader from '@components/Loader'
import { redirectLogin } from '@services/utils/auth'
import dateHelper from '@services/utils/formatDate'
import { Form } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import { Moment } from 'moment'
import * as React from 'react'
import {
  ReferenceList,
  SearchBar,
} from './components'
import './style.css'
import { IReferencesProps, IReferencesState } from './types'

const { removeTimezone } = dateHelper
class References extends React.Component<IReferencesProps & FormComponentProps> {
  public static getDerivedStateFromProps = (nextProps: IReferencesProps, prevState: IReferencesState) => ({
    references: nextProps.references
  })

  public state: IReferencesState = {
    references: this.props.references,
    sortColumn: '',
    sortDirection: '',
  }

  public componentDidMount() {
    if(this.props.isSuperAdmin() || this.props.isAdmin()) {
      this.getReferencesData({
        current: 1,
        pageSize: this.props.references.pagination.pageSize,
      })
    } else {
      this.props.logout()
      redirectLogin()
    }
  }

  public render() {
    const { references } = this.state
    const { error, resetMessages, toggleReferenceActivation, toggleStateError, toggleStateSuccess } = this.props
    if (!references) return <Loader />
    return (
      <div className="references">
        <SearchBar search={this.getReferencesData} totalReferences={references.pagination.itemsNumber} form={this.props.form}/>
        <ReferenceList
          error={error}
          references={references}
          getReferencesData={this.getReferencesData}
          pageSize={references.pagination.pageSize}
          resetMessages={resetMessages}
          toggleStateError={toggleStateError}
          toggleStateSuccess={toggleStateSuccess}
          totalReferences={references.pagination.itemsNumber}
          currentPage={references.pagination.currentPage}
          toggleReferenceActivation={toggleReferenceActivation}
          />
      </div>
    )
  }

  private setSortingState = (col: string, direction: string) => {
    this.setState({
      sortColumn: col,
      sortDirection: direction,
    })
  }

  private getReferencesData = (pagination?: {
    current: number,
    pageSize: number,
  }, sorter?: {
    columnKey: string,
    order: string,
  }) => {
    let sortDirection: string | null = null
    let sortColumn: string | null = null
    let currentPage: number | null = null
    if(sorter && sorter.columnKey) {
      if(!sorter.order) sorter.order = 'descend'
      sortColumn = sorter.columnKey
      sortDirection = sorter.order === 'descend' ? 'desc' : 'asc'
      if(sortColumn !== this.state.sortColumn || sortDirection !== this.state.sortDirection) {
        currentPage = 1
      }
      this.setSortingState(sortColumn, sortDirection)
    }
    this.props.form.validateFields((err: Error, values: {
      txtSearchText: string
      dtStartDate: Moment
      dtEndDate: Moment
    }) => {
      if (!err) {
        const data = {
          dateFrom: values.dtStartDate ? removeTimezone(values.dtStartDate).format('YYYY-MM-DD') : null,
          dateTo: values.dtEndDate ? removeTimezone(values.dtEndDate).format('YYYY-MM-DD'): null,
          keyword: values.txtSearchText,
          pagination: {
            currentPage: currentPage || (pagination && pagination.current) || 1,
            pageSize: this.props.references.pagination.pageSize,
          },
          sortColumn,
          sortDirection,
        }
        this.props.fetchReferences(data)
      }
    })
  }
}

export default Form.create()(References)
