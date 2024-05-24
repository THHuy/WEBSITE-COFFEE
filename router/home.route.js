const express = require("express");
const router = express.Router();
const homeController = require('../app/controllers/homeController')

router.get('/' , homeController.index)
router.get('/dat-hang' , homeController.dathang)
router.get('/dat-ban' , homeController.datban)
router.post('/addCart', homeController.addCart)
router.post('/datban', homeController.adddatban)
router.post('/login', homeController.login)
router.get('/logout', homeController.logout)
module.exports = router