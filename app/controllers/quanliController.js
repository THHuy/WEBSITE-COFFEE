const data = require("../models/server");
const database = new data();
class quanliController {
  //[GET] /quanli
  index(req, res, next) {
    const user = req.session.username;
    res.render("./quanli/mainquanli", { user });
  }
  //[GET] /quanli/quanli-donhang
  qldonhang(req, res, next) {
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
            res.render("./quanli/qldathang", {
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
  //[POST] /quanli/thanhtoan
  async createHoaDon(req, res, next) {
    const { masp, tensp, sl, total, tabl, manv } = req.body;
    try {
      await database.createHoaDon(masp, tensp, sl, total, tabl, manv);
      res.redirect("back");
    } catch (err) {
      console.log(err);
    }
  }
  //[GET] /quanli/sanpham
  sanpham(req, res, next) {
    database.seclectWater((err, data) => {
      if (err) {
        res.status(500).json({ error: "Error fetching users" });
        return;
      }
      const user = req.session.username;
      const manv = req.session.manv;
      res.render("./quanli/qlsp", { data, user, manv });
    });
  }
  //[PUT] /quanli/suaMenu
  suaMenu(req, res, next) {
    const { editMaMon, editTenMon, editGiaMon } = req.body;
    var price = parseFloat(editGiaMon);
    try {
      database.updateMenu(editMaMon, editTenMon, price);
      res.redirect("back");
    } catch {
      console.log(next);
    }
  }
  //[POST] /quanli/addMenu
  async addMenu(req, res, next) {
    const { tenMon, giaMon } = req.body;
    try {
      await database.addMenu(tenMon, giaMon);
      res.redirect("back");
    } catch (err) {
      console.log(err);
    }
  }
  //[PUT] /quanli/deleteMenu
  async deleteMenu(req, res, next) {
    const id = req.query.masp;
    try {
      await database.deleteMenu(id);
      res.redirect("back");
    } catch (err) {
      console.log(err);
    }
  }
  //[GET] /quanli/nhanvien
  nhanvien(req, res, next) {
    database.selectNV((err, data) => {
      if (err) {
        console.log(err);
      }
      const user = req.session.username;
      const manv = req.session.manv;
      res.render("./quanli/qlnv", { data, user, manv });
    });
  }
  //[POST] /quanli/themNV
  async themNV(req, res, next) {
    const { employeeId, employeeName, sex, phoneNumber, position, salary } =
      req.body;
    try {
      await database.addNhanVien(
        employeeId,
        employeeName,
        sex,
        phoneNumber,
        position,
        salary
      );
      res.redirect("back");
    } catch (error) {
      console.log(error);
    }
  }
  //[PUT] /quanli/editNv
  async editNv(req, res, next) {
    const {
      editEmployeeId,
      editEmployeeName,
      sex,
      editPhoneNumber,
      editPosition,
      editSalary,
    } = req.body;
    //Bỏ tất cả kí tự chỉ lấy số
    const regex = /\d{1,3}(,\d{3})*/;
    const matches = editSalary.match(regex);
    var number;
    if (matches && matches.length >= 0) {
      number = matches[0]; // Lấy số đầu tiên trong mảng matches
    }
    try {
      await database.updateNhanVien(
        editEmployeeId,
        editEmployeeName,
        sex,
        editPhoneNumber,
        editPosition,
        number
      );
      res.redirect("back");
    } catch {
      res.status(404);
    }
  }
  //[PATCH] /quanli/deletedNv
  async deletedNv(req, res, next) {
    const manv = req.query.manv;
    try {
      await database.deletedNhanVien(manv);
      res.redirect("back");
    } catch {
      console.log(next);
    }
  }
  //[PATCH] /quanli/doneOrder
  async doneOrder(req, res, next) {
    const makh = req.query.makh;
    try {
      await database.doneOrder(makh);
      res.redirect("back");
    } catch (error) {
      res.status(404).json(error);
    }
  }
  //[PATCH] /quanli/doneBook
  async doneBook(req, res, next) {
    const makh = req.query.makh;
    try {
      await database.doneBook(makh);
      res.redirect("back");
    } catch (error) {
      res.status(404).json(error);
    }
  }
}
module.exports = new quanliController();
