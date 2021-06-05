const express = require("express");
const bodyParser = require('body-parser')

const cors = require('cors')
const connect = require("./config/db")



const router = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const profileRoutes = require('./routes/profileRoutes')
require('dotenv').config()

const app = express();
app.use(cors());

//connect to mongodb database
connect(); 

// cors 

app.use(bodyParser.json())
app.use('/',router);
app.use('/',postRoutes);
app.use('/',profileRoutes);

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
	console.log("Your app is running")
});