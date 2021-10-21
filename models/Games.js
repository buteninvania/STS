const {Schema, model} = require('mongoose')

const scheme = new Schema({
    playground: {type: String, required: true},
    gameType: {type: String, required: true},
    userTeam: {type: String, required: true},
    VS: {type: String, required: true},
    enemyTeam: {type: String, required: true}
})

module.exports = model('Games', scheme)