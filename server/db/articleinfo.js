const mongoose = require("mongoose");


let articleinfo = mongoose.model("articleinfo", new mongoose.Schema({
    tags: [String],
    num: Number,
}));

articleinfo.create({
    tags: ["HTML5&CSS3", "JAVASCRIPT", "NODE", "VUE&REACT", "OTHER"],
    num: 100,
});

module.exports = articleinfo;