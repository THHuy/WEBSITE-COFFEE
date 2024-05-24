const express = require("express");
const app = express();
const port = 3000;
//Khai báo các package
//body parser để đọc được các file json
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

//Method override để gọi truy vấn trên HTML
var methodOverride = require("method-override");
app.use(methodOverride("_method"));
// Thu vien handlebars
const path = require("path");
const { engine } = require("express-handlebars");
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);
//Cấu hình session
const session = require('express-session');
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));
app.use(express.static(path.join(__dirname, "/public")));
// Khai báo truy cập đến file routes
const route = require("./router");
route(app);
app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
