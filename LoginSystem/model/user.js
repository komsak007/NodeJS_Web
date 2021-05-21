//Model
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var mongoDB = 'mongodb://localhost:27017/LoginDB';

mongoose.connect(mongoDB, {
    useNewUrlparse:true
})
//connet
var db = mongoose.connection;
db.on('error',console.error.bind(console,'Mongodb connect error'));

//create
var userSchema = mongoose.Schema({
  name:{
      type:String
  },
  email:{
      type:String
  },
  password:{
      type:String
  }
})

//สร้างและเช็คดูว่ามีฐานข้อมูลหรือไม่
var User = module.exports=mongoose.model('users',userSchema);

module.exports.createUser=function(newUser,callback){
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
          newUser.password = hash;
          newUser.save(callback);
        });
      });

}

module.exports.getUserById = function(id,callback){
    User.findById(id,callback);
  }
module.exports.getUserByName = function(name,callback){
    var query = {
        name:name
    };
    User.findOne(query,callback);
  }
  module.exports.comparePassword = function(password,hash,callback){
      bcrypt.compare(password,hash,function(err,isMatch){
          callback(null,isMatch);
      });
    }
