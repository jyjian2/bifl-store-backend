const User = require('../models/user')
const bcrypt = require('bcrypt')
const saltRounds = 10;

createUser = (req, res) => {
    const {name, email, password} = req.body

    // check if all field has been entered
    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields'})
    }

    //check if user already exists
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            return res.status(404).json({
                msg: 'User already exists',
            })
        }
    })
    
    //check password length
    if (password.length < 8 ) {
        res.status(400).json({mgs: 'Please enter more than 8 characters'})
    }
    
    const newUser = new User({
        name,
        email,
        password,
    })

    //password hashing
    bcrypt.genSalt(12, (err, salt) => 
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            newUser.password = hash;
            //save user
            newUser
            .save()
            .then(
                res.json({
                    msg: 'Successfully Registered'
                })
            )
            .catch((err) => console.log(err));
        })
    )
   
}

loginUser = (req, res) => {
    const {email, password} = req.body

    if (!email || !password) {
        res.status(400).json({
            msg: 'Something missing'
        })
    }

    const user  = UserSchema.findOne({ email: email})

    if (!user) {
        return res.status(400).json({msg: 'User not found'})
    }

    const matchPassword = bcrypt.compare(password, user.password)
    if (matchPassword) {
        return res
        .status(200)
        .json({msg: 'You have logged in successfully!'})
    } else {
        return res.status(400).json({msg: 'Invalid credential'})
    }
}

module.exports = {
    createUser,
    loginUser,
}