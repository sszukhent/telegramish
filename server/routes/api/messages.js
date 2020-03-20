const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
// const { check, validationResult } = require('express-validator');
const Message = require('../../models/Message');
const User = require('../../models/User');

// @route GET api/messages
// @desc Get current user messages
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const message = await Message.find({ user: req.user.id }).sort({
      date: -1
    });

    if (!message.length) {
      return res
        .status(400)
        .json({ msg: 'There are no messages under this user' });
    } else {
      res.json(message);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error Right HERE');
  }
});

// @route POST api/messages
// @desc Create or update user messages
// @access Private
router.post('/', auth, async (req, res) => {
  const { text } = req.body;
  const user = req.user.id;

  // Build message object
  const messageFields = {};
  //   messageFields.user = req.user.id;
  //   messageFields.text = text;
  //   messageFields.created = date;
  //   if (members) {
  //     messageFields.members = members.split(',').map(member => member.trim());
  //   }
  if (user) messageFields.user = user;
  if (text) messageFields.text = text;
  //   if (date) messageFields.date = date;

  //   messageFields.messages = {};
  //   if (messages) {
  //     messageFields.messages = messages.split(',').map(message => message.trim());
  //   }

  console.log('Sent');

  try {
    //     let message = await Message.findOne({ user: req.user.id });

    //     if (message) {
    //       // Update
    //       message = await Message.findOneAndUpdate(
    //         { user: req.user.id },
    //         { $set: messageFields },
    //         { new: true }
    //       );

    //       return res.json(message);
    //     }
    // Create
    message = new Message(messageFields);

    await message.save();
    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// // @route GET api/conversations
// // @desc Get all conversations
// // @access Public
// router.get('/', async (req, res) => {
//   try {
//     const conversations = await Conversation.find();
//     res.json(conversations);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

module.exports = router;
