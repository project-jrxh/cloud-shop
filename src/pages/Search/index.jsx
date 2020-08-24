import React, { Component } from "react";
import PubSub from "pubsub-js";
import "./index.less";
import Result from "./Result";
import request from "../../api/request";

let keyList = [];
export default class Search extends Component {
  state = {
    key: "",
    isEnter: false, //用来判断是否回车
    isShowDel: false,
    hotSearchGoodsList: [],
    searchGoodsList: null,
    searchHistory: [],
  };
  // 组件挂载完成
  componentDidMount() {
    this.getHotSearchList();
  }
  // 状态数据更新的的生命周期钩子
  componentDidUpdate() {
    PubSub.publish("getSearchKeyWord", this.state.key);
    PubSub.publish("getSearchGoodsList", this.state.searchGoodsList);
  }
  // 搜索框输入事件
  handleChange = (e) => {
    // 获取用户输入内容
    this.setState({
      key: e.target.value,
    });
    if (!e.target.value) {
      this.setState({
        searchGoodsList: null,
        isEnter: false,
      });
    }
  };
  // 点击搜索框尾部按钮清空输入框内容
  handleDelValue = () => {
    this.setState({
      key: "",
      searchGoodsList: null,
      isEnter: false,
    });
  };
  // 点击图标删除历史记录
  handleDelHistory = (e) => {
    console.log(e);
    e.persist();
  };
  // 封装获取热门搜索商品列表
  async getHotSearchList() {
    const res = await request.reqGetHotSearchList();
    this.setState({
      hotSearchGoodsList: res.data.data.configKey,
      placeholder: res.data.data.defaultKey,
    });
  }
  // 键盘抬起事件
  getKeyWord = async (e) => {
    const key = this.state.key;
    // 输入内容回车搜索商品
    if (e.keyCode === 13) {
      if (key) {
        const { data } = await request.reqGetGoodsByKeyWord(key);
        this.setState({
          searchGoodsList: data.products,
          isEnter: true,
        });
        // 调用函数过滤并保存搜索历史
        this.filter(key);
      } else {
        const { data } = await request.reqGetGoodsByPlaceholder(20, 0, "降噪");
        keyList.push("降噪");
        this.setState({
          searchGoodsList: data.products,
          isEnter: true,
          key: "降噪",
        });
        // 调用函数过滤并保存搜索历史
        this.filter("降噪");
      }
    }
  };
  // 点击热门搜索的选项
  handleClickHotList = async (e) => {
    // 点击的热门搜索内容
    let hotKey = e.target.innerText;
    const { data } = await request.reqGetGoodsByPlaceholder(20, 0, hotKey);
    // keyList.push(hotKey);
    this.setState({
      searchGoodsList: data.products,
      isEnter: true,
      key: hotKey,
    });
    // 调用函数过滤并保存搜索历史
    this.filter(hotKey);
  };
  // 封装一个函数过滤历史记录并改变状态
  filter = (key) => {
    keyList.push(key);
    let filteredKey = [];
    keyList.forEach((item) => {
      if (filteredKey.indexOf(item) === -1) {
        filteredKey.push(item);
      }
    });
    // 改变状态
    this.setState({
      searchHistory: [...filteredKey],
    });
  };

  render() {
    const hotSearchGoodsList = this.state.hotSearchGoodsList;
    // const searchGoodsList = this.state.searchGoodsList;
    const searchHistory = this.state.searchHistory;
    return (
      <div className="searchContainer">
        {/* 搜索头部 */}
        <div className="searchTop">
          <div className="searchInput">
            <input
              type="text"
              placeholder={this.state.placeholder}
              value={this.state.key}
              onChange={this.handleChange}
              onKeyUp={this.getKeyWord}
            />
            <div className="searchIcon">
              <i className="iconfont icon-search"></i>
            </div>
            <div className="cancelInput">
              <i
                className="iconfont icon-chacha1"
                onClick={this.handleDelValue}
                // className={isShowDel ? "showDel" : ""}
              ></i>
            </div>
          </div>
        </div>
        {/* 热门搜索及搜索历史  */}
        {this.state.key && !this.state.isEnter ? (
          <div className="list">
            <a href="#" className="searchHint">
              搜索 " {this.state.key} "
            </a>
          </div>
        ) : (
          !this.state.isEnter && (
            <div className="otherList">
              <div className="hotSearch">
                <h2>热门搜索</h2>
                <ul className="hotList">
                  {hotSearchGoodsList.map((item, index) => (
                    <li
                      className="hotItem"
                      key={index}
                      onClick={this.handleClickHotList}
                    >
                      <a>{item[index + 1]}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="searchRecords">
                <ul className="recordList">
                  {searchHistory.map((item, index) => (
                    <li className="recordItem" key={index}>
                      <i className="iconfont icon-shijian"></i>
                      <a href="#">{item}</a>
                      <i
                        className="iconfont icon-chacha"
                        onClick={this.handleDelHistory}
                      ></i>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        )}

        {
          // searchGoodsList && this.state.key ? (
          <Result isEnter={this.state.isEnter} />
          // ) : null
          // <div className="nothing">
          //   <i className="iconfont icon-shangpin"></i>
          //   <p>您寻找的商品还未上架</p>
          // </div>
        }
      </div>
    );
  }
}
