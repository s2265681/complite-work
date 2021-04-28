
const mongoose = require("mongoose")

const Schema = mongoose.Schema({
    id:{ type: Number, default: 0},
    name: { type: String, required: true },
    stock:String
});
const fruits = mongoose.model("fruits-mongoose",Schema)
module.exports =fruits
