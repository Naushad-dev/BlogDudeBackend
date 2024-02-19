const ApiError = require("../helper/ApiError");
const { hashPassword, ComparePassword } = require("../helper/auth.helper.js");
const User = require("../models/user.model.js");
const JWT = require("jsonwebtoken");
var { expressjwt: jwt } = require("express-jwt");


//middleware  

const validateSignIn =  jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"]} )



const registerController = async (req, res) => {


    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            throw new ApiError(400, "All field is required")
        }

        //check wheather user exist

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            throw new ApiError(402, "user already exists")
        }

        //save user

        const hashedpass = await hashPassword(password)

      

        const user = await User({
            name, email, password: hashedpass
        }).save()

        return res.status(200).json({
            status: 'success',
            message: "User Registered successfully"
        })

    } catch (error) {

        throw new ApiError(400, "Invalid user", error)
    }



}

const loginController = async (req, res) => {

    try {

        const { email, password } = req.body

        if (!email || !password) {
            throw new ApiError(500, "All Fields are required")
        }
        // find user DB
        //check karo user mila ki nhi
        // compare karo hashed password and user password
        //sucess hai to password ko undefine kardo

        const user = await User.findOne({ email })

        if (!user) {
            res.status(500).json({
                status: false,
                message: "User not found"
            })
        }

        const matched = await ComparePassword(password, user.password)
        if (!matched) {
            res.status(500).json({
                status: false,
                message: "Invalid username and password"
            })

        }

        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
        //password undefine
        user.password = undefined;


        res.status(200).json({
            status: true,
            message: "Login successful",
            token,
            user
        })
    }
    catch (error) {
        throw new ApiError(500, "Error while login")

    }

}

const updateUser = async (req, res) => {

    try {
        //get data from user

        const { email, name, password } = req.body

        //find user in Db

        const user = await User.findOne({ email })

        //validate the user
      
        if (password && password.length < 6) {
            return res.status(400).send({
              success: false,
              message: "Password is required and should be 6 character long",
            });
          }

        const hashedPassword = password ? await hashPassword(password) : undefined;

        //updated password
        const updatedUser = await User.findOneAndUpdate({ email }, {
            name: name || user.name,
            password: hashedPassword || user.password
        }, { new: true })

        updatedUser.password=undefined;
        return res.status(400).send({
            success: true,
            message: "successfully updated paswsd password",
            updatedUser,
        });

    } catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message,
            error,
        })

    }


}


module.exports = {
    registerController, loginController, updateUser,validateSignIn
}