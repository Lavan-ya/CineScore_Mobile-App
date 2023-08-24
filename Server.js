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

app.listen(3000,()=>{
    console.log("running")
})