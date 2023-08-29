const mongoose = require("mongoose");
const Schema = mongoose.Schema

const FilmSchema = new Schema({
    FilmTitle: String,
    RatingValue: Number 
});

module.exports=mongoose.model("Film",FilmSchema);
console.log("Schema created")