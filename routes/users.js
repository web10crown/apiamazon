const AES = require('crypto-js/aes');
const { enc } = require('crypto-js');
const user = require("../models/Users");
const router = require("express").Router();


router.post("/login", async (req, res) => {
    
    const KEY = "password key";
    const foundUser = await user.findOne({ phone: req.body.phone });
    const password = AES.decrypt(foundUser.pass, KEY).toString(enc.Utf8);
    console.log(password);
    if (req.body.pass === password) {
        res.status(200).json(foundUser);
    } else {
        res.status(401).json("password not matched");
    }
})

router.post("/register", async (req, res) => {

    const KEY = "password key";
    const password = AES.encrypt(req.body.pass, KEY).toString();
    const newUser = new user({
        name: req.body.name,
        phone: req.body.phone,
        pass: password,
    });

    try {
        const data = await newUser.save();

        res.status(200).json("register success");
    } catch (err) {
        res.status(500).json(err);
    }

})

module.exports = router;