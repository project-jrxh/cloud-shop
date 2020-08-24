import axios from "axios";
export default {
  // 封装获取数据的方法
  // 获取热门搜索列表
  reqGetHotSearchList() {
    return axios({
      url: "/store/api/searchsuggest/get",
      method: "GET",
    });
  },
  // 通过关键字获取商品数据
  reqGetGoodsByKeyWord(key) {
    return axios({
      url: "/store/api/product/search?key=" + key,
      method: "POST",
    });
  },
  // 通过placeholder的内容获取商品数据
  reqGetGoodsByPlaceholder(limit = 20, offset = 0, key, sort) {
    return axios({
      url: "/store/api/product/search",
      method: "POST",
      params: { limit, offset, key, sort },
    });
  },
  // 获取为你推荐的商品
  reqGetRecommendList() {
    return axios({
      url: "/store/api/hotproduct_v2/gets",
      method: "GET",
    });
  },
};
