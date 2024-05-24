const data = require("../models/server");
const database = new data();
class homeController {
  //[GET] /home
  index(req, res, next) {
    res.render("./home/home");
  }
  //[GET] /home/dat-hang
  dathang(req, res, next) {
    database.seclectWater((err, data) => {
      if (err) {
        res.status(500).json({ error });
        return;
      }
      res.render("./home/dathang", { data });
    });
  }

  //[GET] /datban
  datban(req, res, next) {
    res.render("./home/datban");
  }
  //[POST]/addCart
  async addCart(req, res, next) {
    const {
      masp,
      tenkh,
      sdt,
      dateship,
      address,
      timeship,
      note,
      tensp,
      sl,
      total,
    } = req.body;
    try {
      await database.createOrder(
        masp,
        tenkh,
        sdt,
        dateship,
        address,
        timeship,
        note,
        tensp,
        sl,
        total
      );
      res.redirect("back");
    } catch (error) {
      console.log(error);
    }
  }
  async adddatban(req, res, next) {
    const tenkh = req.body.tenkh;
    const sdt = req.body.sdt;
    const sln = req.body.sln;
    const date = req.body.ngay;
    const time = req.body.thoigian;
    const note = req.body.note;
    try {
      await database.addBan(tenkh, sdt, sln, date, time, note);
      res.redirect("back");
    } catch (err) {
      console.log(err);
    }
  }
  //[POST] /login
  async login(req, res, next) {
    const { username, pwd } = req.body;
    try {
      // Nếu đăng nhập thành công, chuyển hướng hoặc thực hiện hành động tiếp theo

      await database.checkLogin(username, pwd, (err, user) => {
        if (user.length === 0) {
          res.render("./home/home", {
            error: "Tên đăng nhập hoặc mật khẩu không chính xác.",
          });
        } else {
          user.forEach((element) => {
            if (element.roles === "admin") {
              req.session.username = username;
              res.redirect("/quanli");
            } else {
              const tennv = element.tennv;
              const manv = element.manv;
              req.session.username = tennv;
              req.session.manv = manv;
              res.redirect("/nhanvien/dashboard");
            }
          });
        }
      });
    } catch {}
  }
  //Đăng xuất
  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        // Chuyển hướng người dùng về trang đăng nhập
        res.redirect("http://localhost:3000");
      }
    });
  }
}
module.exports = new homeController();
