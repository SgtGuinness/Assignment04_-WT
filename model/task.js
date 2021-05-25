const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title : {type : String, required : true, unique : true},
  description : {type : String, required : true},
  author : {type : String},
  completed : {type : Boolean}
}, {collection : 'task'});

const User = mongoose.model('Task', taskSchema);

module.exports = User;
