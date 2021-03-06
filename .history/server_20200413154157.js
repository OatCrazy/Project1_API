require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const passport = require("passport");
const users = require("./routes/api/users");
const profile =require("./routes/api/profile")



// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

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
// app.listen(PORT,HOSTNAME, () => {
//     console.log('Server is listening at port: '+PORT +" "+ HOSTNAME)
// })
app.listen(process.env.PORT || 5000)

