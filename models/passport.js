var express=require('express');
var mysql=require('mysql');
var LocalStrategy =require('passport-local').Strategy;
var passport=require('passport');
var flash=require('connect-flash');
var session=require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app=express();
app.use(flash());



var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
 // password : ' ',
  database: 'onecoin'
});

  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false }));
  //app.use(express.session({ cookie: { maxAge: 60000 }}));
  



app.use(cookieParser());
//app.use(bodyParser.urlencoded());
app.use(session({ secret: 'SECRET',
						 resave: false,
						 saveUninitialized: true}));





app.use(passport.initialize());
app.use(passport.session());




 passport.serializeUser(function(user, done) {
	 console.log('serialized');
		done(null, user.id);
    });
	
	

    passport.deserializeUser(function(id, done) {
		connection.query("select * from users where id = "+id,function(err,rows){	
			done(err, rows[0]);
		});
});






///////////////////

var srategy = new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

         connection.query("SELECT * FROM `users` WHERE `email` = '" + email + "'",function(err,rows){
			 
			if (err)
                return done(err);
			 if (!email) {
				 
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
				
			} else {
			// if the user is found but the password is wrong
           if (!(rows[0].pass == password))
		  {
               return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
		  }else{ 
            // all is well, return successful user
			session.user=email;
            return done(null, rows[0]);	
		  }
			}
		});	

});

 passport.use('local',srategy);	


 
 
 
 
 
 function del_sess(res)
{
	
   session.user=null;
	  res.json(session.user);
   
	
	
	//console.log(req.session);
//if(session.destroy())
	//	{
		//res.json('session not destroy!');
		//}
 };

exports.del_sess=del_sess;