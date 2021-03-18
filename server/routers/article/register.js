const express = require("express");
const svgCaptcha = require("svg-captcha");


let router = express.Router();



router.post("/register", (req, res) => {
    let captcha = svgCaptcha.create();
    req.session.registerVCode = captcha.text;
    res.send({
        code: 0,
        data: captcha.data,
    })
});

module.exports = router;