const mongoose = require('mongoose');

const lightSchema = new mongoose.Schema({
  status: {
    type: Boolean,
    defaut: true
  },
  loc: {
    type: Array,
    default: [0,0]
  }
});

module.exports = mongoose.model("Light", lightSchema);
