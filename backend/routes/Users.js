var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

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

router.get("/userdetails", auth, function (req, res) {
    const token = req.header("auth-token");
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    console.log(decoded);
    email = decoded.email;
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(400).json({ msg: "User doesn't exist" });
            }
            res.status(200).json(user)
        })
});

router.post("/addmoney", auth, (req, res) => {
    const token = req.header("auth-token");
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    console.log(decoded);
    email = decoded.email;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(400).json({ msg: "User doesn't exist" });
            }
            var myquery = { email: email };
            var newvalues = { $set: { wallet_balance: user.wallet_balance * 1 + req.body.money_to_add } };
            // User.updateOne(myquery, newvalues, function (err, res) {
            //     if (err) throw err;
            // })
            // res.status(200).json({ msg: "wallet balance updated" });
            // console.log("wallet balance updated");

            User.updateOne(myquery, newvalues)
                .then(response => {
                    res.status(200).json({ msg: "wallet balance updated" });
                    console.log("wallet balance updated");
                })
                .catch(err => {
                    res.status(400).json({ msg: err });
                })
        })

});

router.post("/refund", auth, (req, res) => {
    const token = req.header("auth-token");
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    console.log(decoded);
    // email = decoded.email;
    user_email = req.body.user_email;

    User.findOne({ email: user_email })
        .then(user => {
            if (!user) {
                return res.status(400).json({ msg: "User doesn't exist" });
            }
            var myquery = { email: user_email };
            var newvalues = { $set: { wallet_balance: user.wallet_balance * 1 + req.body.money_to_refund } };
            // User.updateOne(myquery, newvalues, function (err, res) {
            //     if (err) throw err;
            // })
            // res.status(200).json({ msg: "wallet balance updated" });
            // console.log("wallet balance updated");
            User.updateOne(myquery, newvalues)
                .then(response => {
                    res.status(200).json({ msg: "wallet balance updated" });
                    console.log("wallet balance updated");
                })
                .catch(err => {
                    res.status(400).json({ msg: err });
                })
        })

})

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", (req, res) => {

    const email = req.body.email;

    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: "User already exists" });
            const newUser = new User({
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                contact_number: req.body.contact_number,
                password: req.body.password,
                age: req.body.age,
                batch: req.body.batch,
                wallet_balance: req.body.wallet_balance
            });

            //create and salt hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        return res.status(400).json({ msg: "failed" });
                    }
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {

                            jwt.sign(
                                { email: user.email },
                                config.get("jwtSecret"),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if (err) {
                                        return res.status(400).json({ msg: "failed" });
                                    }
                                    res.status(200).json({
                                        token,
                                        user: {
                                            id: user.id,
                                            email: user.email
                                        }
                                    });

                                }
                            )


                            // res.send("Sign up successful");
                        })
                        .catch(err => {
                            res.status(400).send(err);
                        });
                })
            })

        })



    // console.log(req.body)



});

router.post("/update", auth, (req, res) => {

    const token = req.header("auth-token");
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    console.log(decoded);
    email = decoded.email;

    User.findOne({ email })
        .then(user => {
            if (!req.body.password) return res.status(400).json({ msg: "Invalid" });
            if (!user) return res.status(400).json({ msg: "User doesn't exist" });
            var new_pass = req.body.password;
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(new_pass, salt, (err, hash) => {
                    if (err) {
                        return res.status(400).json({ msg: "failed" });
                    }
                    console.log(new_pass);
                    new_pass = hash;
                    console.log("changed? : " + new_pass)
                    console.log("now : " + new_pass);

                    var myquery = { email: email };
                    var newvalues = {
                        $set: {
                            fname: req.body.fname,
                            lname: req.body.lname,
                            contact_number: req.body.contact_number,
                            password: new_pass,
                            age: req.body.age,
                            batch: req.body.batch
                        }
                    };
                    // User.updateOne(myquery, newvalues, function (err, res) {
                    //     if (err) throw err;
                    // })
                    // res.status(200).json({ msg: "details updated" });
                    // console.log("details updated");
                    User.updateOne(myquery, newvalues)
                        .then(response => {
                            res.status(200).json({ msg: "details updated" });
                            console.log("details updated");
                        })
                        .catch(err => {
                            res.status(400).json({ msg: err });
                        })
                })

            })

        })



    // console.log(req.body)



});



router.delete("/:id", (req, res) => {
    User.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;

