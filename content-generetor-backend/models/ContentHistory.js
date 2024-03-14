const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    required: true,
  },
});

// ! Compile to form the model

const ContentHistory = mongoose.model("History", historySchema);
module.exports = ContentHistory;
