let express             = require('express'),
User                    = require('../models/user'),
connectEnsureLogin      = require('connect-ensure-login'),
router                  = express.Router();

router.get("/", connectEnsureLogin.ensureLoggedIn('/'), (req, res) => {
    let ctx = { 
        title: 'Console',
        username: req.user.username,
        moment: require('moment'),
    }

    User.find({})
        .then(users => {
            ctx.users = users;
            return res.render("dashboard/dashboard", ctx);
        })
        .catch(err => {
            ctx.users = null;
            return res.render("dashboard/dashboard", ctx);
        });
})

module.exports = router;