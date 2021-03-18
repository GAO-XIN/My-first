const express = require("express");

var router = express.Router();
var article = require("../../db/article");



router.post("/getarticleshow", (req, res) => {
    let { skip, limit, tag } = req.body;
    let options = tag ? { tag } : {}
    article.find(options, { _id: 0, __v: 0 }, { skip, limit })
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