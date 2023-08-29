let DB_URI = "mongodb://localhost:27017/mydb";

if(process.env.MONGO_DB_URI){
    DB_URI = process.env.MONGO_DB_URI;
    console.log("DB exists")
}

module.exports={
    DB_URI
};