const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const attSchema = new Schema({
  userid: {
    type: String,
    required: true
  },
  timein: {
    type: String,
    required: true
  },
  timeout: {
    type: String,
    required: true
  },
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Event'
    }
  ]
});

module.exports = mongoose.model('Att', attSchema);