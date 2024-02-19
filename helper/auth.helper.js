
const bcrypt = require('bcrypt');
const ApiError = require('./ApiError');

exports.hashPassword = async (password) => {

    try {

        // bcrypt.genSalt(10, (err, salt) => {
        //     if (err) throw new ApiError(400, "Error while generating salt")

        //     bcrypt.hash(password, salt, (err, hash) => {
        //         if (err) throw new ApiError(400, "Error while hashing password")

        //         return hash;
        //     })

        // }


        // )

        const salt = await bcrypt.genSalt(10); // Use await for synchronous methods
        const hash = await bcrypt.hash(password, salt);
        return hash;


    } catch (error) {
        throw new ApiError(400, "Error in Hashing password")
    }

}

//compare password

exports.ComparePassword = async (password, hashedpassword) => {



    try {

        const result = await bcrypt.compare(password, hashedpassword);

        return result;


    } catch (error) {
        throw new ApiError(400, "Error while comparing password")

    }

}
