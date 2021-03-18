const mongoose = require("mongoose");

let Schema = mongoose.Schema;

module.exports = mongoose.model("user", new mongoose.Schema({
    user: { type: String, required: true },
    pwd: { type: String, required: true },
    regDate: { type: Number, default: new Date().getTime() },
    photo: { type: String, default: '/img/defaultphoto.png' },
    disabled: { type: Boolean, default: false },
    admin: { type: Boolean, default: false },
}));