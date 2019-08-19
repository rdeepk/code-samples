const UserQueries = {

  Login: (email: string, password: string) => {
    const query = `mutation{
      adminLogin(
        email:"${email}"
        password:"${password}"
      )
      {
        statusCode
        msg
        user
        {
          UserID
          EMailConfirmed
          ReferencesCount
          roles
        }
      }
    }`
    return query
  },

  GetUser: () => {
    const query = `query{
      adminUser{
        user {
          UserID
          FirstName
          LastName
          EMail
          EMailConfirmed
          DateOfBirth
          PhoneNumber
          RegisterDate
          LastUpdateDate
          PictureLink
          Gender
          Address1
          Address2
          City
          PostalCode
          ProvinceID
          CountryID
        }
      }
    }`
    return query
  },
  
  Logout : () => {  
    const query = `mutation{
      logout {
        statusCode
        msg
      }
    }`
      return query
  },

}

export default UserQueries
