const ObjectID = require('../../node_modules/mongodb').ObjectID;

const messageFormat = (name, text) => {
  return {
    _id: new ObjectID(),
    user: { name: name },
    text,
    created: new Date(Date.now())
  };
};

module.exports = messageFormat;
