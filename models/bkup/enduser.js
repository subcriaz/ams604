const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const enduserSchema = new Schema({
  
  /*userid: {
    type: String,
    required: true
  },*/

  usermobileno: {
    type: String,
    required: true
  },
  userlabel: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  userpw: {
    type: String,
    required: true
  }
  /*,
  ismanager: {
    type: String,
    required: true
  },
  usermanagerid: {
    type: String,
    required: true
  },
  userststus: {
    type: String,
    required: true
  },
  usercreatedon: {
    type: String,
    required: true
  },
  usercreatedby: {
    type: String,
    required: true
  }*/
  
});

module.exports = mongoose.model('EndUser', enduserSchema);