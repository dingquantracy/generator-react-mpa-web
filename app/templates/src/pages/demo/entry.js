import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './style.css'

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App/>, document.getElementById('app'), ()=>{
    console.log('React page rendered')
  })
})
