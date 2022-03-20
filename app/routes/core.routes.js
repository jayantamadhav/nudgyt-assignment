var express             = require('express'),
User                    = require('../models/user'),
passport                = require('passport'),
router                  = express.Router();

router.get("/", (req, res) => {
    if(req.isAuthenticated()) {
        return res.redirect("/dashboard");
    }
    res.render("home", { title: 'Home', page: "login" });
})

router.get("/register", (req, res) => res.render("home", { title: 'Register', page: "register" })); 

router.post("/register", async (req, res, next)=> {
    if (req.isAuthenticated()) {
        res.redirect("/dashboard");
    }
    let ctx = {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        title: "Register",
        page: "register",
        username_taken: false,
        email_registered: false
    }

    let user_clashing_username = await User.findOne({ username: ctx.username });
    if (user_clashing_username){
        ctx.username_taken = true;
    }

    let user_clashing_email = await User.findOne({ email: ctx.email });
    if (user_clashing_email){
        ctx.email_registered = true;
    }
    
    if (user_clashing_email || user_clashing_username) {
        res.render("home", ctx)
    }
    else {
        let _user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
        })

        User.register(_user, req.body.password)
            .then(user => {
                req.login(user, (err) => {
                    if (err){
                        return next(err)
                    }
                    return res.redirect("/dashboard");
                })
            })
            .catch(err => {
                ctx.error = "Ooops, something went wrong";
                res.render("home", ctx);
            });
    }
 });

router.post("/login", passport.authenticate("local", {
    successRedirect:"/dashboard", 
    failureRedirect:"/" }), 
    (req,res) => {}
);

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

module.exports = router;