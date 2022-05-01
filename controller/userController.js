const { isEmpty } = require("../helper/utility")
const User = require("../model/user")
const bcrypt = require("bcrypt")

/**
 * @api {get} /users/ to fetch all users
 * @apiName /
 * @apiGroup users
 *
 *
 * @apiSuccess {Object}  data of the Users.
 */

exports.fetchAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        if (users) {
            return res.status(201).send({ status: "success", data: users })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: "failed", message: "something went wrong" })
    }
}

/**
 * @api {get} /users/:id  to fetch user By Id
 * @apiName /fetchUserById
 * @apiGroup users
 *
 *@apiParam {id}  user's id 
 * @apiSuccess {Object}  data of the User.
 */

exports.fetchUserById = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).send({ status: "failed", message: "please provide the id of user to be fetched" })
        }
        const user = await User.findById(id)
        if (user) {
            return res.status(201).send({ status: "success", data: user })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: "failed", message: "something went wrong" })
    }
}

/**
 * @api {put} /users/:id  to update user
 * @apiName /updateUser
 * @apiGroup users
 *
 *@apiParam {id}  user's id 
 * @apiSuccess {Object}  data of the updated User.
 */

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        if (!id) {
            return res.status(400).send({ status: "failed", message: "please provide the id of user to be updated" })
        }
        const user = await User.findById(id)
        if (user) {
            if (data.hasOwnProperty("password")) {
                data.password = await bcrypt.hash(data.password, 10)
            }
            const userUpdated = await User.updateOne({ _id: id, ...data })
            if (userUpdated) {
                const newUser = await User.findById(id)
                return res.status(201).send({ status: "success", message: "user updated successfully", data: newUser })
            }
        }
        else {
            return res.status(404).send({ status: "success", message: "No user found with given id" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: "failed", message: "something went wrong" })
    }
}

/**
 * @api {put} /users/:id  to delete  user
 * @apiName /deleteUser
 * @apiGroup users
 *
 *@apiParam {id}  user's id 
 * @apiSuccess {String}  user deleted successfully
 */

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).send({ status: "failed", message: "please provide the id of user to be deleted" })
        }
        const user = await User.findById(id)
        if (user) {
            const userDeleted = await User.deleteOne({ _id: id })
            if (userDeleted) {
                return res.status(201).send({ status: "success", message: "user deleted successfully" })
            }
        }
        else {
            return res.status(404).send({ status: "success", message: "No user found with given id" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: "failed", message: "something went wrong" })
    }
}