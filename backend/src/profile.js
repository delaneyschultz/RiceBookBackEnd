// this is profile.js which contains all user profile
// information except passwords which is in auth.js
const mongoose = require('mongoose');
const profileSchema = require('./profileSchema');
const Profile = mongoose.model('profile', profileSchema);

const getHeadline = (req, res) => {
    (async () => {
        const users = await Profile.findOne({username: req.params.uname});
        try {
            res.send( res.send({username: req.username, headline: users["status"]}));
        } catch (error) {
            res.status(500).send(error);
        }
    })();
}

const putHeadline = (req, res) => {
    (async () => {
        const old = await Profile.findOne({username: req.username});
        await Profile.updateOne({username: old["username"]}, {status: req.body.status});
        try {
            res.send({username: req.username, headline: req.body.status});
        } catch (error) {
            res.status(500).send(error);
        }
    })();
}

const getEmail = (req, res) => {
    (async () => {
        const users = await Profile.findOne({username: req.params.uname});

        try {
            res.send({username: req.username, email: users["email"]});
        } catch (error) {
            res.status(500).send(error);
        }
    })();
}

const putEmail = (req, res) => {
    (async () => {
        await Profile.updateOne({username: req.username}, {email: req.body.email});
        const update = await Profile.findOne({username: req.username});
        try {
            res.send({username: req.username, email: req.body.email});
        } catch (error) {
            res.status(500).send(error);
        }
    })();
}

const getZip= (req, res) => {
    (async () => {
        const users = await Profile.findOne({username: req.params.uname});
        try {
            res.send( res.send({username: req.username, zipcode: users["zipcode"]}));
        } catch (error) {
            res.status(500).send(error);
        }
    })();
}

const putZip = (req, res) => {
    (async () => {
        await Profile.updateOne({username: req.username}, {zipcode: req.body.zipcode});
        try {
            res.send({username: req.username, zipcode: req.body.zipcode});
        } catch (error) {
            res.status(500).send(error);
        }
    })();
}

const getDOB= (req, res) => {
    (async () => {
        const users = await Profile.findOne({username: req.params.uname});

        try {
            res.send( res.send({username: req.username, dob: users["dob"]}));
        } catch (error) {
            res.status(500).send(error);
        }
    })();
}

const getAvatar= (req, res) => {
    (async () => {
        const users = await Profile.findOne({username: req.params.uname});

        try {
            res.send( res.send({username: req.username, avatar: users["avatar"]}));
        } catch (error) {
            res.status(500).send(error);
        }
    })();
}

const putAvatar = (req, res) => {
    (async () => {
        await Profile.updateOne({username: req.username}, {avatar: req.body.avatar});
        try {
            res.send({username: req.username,avatar: req.body.avatar});
        } catch (error) {
            res.status(500).send(error);
        }
    })();
}





module.exports = (app) => {
    app.get('/headline/:uname?', getHeadline)
    app.get('/email/:uname?', getEmail)
    app.get('/zipcode/:uname?', getZip)
    app.get('/dob/:uname?', getDOB)
    app.get('/avatar/:uname?', getAvatar)
    app.put('/headline', putHeadline)
    app.put('/email', putEmail)
    app.put('/zipcode', putZip)
    app.put('/avatar', putAvatar)
}
