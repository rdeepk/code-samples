const AgreementQueries = {
  getAgreements: () => {
    const query = `query{
      getAgreements{
        statusCode
        msg
        agreementList{
          ID
          Type
          Language
          Terms
          TypeValue
        }
      }
    }`
    return query
  },

  /* Language codes reurned for agreements
    en_US - English
    ja_JP - Japanese
  */

  saveAgreement: (type: number, language: string, terms: string) => {
    // escape double quotes
    let escapedTerms =  terms.replace(/\\([\s\S])|(")/g,"\\$1$2")
    // change new line to <br />
    escapedTerms = escapedTerms.replace(/\n\r?/g, '<br />')
    const query = `mutation{
      saveAgreement(agreement:{
        type: ${type}
        language:"${language}"
        terms:"${escapedTerms}"
      }
      ){
        statusCode
        msg
        agreementId
      }
    }`
    return query
  },
  
}

export default AgreementQueries
