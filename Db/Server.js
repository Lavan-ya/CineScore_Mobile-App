const {DB_URI} = require("./src/config")
const mongoose = require("mongoose");
mongoose.connect(DB_URI);
console.log("Connected to MONGO DB successfully")
const jwt=require('jsonwebtoken')
const express = require("express");
const cors = require('cors')
const app = express();
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
app.use(express.json())

app.post("/api/v1/login", (req,res)=>{
    const user = {
        value : req.body.username
    }  
    jwt.sign({user}, "secretKey", (error,token)=>{
        res.status(201).json({
            token
        })
    });
});

app.post("/api/v1/films", verifyToken, async (req,res)=>{
    const film = new Film(
        {
            name: req.body.name,
            rating: req.body.rating
        });
    const savedFilm= await film.save();
    res.json(savedFilm);
});

function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(' ')[1];
        alert("Token is : ",bearerToken)
        jwt.verify(bearerToken,'secretKey',(err,authData)=>{
            if(err){
                res.sendStatus(403);
            }else{
                next();
            }
        })
    }else{
        res.sendStatus(403);
    }
}




app.listen(3000,()=>{
    console.log("running")
})