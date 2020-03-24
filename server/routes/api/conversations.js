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
    const conversation = await Conversation.find({ user: req.user.id })
      .populate([
        {
          path: 'user',
          select: 'name -_id'
        },
        {
          path: 'members',
          select: 'name',
          model: 'user'
        },
        {
          path: 'messages',
          model: 'message',
          populate: {
            path: 'user',
            select: 'name -_id',
            model: 'user'
          }
        }
      ])
      .sort({
        date: -1
      });

    if (!conversation.length) {
      return res
        .status(200)
        .json({ msg: 'There are no conversationss under this user' });
    } else {
      res.json(conversation);
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
  const { members, messages } = req.body;

  // Build conversation object
  const convoFields = {};
  convoFields.user = req.user.id;
  convoFields.members = [];
  if (members) {
    convoFields.members = members.split(',').map(member => member.trim());
  }

  convoFields.messages = [];
  if (messages) {
    convoFields.messages = messages.split(',').map(message => message.trim());
  }

  console.log('Sent');

  try {
    let conversation = await Conversation.findOne({ user: req.user.id });

    if (conversation) {
      // Update
      conversation = await Conversation.findOneAndUpdate(
        { user: req.user.id },
        { $set: convoFields },
        { new: true }
      );

      return res.json(conversation);
    }
    // Create
    conversation = new Conversation(convoFields);

    await conversation.save();
    res.json(conversation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/conversations
// @desc Get all conversations
// @access Public
router.get('/', async (req, res) => {
  try {
    const conversations = await Conversation.find();
    res.json(conversations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
