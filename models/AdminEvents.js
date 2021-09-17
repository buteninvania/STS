const {Schema, model} = require('mongoose')

const scheme = new Schema({
    adminEvents: Schema.Types.Mixed
})

module.exports = model('AdminEvents', scheme)