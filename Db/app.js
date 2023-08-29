const jwt=require('jsonwebtoken')
const express = require("express");
const cors = require('cors')
const app = express();
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
const Film = require("./src/models/film_model")
app.use(express.json())
app.get('/',(req,res)=>{
    
    res.json({msg:"films"});
});

function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(' ')[1];
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
app.get("/api/v1/films",async(req,res)=>{
    const films = await Film.find({});
    res.json(films);
});

app.post("/api/v1/films", verifyToken, async (req,res)=>{
        const film = new Film(
            {
                FilmTitle: req.body.FilmTitle,
                RatingValue: req.body.RatingValue
            });
        const savedFilm= await film.save();
        res.json(savedFilm);
});

app.put("/api/v1/films/update",async(req,res)=>{
    const filmTitle = req.body.FilmTitle;
    const newRating = req.body.RatingValue;

        const updatedFilm = await Film.findOneAndUpdate(
            { FilmTitle: filmTitle },
            { $set: { RatingValue: newRating } },
            { new: true } 
        );

        if (!updatedFilm) {
            return res.status(404).json({ msg: 'Film not found' });
        }

        res.json(updatedFilm);
})

app.post("/api/v1/login", (req,res)=>{
    const user = {
        value: req.body.username
    }  
    jwt.sign({user}, "secretKey", (error,token)=>{
        res.json({
            token
        })
    });
});

app.use((err,req,res,next)=>{
    console.error(err.stack)
    console.log("Error is :::::::::::",error)
    res.status(500).send('Something broke!');
})

module.exports=app;