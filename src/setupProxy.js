const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://music.163.com",
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};
