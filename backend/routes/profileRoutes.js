const express = require('express')
const router = express.Router();
const {updateName,updatePassword,passwordValidations} = require("../controllers/profileControllers")

// update name
router.post('/updateName',updateName);
router.post('/updatePassword',updatePassword);

module.exports = router;
