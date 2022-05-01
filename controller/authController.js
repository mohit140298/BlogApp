const User = require('../model/user')
const {isEmpty} = require('../helper/utility')
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * @api {post} /auth/login login api
 * @apiName login
 * @apiGroup auth
 *
 * @apiParam {email} email User's unique email.
 * @apiParam {password} password User's unique password.
 *
 * @apiSuccess {String}  data of the User.
 */

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).send({ status: "failed", message: "please provide email and password info" })
        }
        const user = await User.find({ email, password })
        if (!user || isEmpty(user)) {
            return res.status(404).send({ status: "failed", message: "No User found with this email and password" })
        }
        const result = await bcrypt.compare(password, user.password)
        if(result)
        {
            return res.status(201).send({ status: "success", data: user })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: "failed", message: "something went wrong" })
    }

}

/**
 * @api {post} /auth/signup signup api
 * @apiName signup
 * @apiGroup auth
 *
 * @apiParam {name} name User's full name.
 * @apiParam {email} email User's unique email.
 * @apiParam {password} password User's unique password.
 *
 * @apiSuccess {String}  data of the User.
 * @apiSuccess user's data saved
 */

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).send({ status: "failed", message: "please provide the info name ,email and password" })
        }
        const hashPassword = await bcrypt.hash(password, saltRounds)
        const user = await User.create({ name, email, password:hashPassword })
        if (!user) {
            return res.status(404).send({ status: "failed", message: "User not created" })
        }
        return res.status(201).send({ status: "success", message: "user created successfully", data: user })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: "failed", message: "something went wrong" })

    }
}