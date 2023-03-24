const user = require('../models/user')
const User = require('../models/user')

createUser = (req, res) => {
    const body = req.body

    if (!body) {
        // if 400 error response with json
        return res.status(400).json({
            success: false,
            error: 'You must provide a user',
        })
    }

    if (!user) {
        return res.status(400).json({success: false, error: error})
    }

    user
        .save()
        .then(
            () => {
                return res.status(201).json({
                    success: true,
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    message: 'User created',
                })
            }
        )
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'user not created'
            })
        })
}

module.exports = {
    createUser,
}