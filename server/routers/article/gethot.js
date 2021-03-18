const express = require("express");

var router = express.Router();
var article = require("../../db/article");



router.post("/gethot", (req, res) => {
    let { limit } = req.body;
    article.find({}, { _id: 0, __v: 0 }, { limit })
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