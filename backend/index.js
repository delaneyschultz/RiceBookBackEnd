const auth = require('./src/auth');
const profile = require('./src/profile');
const articles = require('./src/articles');
const following = require('./src/following');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const hello = (req, res) => res.send({ hello: 'world' });



const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.get('/', hello);
auth(app);
profile(app);
//app.post('/users/:uname', getUser);
articles(app);
following(app);





// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    const addr = server.address();
    console.log(`Server listening at http://${addr.address}:${addr.port}`)
});