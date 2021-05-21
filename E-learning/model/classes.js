var mongo = require('mongodb');
var mongoose = require('mongoose');

var mongoDB = 'mongodb://localhost:27017/ElearningDB';

mongoose.connect(mongoDB, {
    useNewUrlParser: true
})
//connet
var db = mongoose.connection;
db.on('error',console.error.bind(console,'Mongodb connect error'));

var classSchema=mongoose.Schema({
    class_id:{
      type:String
    },
    title:{
      type:String
    },
    description:{
      type:String
    },
    instructor:{
      type:String
    },
    lesson:[{
      lesson_number:{type:Number},
      lesson_title:{type:String},
      lesson_body:{type:String}
    }]
})
var Classes = module.exports=mongoose.model('classes',classSchema)

module.exports.getClasses=function(callback,limit){
      Classes.find(callback).limit(limit)
}
module.exports.getClassID=function(class_id,callback){
      var query = {
        class_id:class_id
      }
      Classes.findOne(query,callback)
}
module.exports.saveNewClass=function(newClass,callback){
      newClass.save(callback)
}
module.exports.addLesson = function(info, callback) {
  class_id = info["class_id"]
  lesson_number = info["lesson_number"]
  lesson_title = info["lesson_title"]
  lesson_body = info["lesson_body"]
  var query = {
    class_id: class_id
  }
  Classes.findOneAndUpdate(
    query, {
      $push: {
        "lesson": {
          lesson_number: lesson_number,
          lesson_title: lesson_title,
          lesson_body:lesson_body
        }
      }
    }, {
      safe: true,
      upsert: true
    }, callback
  )
}
