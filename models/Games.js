const {Schema, model} = require('mongoose')

const scheme = new Schema({
    games: Schema.Types.Mixed
})

module.exports = model('Games', scheme)