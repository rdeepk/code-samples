const ReferenceQueries = {
  getReferences: (data: {
    keyword?: string
    dateFrom?: string
    dateTo?: string
    sortColumn?: string
    sortDirection?: string
    pagination?: {
      currentPage: number
      pageSize: number
    }
  }) => {
    const { keyword, dateFrom, dateTo, sortColumn, sortDirection, pagination } = data
    const query = `query{
      getReferencesAdmin(
        keyword: "${keyword || ''}"
        dateFrom: "${dateFrom || ''}"
        dateTo: "${dateTo || ''}"
        sortColumn: "${sortColumn || ''}"
        sortDirection: "${sortDirection || ''}"
        pagination: {
          currentPage: ${pagination && pagination.currentPage}
          pageSize: ${pagination && pagination.pageSize}
        }
      ){
        statusCode
        msg
        references{
          referenceId
          referenceName
          referenceDate
          refereeName
          state
        }
        pagination{
          currentPage
          pageSize
          pagesNumber
          itemsNumber
        }
      }
    }`
    return query
  },

  deactivateReference: (referenceId: number) => {
    return `mutation{deactivateReference(referenceId: ${referenceId}) {
      msg
      statusCode
    }}`
  },

  reactivateReference: (referenceId: number) => {
    return `mutation{reactivateReference(referenceId: ${referenceId}) {
      msg
      statusCode
    }}`
  },
}

export default ReferenceQueries
