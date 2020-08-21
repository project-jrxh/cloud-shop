import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import REM from './rem'
REM()
window.onresize = () => {
  REM()
}

ReactDOM.render(<App />, document.getElementById('root'))
