const { isEmpty } = require("../helper/utility")
const Blog = require("../model/blog")
const bcrypt = require("bcrypt")

/**
 * @api {get} /blogs/ to fetch all blogs
 * @apiName /
 * @apiGroup blogs
 *
 *
 * @apiSuccess {Object}  data of the Blogs.
 */

exports.fetchAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
        if (blogs) {
            return res.status(201).send({ status: "success", data: blogs })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: "failed", message: "something went wrong" })
    }
}

/**
 * @api {get} /blogs/add to add a blog
 * @apiName /add
 * @apiGroup blogs
 *
 *
 * @apiSuccess {Object}  data of the Blog.
 */

 exports.addBlog = async (req, res) => {
    try {
        const {title,content,createdBy} = req.body
        const blog = await Blog.create({title,content,createdBy})
        if (blog) {
            return res.status(201).send({ status: "success", message:"blog created successfully",data: blog })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: "failed", message: "something went wrong" })
    }
}

/**
 * @api {get} /blogs/:id  to fetch blog By Id
 * @apiName /fetchBlogById
 * @apiGroup blogs
 *
 *@apiParam {id}  blog's id 
 * @apiSuccess {Object}  data of the Blog.
 */

exports.fetchBlogById = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).send({ status: "failed", message: "please provide the id of blog to be fetched" })
        }
        const blog = await Blog.findById(id)
        if (blog) {
            return res.status(201).send({ status: "success", data: blog })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: "failed", message: "something went wrong" })
    }
}

/**
 * @api {put} /blogs/:id  to update blog
 * @apiName /updateBlog
 * @apiGroup blogs
 *
 *@apiParam {id}  blog's id 
 * @apiSuccess {Object}  data of the updated Blog.
 */

exports.updateBlog = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        if (!id) {
            return res.status(400).send({ status: "failed", message: "please provide the id of blog to be updated" })
        }
        const blog = await Blog.findById(id)
        if (blog) {
            const blogUpdated = await Blog.updateOne({ _id: id, ...data })
            if (blogUpdated) {
                const newBlog = await Blog.findById(id)
                return res.status(201).send({ status: "success", message: "blog updated successfully", data: newBlog })
            }
        }
        else {
            return res.status(404).send({ status: "success", message: "No blog found with given id" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: "failed", message: "something went wrong" })
    }
}

/**
 * @api {put} /blogs/:id  to delete  blog
 * @apiName /deleteBlog
 * @apiGroup blogs
 *
 *@apiParam {id}  blog's id 
 * @apiSuccess {String}  blog deleted successfully
 */

exports.deleteBlog = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).send({ status: "failed", message: "please provide the id of blog to be deleted" })
        }
        const blog = await Blog.findById(id)
        if (blog) {
            const blogDeleted = await Blog.deleteOne({ _id: id })
            if (blogDeleted) {
                return res.status(201).send({ status: "success", message: "blog deleted successfully" })
            }
        }
        else {
            return res.status(404).send({ status: "success", message: "No blog found with given id" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: "failed", message: "something went wrong" })
    }
}