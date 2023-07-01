const express = require('express');
require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const cookieSession = require('cookie-session')
const fundPost = require('./routes/fundPostRoute');
const event = require('./routes/eventRoute');
const user = require('./routes/userRoute');
const passportSetup = require('./config/passport-setup');
const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,PATCH,DELETE",
    credentials:true
}));
app.use(cookieSession({
    name:"session",
    keys:["sumanroy"],
    maxAge:24*60*60*100
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'/public')));

// server routes
app.use('/funds', fundPost);
app.use('/events', event);
app.use('/auth',user);

app.get('/', (req,res)=>  {
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'view','welcome.html'));
    }
} )

const connectToDB = async()=>{
    try {
           await mongoose.connect(
            process.env.MONGO_DB_URI,{
                useUnifiedTopology:true,
                useNewUrlParser:true
            }
        )
        console.log(`MongoDB is connected successfully`);
        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
connectToDB();

app.listen(PORT, 
    console.log(`Server is running on ${PORT}`));