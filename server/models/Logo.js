var mongoose = require('mongoose');

var LogoElementSchema = new mongoose.Schema({
  elementType: String,
  offsetLeft: Number,
  offsetTop: Number,

  // Applies for TEXTS
  text: String,
  color: String,
  fontSize: Number,

  // Applies for IMAGES
  url: String,
  length: Number,
  width: Number,
})

var LogoSchema = new mongoose.Schema({
  id: String,
  user: String,
  name: String,
  length: Number,
  width: Number,
  elements: [LogoElementSchema],
  backgroundColor: String,
  borderColor: String,
  borderRadius: Number,
  borderThickness: Number,
  padding: Number,
  margin: Number,
  lastUpdate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Logo', LogoSchema);