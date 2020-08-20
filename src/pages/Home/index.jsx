import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Footer from '../../component/Footer'
import My from '../My'
import Shop from '../Shop'
import Search from '../Search'
import Categroy from '../Categroy'

export default class Movie extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route path="/my" component={My}></Route>
          <Route
            style="backgroundImage:url('/assets/img/Charging')"
            path="/shop"
            component={Shop}
          ></Route>
          <Route path="/search" component={Search}></Route>
          <Route path="/categroy" component={Categroy}></Route>
          <Redirect to="/"></Redirect>
        </Switch>
        <Footer></Footer>
      </>
    )
  }
}
