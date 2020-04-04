const messageFormat = (name, text) => {
  return {
    user: { name: name },
    text,
    created: new Date(Date.now())
  };
};

module.exports = messageFormat;
