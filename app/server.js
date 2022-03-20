require('dotenv').config();
var express           = require("express"),
app                   = express(),
path                  = require('path'),
mongoose              = require("mongoose"),
bodyParser            = require('body-parser'),
User                  = require("./models/user"),
passport              = require("passport"),
LocalStrategy         = require("passport-local").Strategy,
coreRouter            = require('./routes/core.routes'),
dashboardRouter       = require('./routes/dashboard.routes');

// mongoose.connect('mongodb+srv://admin:Password123@cluster0.oeltw.mongodb.net/nudgyt?retryWrites=true&w=majority', { 
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

mongoose.connect(process.env.MONGODB_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

// static
app.use(express.static(path.join(__dirname, 'static')));

// views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// bodyparser
app.use(bodyParser.urlencoded({extended: true}));

// passport
app.use(require("express-session")({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((err, req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

// parent routers
app.use("/", coreRouter);
app.use("/dashboard", dashboardRouter);

app.listen(3000, () => console.log("Server started"));
   
