const app = require('express')
const router = app.Router();

const {register,registerValidations,login,loginValidations,fetchAllUsers,deleteUser,verifyEmail} = require('../controllers/userControllers')


router.post('/register',registerValidations, register)
router.post('/login',loginValidations, login)
router.get('/users',fetchAllUsers)
router.get('/user/:id',deleteUser)

router.get('/user/verifyEmail/:id',verifyEmail)

module.exports = router;
