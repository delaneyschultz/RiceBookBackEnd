const md5 = require('md5');
//const redis = require('redis').createClient('redis://:p0ad57afcb09d8c5096ec78c2309b9acc50b889b774cebe4202cec69301853a1d@ec2-3-213-148-22.compute-1.amazonaws.com:22700');
let sessionUser = {};
let cookieKey = "sid";

const mongoose = require('mongoose');
const userSchema = require('./userSchema');
const User = mongoose.model('users', userSchema);

const profileSchema = require('./profileSchema');
const Profile = mongoose.model('profiles', profileSchema);

const connectionString = 'mongodb+srv://new-user1:zbXsmOOLmWBNGdAE@cluster0.hhkq1.mongodb.net/social?retryWrites=true&w=majority';

let userObjs = {};

function isLoggedIn(req, res, next) {
    let sid = req.cookies[cookieKey];
    console.log(userObjs);
    // likely didn't install cookie parser
    if (!req.cookies) {
        return res.sendStatus(401);
    }

    // no sid for cookie key
    if (!sid) {
        return res.sendStatus(401);
    }

    let username = sessionUser[sid];
    console.log(username);
    // no username mapped to sid
    if (username) {
        req.username = username;
        next();
    }
    else {
        return res.sendStatus(401)
    }
}



function login(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    // supply username and password
    if (!username || !password) {
        return res.sendStatus(400);
    }

    let user = userObjs[username];

    if (!user) {
        return res.sendStatus(401)
    }

    let hash = md5(user.salt + password);

    if (hash === user.hash) {
        let sid = md5(user.hash + user.salt);
        sessionUser[sid] = user.username;
        /**
        redis.hmset('sessions',sid, user.username);
        redis.hmget('sessions',sid, function(err, obj){
            console.log("one hash sessino, value username is " + obj);
        });
        redis.hgetall('sessions', function(err,sids){
            console.log("hash sessions, value username is " + Object.values(sids));
        });
        **/
        // Adding cookie for session id
        res.cookie(cookieKey, sid, { maxAge: 3600*1000, httpOnly: true, sameSite: 'None', secure: true})
        let msg = {username: username, result: 'success'};
        res.send(msg);
    }
    else {
        res.sendStatus(401);
    }
}


function register(req, res) {
    let username = req.body.username;
    let email = req.body.email;
    let dob = req.body.dob;
    let zipcode = req.body.zipcode;
    let password = req.body.password;

    (async () => {
        const connector =  mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        await (connector.then(()=> new Profile({username: username, email: email, dob: dob, zipcode: zipcode, password: password, avatar: "", status: "", following: [], created: Date.now()}).save()));
    })();


    // supply username and password
    if (!username || !password) {
        return res.sendStatus(400);
    }

    let salt = username + new Date().getTime();
    let hash = md5(salt + password);

    (async () => {
        const connector =  mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        await (connector.then(()=> new User({user: username, salt: salt, hash: hash, created: Date.now()}).save()));
    })();

    userObjs[username] = {username: username, salt: salt, hash: hash}

    let msg = {result: 'success', username: username};
    res.send(msg);

}

function logout(req, res){
    userObjs = {};
    sessionUser = {};
    res.send("OK")
}

function password(req, res){
    (async () => {
        await Profile.updateOne({username: req.username}, {password: req.body.password});
        const update = await Profile.findOne({username: req.username});
        try {
            res.send({username: req.username, password: req.body.password});
        } catch (error) {
            res.status(500).send(error);
        }
    })();
}

module.exports = (app) => {
    app.post('/register', register);
    app.post('/login', login);
    app.put('/logout', isLoggedIn, logout);
    app.put('/password', isLoggedIn, password);
    app.use(isLoggedIn);
}


