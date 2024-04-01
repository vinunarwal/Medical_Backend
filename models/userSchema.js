const mongoose = require("mongoose");

  const userSchema = mongoose.Schema({
    report: Object,

});

module.exports = mongoose.model("test", userSchema);