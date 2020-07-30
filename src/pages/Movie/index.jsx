import React, { Component } from 'react'
import './css/index.css'

export default class index extends Component {
  render () {
    return (
      <>
        <div id="content">
          <section className="content-item active">
            <div className="top">
              <div className="left">
                <div className="city">广州</div>
                <img src="/assets/img/Triangle.png" alt="" />
              </div>
              <div className="center">
                <span>星光大道测试影院</span>
              </div>
              <img className="right" src="/assets/img/nav_filter.png" alt="" />
            </div>
            <div className="banner">
              <img src="/assets/img/pub2.jpg" alt="" />
            </div>
            <div className="tab">
              <div className="active">正在热映</div>
              <div>即将上映</div>
            </div>
            <div className="movie">
              <div className="movie-item">
                <div className="movie-top">
                  <div className="movie-img">
                    <img src="/assets/img/poster.jpg" alt="" />
                  </div>
                  <div className="movie-info">
                    <div className="movie-title-wrap">
                      <div className="movie-title">勇气、友情、希望、光芒、知识、爱心、纯真、诚实</div>
                      <span className="movie-type">IMAX</span>
                    </div>
                    <div className="movie-detail">
                      <div className="info director">
                        <em>导演：</em>
                        <span>乔阿吉姆</span>
                      </div>
                      <div className="info protagonist">
                        <em>主演：</em>
                        <span>约翰尼</span>
                      </div>
                      <div className="info time-language">
                        <em>时长：</em>
                        <span>120分钟/英语</span>
                      </div>
                      <div className="label-wrap">
                        <div className="label">首映</div>
                        <div className="label">特惠</div>
                        <div className="label">明星</div>
                        <div className="label">点映</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="movie-bottom">
                  <div className="session">

                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="content-item">商城</section>
          <section className="content-item">活动</section>
          <section className="content-item">我的</section>
        </div>
        {/* 底部导航 */}
        <footer id="footer">
          <div className="footer-item">
            <div className="icon active"></div>
            <div className="icon-text active">购票</div>
          </div>
          <div className="footer-item">
            <div className="icon"></div>
            <div className="icon-text">商城</div>
          </div>
          <div className="footer-item">
            <div className="icon"></div>
            <div className="icon-text">活动</div>
          </div>
          <div className="footer-item">
            <div className="icon"></div>
            <div className="icon-text">我的</div>
          </div>
        </footer>
      </>
    )
  }
}
