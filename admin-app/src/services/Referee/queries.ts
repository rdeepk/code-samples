const RefereeQueries = {
  getReferees: (searchText: string) => {
    const query = `query{
      getReferees(
        searchText:"${searchText}"
      )
      {
        Suspended
        RefereeID
        RefereeName
        Email
        TotalReferences
      }
    }`
    return query
  },
  
  suspendReferee: (refereeId: number) => {
    const query = `mutation{
      suspendReferee(
        refereeId:"${refereeId}"
      )
      {
        statusCode
        msg
      }
    }`
    return query
  },
  
  unsuspendReferee: (refereeId: number) => {
    const query = `mutation{
      unsuspendReferee(
        refereeId:"${refereeId}"
      )
      {
        statusCode
        msg
      }
    }`
    return query
  }
}

export default RefereeQueries
