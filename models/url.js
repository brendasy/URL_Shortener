const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlSchema = new Schema({
  code: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  }

})

module.exports = mongoose.model('Url', urlSchema)