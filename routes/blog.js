const express = require('express')
const router = express.Router()
const blogController = require('../controller/blogController')

router.get('/',blogController.fetchAllBlogs)
router.post('/add',blogController.addBlog)
router.get('/:id',blogController.fetchBlogById)
router.put('/:id',blogController.updateBlog)
router.delete('/:id',blogController.deleteBlog)


module.exports = router