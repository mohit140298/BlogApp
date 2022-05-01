const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')

router.get('/',userController.fetchAllUsers)
router.get('/:id',userController.fetchUserById)
router.put('/:id',userController.updateUser)
router.delete('/:id',userController.deleteUser)


module.exports = router