import App from '@screens/App'
// TODO: Webpack needs to be properly configured to support less
import 'antd/dist/antd.css'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
