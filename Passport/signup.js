var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var mongoDbFunctions = require('../mongodb.js');
var bCrypt = require('bcrypt-nodejs');
var Users;

module.exports = function(passport){

    passport.use('signup', new LocalStrategy({
            usernameField: 'email', 
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            findOrCreateUser = function(){
                // find a user in Mongo with provided username
                Users = mongoDbFunctions.findCollections(User, "Users");
                Users.findOne({ 'email' :  email }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        console.log('User already exists with email: '+email);
                        return done(null, false, req.flash('message','User Already Exists'));
                    } else {
                        // if there is no user with that email
                        // create the user
                        var newUser = new User();

                        // set the user's local credentials
                        newUser.username = email;
                        newUser.password = createHash(password);
                        newUser.email = req.body.email;
                        newUser.firstName = req.body.firstName;
                        newUser.lastName = req.body.lastName;

                        // save the user
                        mongoDbFunctions.insertDocuments(newUser, "Users");
                        console.log('User Registration succesful');    
                        return done(null, newUser);
                    
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}