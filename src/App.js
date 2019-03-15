import React from 'react'
import Logo from './assets/logo.png'

import './styles.sass'

const App = () => (
  <React.Fragment>
    <div className="container">
      <img src={Logo} />
      <span>Ola mundo React App</span>
    </div>
  </React.Fragment>
)

export default App
