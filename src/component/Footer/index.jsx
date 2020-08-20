import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './index.less'

export default class Footer extends Component {
  render() {
    return (
      <footer id="footer">
        <NavLink className="footer-item" to="/search">
          <div className="icon"></div>
          <div className="icon-text">搜索</div>
        </NavLink>
        <NavLink className="footer-item" to="/categroy">
          <div className="icon"></div>
          <div className="icon-text">分类</div>
        </NavLink>
        <NavLink className="footer-item" to="/shop">
          <div className="icon"></div>
          <div className="icon-text">购物车</div>
        </NavLink>
        <NavLink className="footer-item" to="/my">
          <div className="icon"></div>
          <div className="icon-text">我的</div>
        </NavLink>
      </footer>
    )
  }
}
