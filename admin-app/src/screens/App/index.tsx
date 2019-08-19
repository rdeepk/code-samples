import store from '@src/store'
import { LocaleProvider } from 'antd'
import en_US from 'antd/lib/locale-provider/en_US'
import * as React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import AppLayout from './Layout'

const App: React.SFC = () => (
  <ReduxProvider store={store}>
    <LocaleProvider locale={en_US}>
      <AppLayout />
    </LocaleProvider>
  </ReduxProvider>
)

export default App