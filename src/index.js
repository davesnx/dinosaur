import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const width = 800
const height = 300
const scale = window.devicePixelRatio

ReactDOM.render(
  <App width={width} height={height} scale={scale} />,
  document.getElementById('root')
)
