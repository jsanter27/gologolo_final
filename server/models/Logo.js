var mongoose = require('mongoose');

var LogoSchema = new mongoose.Schema({
  id: String,
  text: { type: String, default: "goLogoLo Logo" },
  color: { type: String, default: "#FF0000" },
  fontSize: { type: Number, min: 4, max: 100, default: 24 },
  backgroundColor: { type: String, default: "#FFFFFF" },
  borderColor: { type: String, default: "#000000" },
  borderRadius: { type: Number, min: 0, max: 24, default: 12 },
  borderThickness: { type: Number, min: 0, max: 48, default: 12 },
  padding: { type: Number, min: 0, max: 100, default: 12},
  margin: { type: Number, min: 0, max: 100, default: 0},
  lastUpdate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Logo', LogoSchema);