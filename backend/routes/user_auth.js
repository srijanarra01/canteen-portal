var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// Load User model
const User = require("../models/Users");

// GET request 
// Getting all the users
router.get("/", function (req, res) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/", (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).json({msg: "Please enter all fields"});
    }

    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: "User does not exist" });
            
            //validate password
            bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(!isMatch) return res.status(400).json({msg: "Invalid credentials"});
                jwt.sign(
                    { email: user.email },
                    config.get("jwtSecret"),
                    { expiresIn: 3600 },
                    (err, token) => {
                        if (err) throw err;
                        res.status(200).json({
                            token,
                            user: {
                                id: user.id,
                                email: user.email
                            }
                        });

                    }
                )
            })
        })



    // console.log(req.body)



});

module.exports = router;

