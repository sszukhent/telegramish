const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
// const { check, validationResult } = require('express-validator');
const Conversation = require('../../models/Conversation');
const User = require('../../models/User');

// @route GET api/conversations
// @desc Get current users profile
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const conversation = await Conversation.findOne({ user: req.user.id });

    if (!conversation) {
      return res
        .status(400)
        .json({ msg: 'There are no conversations under this user' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/conversations
// @desc Create or update conversation
// @access Private
router.post('/', auth, async (req, res) => {
  const { members, text, date, messages } = req.body;

  // Build conversation object
  const convoFields = {};
  convoFields.user = req.user.id;
  convoFields.members = {};
  if (members) {
    convoFields.members = members.split(',').map(member => member.trim());
  }
  if (text) convoFields.text = text;
  if (date) convoFields.date = date;

  convoFields.messages = {};
  if (messages) {
    convoFields.messages = messages.split(',').map(message => message.trim());
  }

  console.log('Sent');

  res.send(convoFields);
});

module.exports = router;
