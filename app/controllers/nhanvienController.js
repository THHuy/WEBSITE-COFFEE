const data = require("../models/server");
const database = new data();
class nhanvienController {
  //[GET] /nhanvien
  index(req, res, next) {
    const user = req.session.username;
    res.render("./nhanvien/mainnv", { user});
  }
  //[GET] /nhanvien/dathang
  dathang(req, res, next) {
    database.selectAddTable((err, listAddtable) => {
      database.seclectOrder((err, listOrder) => {
        database.seclectWater((err, listWater) => {
          database.seclectTable((err, listTable) => {
            if (err) {
              res.status(500).json({ error: "Error fetching users" });
              return;
            }
            const user = req.session.username;
            const manv = req.session.manv;
            res.render("./nhanvien/qldhnv", {
              listAddtable,
              listOrder,
              listWater,
              listTable,
              user,
              manv,
            });
          });
        });
      });
    });
  }
}
module.exports = new nhanvienController();
