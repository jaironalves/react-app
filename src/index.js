import React from 'react'
import { render as ReactDOMRender } from 'react-dom'
import App from './App'

ReactDOMRender(
        <App />,            
        document.querySelector('[data-js="app"]')
)

module.hot.accept()