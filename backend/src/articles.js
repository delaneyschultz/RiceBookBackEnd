
const mongoose = require('mongoose');
const articleSchema = require('./articleSchema');
const Article = mongoose.model('articles', articleSchema);
const connectionString = 'mongodb+srv://new-user1:zbXsmOOLmWBNGdAE@cluster0.hhkq1.mongodb.net/social?retryWrites=true&w=majority';


const getArticles = async (req, res) => {
        const articles = await Article.find({author: req.username});
        res.send(articles);
}

const addArticle = (req, res) => {
        (async () => {
            const connector =  mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
            await (connector.then(()=> new Article({author: req.username, text: req.body.text, comments: []}).save()));
        })();
        res.send({author: req.username, text: req.body.text, comments: []})
}


module.exports = (app) => {
    app.get('/articles/:id?', getArticles);
    app.post('/article', addArticle);
    //app.put('/articles/:id', update);
}