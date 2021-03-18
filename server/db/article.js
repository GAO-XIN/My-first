const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let article = mongoose.model("article", new Schema({
    type: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: Date, default: Date.now() },
    content: { type: String, required: true },
    tag: { type: String, required: true },
    pv: { type: Number, default: 0 },
    comment: [
        { type: mongoose.Schema.Types.ObjectId, ref: "comment" }
    ],
    surface: { type: String, default: "/img/7.png" },
}));

// for (let i = 0; i < 100; i++) {
//     article.create({
//         type: ["原创", "转载"][Math.floor(Math.random() * 2)],
//         title: `第${i+1}篇文章`,
//         content: "66666666",
//         tag: ["HTML5&CSS3", "JAVASCRIPT", "NODE", "VUE&REACT", "OTHER"][Math.floor(Math.random() * 5)],

//     })
// }


module.exports = article;