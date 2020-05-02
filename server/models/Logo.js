var mongoose = require('mongoose');

var TextSchema = new mongoose.Schema({
  text: String,
  color: String,
  fontSize: Number,
  positionX: Number,
  positionY: Number,
  rotation: Number
});

var ImageSchema = new mongoose.Schema({
  url: String,
  positionX: Number,
  positionY: Number,
  scaleX: Number,
  scaleY: Number,
  rotation: Number
})

var LogoSchema = new mongoose.Schema({
  id: String,
  user: String,
  texts: [TextSchema],
  images: [ImageSchema],
  backgroundColor: String,
  borderColor: String,
  borderRadius: Number,
  borderThickness: Number,
  lastUpdate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Logo', LogoSchema);