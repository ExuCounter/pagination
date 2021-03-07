import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { MainPage } from './components/@main/index'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import StyledTheme from 'components/shared/styled-theme'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={StyledTheme}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={MainPage} exact />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
