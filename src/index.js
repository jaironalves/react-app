import React from 'react'
import { render as ReactDOMRender } from 'react-dom'
import App from './App'

import './styles.sass'

ReactDOMRender(<App />, document.querySelector('[data-js="app"]'))

if (process.env.node_env === 'development') module.hot.accept()
