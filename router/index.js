const homeRouter = require("./home.route");
const quanliRouter = require("./quanli.route");
const nhanVienRouter = require("./nhanvien.route")
function route(app) {
  app.use("/", homeRouter);
  app.use("/quanli", quanliRouter);
  app.use("/nhanvien", nhanVienRouter);
}

module.exports = route;
