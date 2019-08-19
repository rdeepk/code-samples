const DownloadFile = (buffer: Buffer, fileType: string, fileName: string) => {
  const newBlob = new Blob([buffer], { type: fileType || 'text/csv' })
  // IE doesn't allow using a blob object directly as link href
  // instead it is necessary to use msSaveOrOpenBlob
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(newBlob)
    return
  }

  // For other browsers:
  // Create a link pointing to the ObjectURL containing the blob.
  const data = window.URL.createObjectURL(newBlob)
  const link = document.createElement('a')
  link.href = data
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  setTimeout(() => {
    // For Firefox it is necessary to delay revoking the ObjectURL
    window.URL.revokeObjectURL(data)
  }, 100)
  document.body.removeChild(link)
}

export default DownloadFile
