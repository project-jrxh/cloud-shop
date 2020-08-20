import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Error from './pages/Error'
import './app.less'

export default class App extends Component {
  render() {
    return (
      <div id="app">
        <div id="content">
          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/error" component={Error}></Route>
            <Route path="/" component={Home}></Route>
          </Switch>
        </div>
      </div>
    )
  }
}
