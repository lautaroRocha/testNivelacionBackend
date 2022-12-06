const router = require('express').Router()
const handleUsers = require("../controller/userController")
const uploadMulter = require("../config/multerConfig")

router.post('/',  handleUsers.addUser)

router.get('/',  handleUsers.getAllUsers)

router.patch('/:id', uploadMulter.single('img'), handleUsers.updateUser)



module.exports = router