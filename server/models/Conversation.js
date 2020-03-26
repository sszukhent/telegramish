const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  members: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  messages: [{ type: Schema.Types.ObjectId, ref: 'message' }],
  created: {
    type: Date,
    default: Date.now
  },
  selected: {
    type: Boolean,
    default: false
  }
});

module.exports = Conversation = mongoose.model(
  'conversation',
  ConversationSchema
);
