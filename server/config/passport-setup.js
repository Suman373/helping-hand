const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const UserModel = require('../models/userModel');

passport.use(
    new GoogleStrategy({
        callbackURL:'/auth/google/callback',
        clientID:keys.google.clientID,
        clientSecret:keys.google.clientSecret,
        scope:["profile","email"]

    }, async(accessToken, refreshToken, profile, done)=>{ // cb for passport 
    const user = await UserModel.findById(profile._id);
    if(user){
        return done(null,user);
    }else{
        const newUser = await UserModel.create({
            name:profile.displayName,
            email:profile.emails[0].value,
            profileImage:profile.photos[0].value,
            googleId:profile.id
        });
        return done(null,newUser);
    }
  })
);

passport.serializeUser((user,done)=>{
    done(null,user.id);
});
passport.deserializeUser(async(id,done)=>{
    const user = await UserModel.findById(id);
    done(null,user);
});