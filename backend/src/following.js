const mongoose = require('mongoose');
const profileSchema = require('./profileSchema');
const articleSchema = require("./articleSchema");
const Profile = mongoose.model('profiles', profileSchema);

const getFollowing = async (req, res) => {
    const user = await Profile.find({username: req.params.uname});

    res.send(user["following"]);
}

const updateFollowing = (req, res) =>{
    (async () => {
        let newFollower = req.params.uname;
        const old = await Profile.findOne({username: req.username});
        let followers = old["following"];
        followers.push(newFollower);
        await Profile.updateOne({username: req.username}, {following: followers});
        try {
            res.send({username: req.username, following: followers});
        } catch (error) {
            res.status(500).send(error);
        }
    })();
}

const remove = (req, res) =>{
    (async () => {
        let removeFollower = req.params.uname;
        const old = await Profile.findOne({username: req.username});
        let followers = old["following"];
        followers.remove(removeFollower);
        await Profile.updateOne({username: req.username}, {following: followers});
        try {
            res.send({username: req.username, following: followers});
        } catch (error) {
            res.status(500).send(error);
        }
    })();
}


module.exports = (app) => {
    app.get('/following/:uname?', getFollowing)
    app.put('/following/:uname', updateFollowing)
    app.delete('/following/:uname', remove)
    //app.delete('/following/:uname', getZip)
}