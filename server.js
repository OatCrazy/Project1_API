require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const cors = require("cors")
const passport = require("passport");
const users = require("./routes/api/users");
const profile =require("./routes/api/profile")




app.get('/', function(req, res, next) {  
  res.status(200).send("Hi, It works! /")  
});


// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

if((process.env.NODE_ENV ='development')){
  app.use(cors({origin: `https://apioatcrazy.herokuapp.com`}))
}



// Mongoose Connect
const mongoose = require('mongoose');
const connStr = process.env.DATABASE_URL
                .replace('<password>',process.env.DATABASE_PWD)
                .replace('<database>',process.env.DATABASE_NAME)
mongoose.connect(connStr,{useNewUrlParser: true,
                          useUnifiedTopology:true,
                          useFindAndModify:false,
                          useCreateIndex: true},
                          )
const db = mongoose.connection
db.on('error',() =>console.log('Database connect error'))
db.once('open', () => console.log("Database connect"))


// Passport middleware
// app.use(passport.initialize());
// // Passport config
// require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use("/api/profile", profile);



// const PORT = process.env.PORT
// const HOSTNAME = process.env.HOSTNAME
// run ที่พอทอะไร
app.listen(process.env.PORT , () => {
    console.log('Server is listening at port: '+process.env.PORT)
})

// app.listen(process.env.PORT || 5000)

