const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.use(express.raw());
router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.get('/:id', userController.getUser);
router.post('/add', userController.addUser);
router.post('/update', userController.updateUser);
router.get('/delete/:id', userController.deleteUser);

module.exports = router;