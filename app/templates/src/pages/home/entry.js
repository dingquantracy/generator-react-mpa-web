import React from 'react'
import ReactDOM from 'react-dom'
import Homepage from './Homepage'
import './style.css'
import '../../common/asset/css/iconfont.css'

window.addEventListener('DOMContentLoaded', () => {

  const data = window.__ssr_data

  ReactDOM.hydrate(<Homepage title={data}/>, document.getElementById('app'), ()=>{
    console.log('hydrate -- done')
    console.log(data)
  })
})
