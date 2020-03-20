const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Message = mongoose.model('message', MessageSchema);
