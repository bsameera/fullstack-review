const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id : Number,
  name : Number,
  full_name : String,
  html_url : String
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('once', function() {
  console.log('We are connected to mongodb!');
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (cb(err, repo) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  if(err) {
    console.log('error : ',err);
  }
  else {
    for (var i=0; i < repo.length; i++) {
      newRepo = new Repo ({
        id: repo[i].id,
        name: repo[i].name,
        full_name: repo[i].full_name,
        html_url: repo[i].html_url
      });
      newRepo.save(cb);
      console.log('response', repo[i].name);
    }
  }
}

let find = (callback) => {
  Repo.find({}).sort('-size').limit(25).exec(callback);
}

module.exports.save = save;
mosule.exports.find = find;