const {Schema, model} = require('mongoose')

const scheme = new Schema({
    name: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    avatar: {type: String, required: false},
    team: {type: String, required: false},
    playground: {type: String, required: false},
    notifications: [Schema.Types.Mixed]
})

module.exports = model('User', scheme)
