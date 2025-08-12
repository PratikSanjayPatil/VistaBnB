if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}


const express = require('express');
const app = express();
const mongoose = require('mongoose')
const port = 8080;
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate')  //For create boilerplate
const ExpressError = require('./utils/ExpressError.js'); //Class for Error handdling
const session = require('express-session'); 
const MongoStore = require("connect-mongo");
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');

const dbUrl = process.env.ATLASDB_URL; // MongoDB connection URL

//Import Routes
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require('./routes/user.js');

app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, 'views')); // Set the views directory

app.use(express.urlencoded({extended:true})); // Middleware to parse URL-encoded bodies
app.use(methodOverride('_method')); // Middleware to support PUT and DELETE methods in forms
app.engine('ejs', ejsMate); //For create boilerplate
app.use(express.static(path.join(__dirname, '/public'))); //for using css file in js

//Call the main function to connect to MongoDB

main().then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});


//Connect to MongoDB

async function main() {
    await mongoose.connect(dbUrl);
};

// MongoStore for session storage, Its used to store session data in MongoDB Atlas.

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET, // Secret key for encrypting session data
  },
  touchAfter: 24 * 3600, // time period in seconds after which the session will be updated
});

store.on("error", (e)=>{
    console.log("Mongo session Store Error", e);
})

//Session options

const sessionOptions = {
  store,
  secret: process.env.SECRET, // Secret key for session encryption
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, //(days * hrs * min * sec * milisec)
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};



//Use session or flash

app.use(session(sessionOptions));
app.use(flash());

//Passport Configuration

app.use(passport.initialize());
app.use(passport.session());  //for passport you need implement session allready.
passport.use(new LocalStrategy(User.authenticate())); //use static authenticate method model in localStrategy.

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

// app.get("/fakeUser", async(req,res)=>{
//     let fakeUser = new User({
//         email: "fake@gmail.com",
//         username: "FakeUser"
//     });

//     let registerUser = await User.register(fakeUser, "helloworld");
//     res.send(registerUser)
// })

//Connect routes

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);


//Route to handle GET requests to the root URL

// app.get('/', (req,res) => {
//     res.send('Root Route');
// });


//Error handler middleware for wrong route

app.use("/",(req, res, next)=>{
    next(new ExpressError(404, 'Page Not Found!'))
})

//Error handdler through middleware

app.use((err, req, res, next) =>{
    let {statusCode=500, message='Something went wrong!'} = err;
    res.status(statusCode).render('error.ejs',{err})
    // res.status(statusCode).send(message);
})

//Listening on the specified port

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
