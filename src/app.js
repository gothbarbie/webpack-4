import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

function render(Component) {
  ReactDOM.render(
    <AppContainer>
      <h1>Welcome to React</h1>
    </AppContainer>,
    document.getElementById('root')
  )
}
