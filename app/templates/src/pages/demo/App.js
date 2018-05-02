import React from 'react'
import {
  withRouter, 
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Demo1 from './Demo1'
import Demo2 from './Demo2'

export default class App extends React.Component{
  render(){
    
    return (
      <div>
        啊啊啊
        <Router>
          <Switch>
            <Route exact path="/" component={Demo1}/>
            <Route exact path="/demo1" component={Demo1}/>
            <Route exact path="/demo2" component={Demo2}/>
          </Switch>
        </Router>
      </div>
    )
  }
}