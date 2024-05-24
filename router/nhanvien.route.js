const express = require("express");
const router = express.Router();
const nhanvienController = require('../app/controllers/nhanvienController')

router.get('/' , nhanvienController.index)
router.get('/dashboard' , nhanvienController.index)
router.get('/donhang' , nhanvienController.dathang)
module.exports = router