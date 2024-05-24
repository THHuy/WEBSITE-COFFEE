const { query } = require("express");
const connection = require("../../config/connectdb");
const e = require("express");
class qlchung {
  //Select table
  async seclectTable(callback) {
    const query = `SELECT * FROM listtable`;
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
  //Hiển thị nước
  async seclectWater(callback) {
    const query = `SELECT * FROM listwater WHERE delete_at IS NULL or delete_at = '0' order by masp asc`;
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
  //Tạo hàng đặt online
  async createOrder(
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
  ) {
    const query = `INSERT INTO ordernew(masp, tenkh, sdt, dateship, address, timeship, note,  tensp, sl, total) VALUE (?,?,?,?,?,?,?,?,?,?)`;
    connection.query(
      query,
      [
        [`${masp}`],
        tenkh,
        sdt,
        dateship,
        address,
        timeship,
        note,
        [`${tensp}`],
        [`${sl}`],
        total,
      ],
      (err, results) => {
        if (err) {
          return err;
        } else {
          return results;
        }
      }
    );
  }
  //Thêm bàn đặt
  async addBan(tenkh, sdt, sln, ngay, thoigian, note) {
    const query = `INSERT INTO book(tenkh, sdt, sln, ngay, thoigian, note) VALUE (?,?,?,?,?,?)`;
    connection.query(
      query,
      [tenkh, sdt, sln, ngay, thoigian, note],
      (err, results) => {
        if (err) {
          return err;
        } else {
          return results;
        }
      }
    );
  }
  //Hiển thị bàn đặt
  selectAddTable(callback) {
    connection.query(
      "SELECT * FROM book  WHERE done_at IS NULL or done_at = '0' order by makh asc",
      (err, results) => {
        if (err) {
          return callback(err);
        }
        return callback(null, results);
      }
    );
  }
  //Hiển thị danh sách đặt hàng
  seclectOrder(callback) {
    connection.query(
      "SELECT * FROM ordernew  WHERE done_at IS NULL or done_at = '0' order by makh asc ",
      (err, results) => {
        if (err) {
          return callback(err);
        }
        return callback(null, results);
      }
    );
  }
  //Thanh toán hóa đơn theo bàn
  async createHoaDon(masp, tensp, sl, total, tabl, manv) {
    const query = `INSERT INTO hoadon(masp, tensp, manv, sl, total, tabl) VALUE (?,?,?,?,?, ?)`;
    connection.query(
      query,
      [[`${masp}`], [`${tensp}`], manv, [`${sl}`], total, tabl],
      (err, results) => {
        if (err) {
          return err;
        } else {
          return results;
        }
      }
    );
  }
  //Thêm nước vào database
  async addMenu(tenMon, giaMon) {
    const query = `INSERT INTO listwater( ten, price) VALUES (?,?)`;
    connection.query(query, [tenMon, giaMon], (err, results) => {
      if (err) {
        return err;
      } else {
        return results;
      }
    });
  }
  //HIển thị món theo mã món
  async selectMenuWithID(id, callback) {
    const query = `SELECT * FROM listwater WHERE masp = ?`;
    connection.query(query, [id], (err, results) => {
      if (err) {
        return err;
      } else {
        return results;
      }
    });
  }
  //Chỉnh sửa nước
  async updateMenu(editMaMon, editTenMon, price) {
    const query = `UPDATE listwater SET ten = ?, price = ? WHERE masp = ?`;
    connection.query(query, [editTenMon, price, editMaMon], (err, results) => {
      if (err) {
        return err;
      } else {
        return results;
      }
    });
  }
  //Xóa mềm nước
  async deleteMenu(id) {
    const query = `UPDATE listwater SET delete_at = 1 WHERE masp = ?`;
    connection.query(query, [id], (err, results) => {
      if (err) {
        return err;
      } else {
        return results;
      }
    });
  }
  //Select nhân viên
  async selectNV(callback) {
    const query = `SELECT * FROM nhanvien WHERE delete_at IS NULL or delete_at = '0' order by manv asc`;
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
  //Thêm nhân Viên
  async addNhanVien(manv, tennv, sex, sdt, chucvu, luong) {
    const query = `INSERT INTO nhanvien(manv, tennv, sex, sdt, position, luong) value(?,?,?,?,?,?)`;
    connection.query(
      query,
      [manv, tennv, sex, sdt, chucvu, luong],
      (err, results) => {
        if (err) {
          return err;
        } else {
          return results;
        }
      }
    );
  }
  //Sửa nhân viên
  async updateNhanVien(manv, tennv, sex, sdt, position, luong) {
    const query = `UPDATE nhanvien SET tennv = ?, sex = ?, sdt = ?, position = ?, luong = ? WHERE manv = ?`;
    await connection.query(
      query,
      [tennv, sex, sdt, position, luong, manv],
      (err, results) => {
        if (err) {
          return err;
        } else {
          return results;
        }
      }
    );
  }
  //Xóa Nhân Viên
  async deletedNhanVien(manv) {
    const query = `UPDATE nhanvien SET delete_at = 1 WHERE manv = ?`;
    connection.query(query, [manv], (err) => {
      if (err) {
        return err;
      }
    });
  }
  //Hoàn thành đơn hàng
  async doneOrder(makh) {
    const query = `UPDATE ordernew SET done_at = 1 WHERE makh = ?`;
    connection.query(query, [makh], (err, result) => {
      if (err) {
        return err;
      } else {
        return result;
      }
    });
  }
  //Hoàn thành đặt bàn
  async doneBook(makh) {
    const query = `UPDATE book SET done_at = 1 WHERE makh = ?`;
    connection.query(query, [makh], (err, result) => {
      if (err) {
        return err;
      } else {
        return result;
      }
    });
  }
  //Đăng nhập
  async checkLogin(username, password, callback) {
    const query = `select * from users s inner join nhanvien n on s.manv = n.manv
    where s.username = ?and s.pwd = ? `;
    connection.query(query, [username, password], (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
}
module.exports = qlchung;
