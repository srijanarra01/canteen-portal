var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const Vendor = require("../models/Vendors");
const auth = require("../middleware/auth");

// GET request 
// Getting all the vendors
router.get("/", function (req, res) {
    Vendor.find(function (err, vendors) {
        if (err) {
            console.log(err);
        } else {
            res.json(vendors);
        }
    })
});

// POST request 
// Add a vendor to db
router.post("/register", (req, res) => {
    const email = req.body.email;

    Vendor.findOne({ email })
        .then(vendor => {
            if (vendor) return res.status(400).json({ msg: "Vendor already exists" });
            const newVendor = new Vendor({
                manager_fname: req.body.manager_fname,
                manager_lname: req.body.manager_lname,
                shop_name: req.body.shop_name,
                email: req.body.email,
                password: req.body.password,
                contact_number: req.body.contact_number,
                opening_time: req.body.opening_time,
                closing_time: req.body.closing_time
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newVendor.password, salt, (err, hash) => {
                    if (err) {
                        return res.status(400).json({ msg: "failed" });
                    }
                    newVendor.password = hash;
                    newVendor.save()
                        .then(vendor => {

                            jwt.sign(
                                { email: vendor.email },
                                config.get("jwtSecret"),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if (err) {
                                        return res.status(400).json({ msg: "failed" });
                                    }
                                    res.status(200).json({
                                        token,
                                        vendor: {
                                            id: vendor.id,
                                            email: vendor.email
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

});

router.get("/vendordetails", auth, function (req, res) {
    const token = req.header("auth-token");
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    console.log(decoded);
    email = decoded.email;
    Vendor.findOne({ email })
        .then(vendor => {
            if (!vendor) {
                return res.status(400).json({ msg: "Vendor doesn't exist" });
            }
            res.status(200).json(vendor)
        })
});

router.post("/vendor_timings", function (req, res) {
    const sh_name = req.body.shop_name;
    // console.log(sh_name)
    const order_time = req.body.order_time * 1;
    // console.log(order_time);
    Vendor.findOne({ shop_name: sh_name })
        .then(vendor => {
            if (!vendor) {
                return res.status(400).json({ msg: "Vendor doesn't exist" });
            }
            else {
                // res.status(200).json(vendor)
                // console.log(vendor.shop_name);
                const op_time = vendor.opening_time * 1;
                const cl_time = vendor.closing_time * 1;
                console.log(op_time, cl_time);

                if (op_time < cl_time) {
                    if (order_time <= cl_time && order_time >= op_time) {
                        return res.status(200).json({ success: true });
                    }
                    else {
                        return res.status(400).json({ msg: "closed" });
                    }
                }
                else {
                    if (order_time >= op_time && order_time < 2400) {
                        return res.status(200).json({ success: true });
                    }
                    else if (order_time < op_time && order_time <= cl_time) {
                        return res.status(200).json({ success: true });
                    }
                    else {
                        return res.status(400).json({ msg: "closed" });
                    }
                }

            }

        })
});

router.post("/update", auth, (req, res) => {

    const token = req.header("auth-token");
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    console.log(decoded);
    email = decoded.email;

    Vendor.findOne({ email })
        .then(vendor => {
            if (!req.body.password) return res.status(400).json({ msg: "Invalid" });
            if (!vendor) return res.status(400).json({ msg: "Vendor doesn't exist" });
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
                            manager_fname: req.body.manager_fname,
                            manager_lname: req.body.manager_lname,
                            contact_number: req.body.contact_number,
                            password: new_pass,
                            shop_name: req.body.shop_name,
                            opening_time: req.body.opening_time,
                            closing_time: req.body.closing_time
                        }
                    };

                    Vendor.updateOne(myquery, newvalues)
                        .then(responseee => {
                            res.status(200).json({ msg: "details updated" });
                            console.log("details updated");
                        })
                        .catch(err => {
                            res.status(400).json({ msg: err });
                        })
                    // Vendor.updateOne(myquery, newvalues, function (err, res) {
                    //     if (err) throw err;
                    // })
                    // res.status(200).json({ msg: "details updated" });
                    // console.log("details updated");
                })

            })

        })



    // console.log(req.body)



});

router.delete("/:id", (req, res) => {
    Vendor.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;