const express = require('express');
const data = require('../data.json');
const DB = require('../database/index.js');
const Repos = require('../database/github.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var MongoClient = require('mongodb').MongoClient;

app.post('/repos', function (req, res) {
  console.log(req.body.username);
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  //res.send(res);
  //next();
  //Repos.getReposByUesrname(req.body.username, );

  let body = req.body;
  //console.log(body.username);

  Repos.getReposByUsername(body.username, (results) => {
    DB.save(results, (err, result) => {
      res.send(result);
    });
  });

  next();
});

app.get('/get', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  //var cursor = db.collection('repos').find({ "repos_url": "repoData.repos_url", "qty": 25 })

  //console.log(user.socialMediaHandles.get('github'));

  // console.log('get is working now');

  DB.collection("repos").find({}, {"repos_url": "repoData.repos_url", "qty": 25}).toArray(function(err,result) => {
    if (err) throw err;
    res.send(result);
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


