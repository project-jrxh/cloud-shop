import React, { Component } from "react";
import PubSub from "pubsub-js";
import "./index.less";
import request from "../../../api/request";

export default class Result extends Component {
  state = {
    sortMode: 0, // 0表示综合、1表示价格
    priceUpOrDown: "",
    key: "",
    searchGoodsList: null,
    recommentList: [],
  };
  // 组件加载完成的的生命周期钩子
  componentDidMount = () => {
    PubSub.subscribe("getSearchKeyWord", (msg, data) => {
      this.setState({
        key: data,
      });
    });
    PubSub.subscribe("getSearchGoodsList", (msg, data) => {
      this.setState({
        searchGoodsList: data,
      });
    });
    this.getRecommendList();
  };
  // 获取为你推荐商品
  getRecommendList = async () => {
    const { data } = await request.reqGetRecommendList();
    // 保留四条数据
    const hotProduct = data.data.hotProduct.splice(0, 4);
    this.setState({
      recommentList: hotProduct,
    });
  };
  // 点击综合排序
  handleComOrder = async () => {
    this.setState({
      sortMode: 0,
      priceUpOrDown: "",
    });
    // 发送请求重新获取数据
    const { data } = await request.reqGetGoodsByKeyWord(this.state.key);
    // 更新状态数据
    this.setState({
      searchGoodsList: data.products,
    });
  };
  // 点击价格排序
  handlePriceOrder = async () => {
    this.setState({
      sortMode: 1,
    });
    // 升序
    if (this.state.priceUpOrDown !== 0) {
      this.setState({
        priceUpOrDown: 0,
      });
      const { data } = await request.reqGetGoodsByPlaceholder(
        20,
        0,
        this.state.key,
        "price_asc"
      );
      // 更新状态数据
      this.setState({
        searchGoodsList: data.products,
      });
      // 降序
    } else if (this.state.priceUpOrDown === 0) {
      this.setState({
        priceUpOrDown: 1,
      });
      const { data } = await request.reqGetGoodsByPlaceholder(
        20,
        0,
        this.state.key,
        "price_desc"
      );
      // 更新状态数据
      this.setState({
        searchGoodsList: data.products,
      });
    }
  };

  render() {
    const searchGoodsList = this.state.searchGoodsList;
    const recommentList = this.state.recommentList;
    // let key = this.state.key;
    let isEnter = this.props.isEnter;
    if (searchGoodsList && isEnter) {
      return (
        <div className="searchResultWrapper">
          <div className="searchResult">
            <div className="sortOrder">
              <span
                className="comprehensive "
                className={this.state.sortMode === 0 ? "active" : ""}
                onClick={this.handleComOrder}
              >
                综合
              </span>
              <span
                className="byPrice"
                className={this.state.sortMode === 1 ? "active" : ""}
                onClick={this.handlePriceOrder}
              >
                价格
                <i
                  className={
                    this.state.priceUpOrDown === 0
                      ? "active iconfont icon-jiantou"
                      : " iconfont icon-jiantou"
                  }
                ></i>
                <i
                  className={
                    this.state.priceUpOrDown === 1
                      ? "iconfont icon-Down_arrow active"
                      : "iconfont icon-Down_arrow"
                  }
                ></i>
              </span>
            </div>
          </div>
          <ul className="resultList">
            {searchGoodsList &&
              searchGoodsList.map((item) => (
                <li className="resultItem" key={item.id}>
                  <img src={item.coverUrl} alt="" />
                  <div className="desc">
                    <h3>{item.name}</h3>
                    <p className="price">￥{item.minPrice}</p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      );
    } else if (!searchGoodsList && isEnter) {
      return (
        <div className="otherResult">
          <div className="nothing">
            <i className="iconfont icon-shangpin"></i>
            <p>您寻找的商品还未上架</p>
          </div>
          <div className="recommend">
            <div className="recTitle">为你推荐</div>
            <ul className="recommendList">
              {recommentList &&
                recommentList.map((item) => (
                  <li className="recItem" key={item.id}>
                    <img src={item.products.coverUrl} alt="" />
                    <div className="desc">
                      <h3>{item.name}</h3>
                      <p className="price">￥{item.products.minPrice}</p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
