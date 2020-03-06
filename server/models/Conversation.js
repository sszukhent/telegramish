const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  members: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  text: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  messages: [
    {
      text: {
        type: String
      },
      created: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = Conversation = mongoose.model(
  'conversation',
  ConversationSchema
);
