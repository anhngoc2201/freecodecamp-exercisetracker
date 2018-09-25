let mongoose = require('mongoose');
let autoIncrement = require('mongoose-auto-increment');
let userSchema = new mongoose.Schema({
 username: String
})
userSchema.plugin(autoIncrement.plugin, 'Book');
module.exports = mongoose.model('user', userSchema)
