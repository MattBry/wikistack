var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/wikistack'); // <= db name will be 'wikistack'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var pageSchema = new mongoose.Schema({
  title:    {type: String, required: true},
  urlTitle: {type: String, required: true, unique: true},
  content:  {type: String, required: true},
  status:   {type: String, enum: ['open', 'closed']},
  date:     {type: Date, default: Date.now},
  author:   {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  tags: {type: Array}
});

pageSchema.virtual('route').get(function(){
  return '/wiki/' + this.urlTitle;
});


function urlTitleMaker(title) {
    if (title)
     return title.replace(/\s/g, "_").replace(/\W/g, "").trim();
    else
       return Math.random().toString(36).substring(2, 7);
}

pageSchema.pre('validate', function(next) {
  this.urlTitle = urlTitleMaker(this.title);
  next();
});

pageSchema.statics.findByTags = function (searchTags) {
  return this.find({ tags: {$in: searchTags} });
}

pageSchema.methods.findSimilar = function() {
  return this.model('Page').find({ tags: {$in: this.tags},
                                  _id: {$ne: this._id}})
}

var userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true}
});

userSchema.statics.findOrCreate = function (props) {
  var self = this;
  return self.findOne({email: props.email}).exec().then(function(user){
    if (user) return user;
    else return self.create({
      email: props.email,
      name:  props.name
    });
  });
};

var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);

module.exports = {
  Page: Page,
  User: User
};