const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());
const posts = [
    {
        username : 'gowri',
        age : 22
    },
    {
        username : 'shankar',
        age : 23
    }
];

app.get('/post', authorization, (req,res) => {
    const filter_val = posts.filter((post) => {
        return post.username === req.user.name;
    });
   return res.json({current_user : filter_val});
})

app.post('/login', (req,res) => {
    const username = req.body.username;
    const user = {
        name : username
    }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_KEY);
    res.json({"accessToken" : accessToken});
})
function authorization(req, res, next) {
    const authToken = req.headers['authorization'];
    const token = authToken && authToken.split(" ")[1];
    //console.log(token);
    if(token == null){
        return res.status(401).send('require token');
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
        if(err){
            return res.status(403).send('error');
        }
        req.user = user;
        next();
    })
}
console.log('ram');
console.log('seetha');
console.log('laxman');
console.log('Hanuman');
app.listen(4000);
console.log('hi');