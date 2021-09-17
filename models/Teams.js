const {Schema, model} = require('mongoose')

const scheme = new Schema({
    name: {type: String, required: true},
    fullName: {type: String, required: true},
})

module.exports = model('Team', scheme)