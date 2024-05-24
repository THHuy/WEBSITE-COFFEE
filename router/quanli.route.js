const express = require("express");
const router = express.Router();
const quanliController = require("../app/controllers/quanliController");

router.get("/", quanliController.index);
router.get("/donhang", quanliController.qldonhang);
router.post("/thanhtoan", quanliController.createHoaDon);
router.get("/sanpham", quanliController.sanpham);
router.put("/suaMenu", quanliController.suaMenu);
router.post("/addMenu", quanliController.addMenu);
router.patch("/deleteMenu", quanliController.deleteMenu);
router.get("/nhanvien", quanliController.nhanvien);
router.post("/themNV", quanliController.themNV);
router.put("/editNv", quanliController.editNv);
router.patch("/deletedNv", quanliController.deletedNv)
router.patch("/doneOrder", quanliController.doneOrder)
router.patch("/doneBook", quanliController.doneBook)
module.exports = router;
