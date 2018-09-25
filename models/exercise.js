let mongoose = require('mongoose');
let autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;
let exerciseSchema = new mongoose.Schema({
  user : { type: Schema.Types.ObjectId, ref: 'Author' },
  date: {type: Date},
  duration: {type: Number},
  description: {type: String}
})
exerciseSchema.plugin(autoIncrement.plugin, 'Book');
module.exports = mongoose.model('exercise', exerciseSchema)
