const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const sessionMongo = require("connect-mongo")(session);


var app = express();

// 跨域配置

app.use((req, res, next) => {
    res.header({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': req.headers.origin || '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
        'Content-Type': 'application/json; charset=utf-8'

    })
    if (req.method === "OPTIONS") {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(session({
    secret: "gx", // 用于加密的密钥，可以随便写个字符串。
    cookie: { maxAge: 60 * 1000 * 10 * 10 },
    rolling: true, //每次用户与后台交互后，刷新cookie存储时间。
    resave: false, //是否每次重新存储session。
    saveUninitialized: false, // 初始化。
    store: new sessionMongo({
        url: "mongodb://localhost:27017/blog"
    })
}));

app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./routers/index"));








mongoose
    .connect("mongodb://localhost:27017/blog", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("数据库连接成功")
    })
    .catch(() => {
        console.log("数据库连接失败")
    });






app.listen(3000);