const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    console.log('home page');
})
router.get('/create',(req,res)=>{
    console.log('create blog page');
})
router.post('/post',(req,res)=>{
    console.log('post blog');
})
router.get('/:id',(req,res)=>{
    console.log('get blog');
})
router.put('/:id',(req,res)=>{
    console.log('update blog');
})
router.delete('/:id',(req,res)=>{
    console.log('delete blog');
})

module.exports = router