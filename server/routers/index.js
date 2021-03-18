const path = require("path");
const express = require('express');
var router = express.Router();
const userDB = require("../db/user")


router.use("/article", require("./article/gethot"));
router.use("/article", require("./article/getinfo"));
router.use("/article", require("./article/getarticleshow"));
router.use("/article", require("./article/register"));


router.get("/home", function(req, res) {
    res.send("123")
});
// 注册
router.post("/submit", (req, res) => {
    let { user, pwd, checkpwd } = req.body;
    console.log(req.body);
    if (!user || !pwd || !checkpwd) {
        res.send({
            code: 1,
            msg: "数据无效，请检查后登录"
        });
        return;
    }
    if (pwd !== checkpwd) {
        res.send({
            code: 2,
            msg: "两次密码不一致"
        });
        return;
    }
    userDB.findOne({ user })
        .then(data => {
            if (data) {
                res.send({
                    code: 3,
                    msg: "用户名已存在"
                })
            } else {
                userDB.create({ user, pwd })
                    .then(d => {
                        res.send({
                            code: 0,
                            msg: "注册成功"
                        })
                    })
                    .catch(e => {
                        res.send({
                            code: 4,
                            msg: "服务器错误"
                        })
                    })
            }
        })
        .catch(e => {
            res.send({
                code: 4,
                msg: "服务器错误"
            })
        })

});
// 登录
router.post("/login", (req, res) => {
    if (req.session.login) {
        res.send({
            code: 2,
            msg: "已经登录"
        });
        return;
    }
    let { user, pwd } = req.body;
    if (!user || !pwd) {
        res.send({
            code: 1,
            msg: "数据无效，请检查后登录"
        });
        return;
    }
    userDB.findOne({ user })
        .then(data => {
            if (data) {
                if (data.pwd === pwd) {
                    req.session.login = data;
                    res.send({
                        code: 0,
                        msg: "登陆成功"
                    })
                } else {
                    res.send({
                        code: 2,
                        msg: "密码错误"
                    })
                }
            } else {
                res.send({
                    code: 1,
                    msg: "用户不存在"
                })
            }
        })
        .catch(e => {
            res.send({
                code: 4,
                msg: "服务器错误，请稍后再尝试登录"
            })
        })
});
// 验证是否登录
router.post("/iflogin", (req, res) => {
    if (req.session.login) {
        res.send({
            userinfo: req.session.login
        });
        return;
    }
});
module.exports = router;