const express = require("express");

var router = express.Router();

var articleinfo = require("../../db/articleinfo");


router.post("/getinfo", (req, res) => {
    articleinfo.findOne({}, { _id: 0, __v: 0 })
        .then((data) => {
            res.send({
                code: 0,
                msg: "请求成功",
                data
            })
        })
        .catch(() => {
            res.send({
                code: 4,
                msg: "服务器错误",
                data: null,
            });
        });
})

module.exports = router;