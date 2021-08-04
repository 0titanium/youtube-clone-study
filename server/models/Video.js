const mongoose = require("mongoose");

const videoSchema = mongoose.Schema({
  name: {
      type: string
  }
});

module.exports = { Video };
