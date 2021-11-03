const express = require('express')
const router = express.Router()
const User = require('./../models/User')

router.use((req, res, next) => {
    console.log('Route type: /players')
    next()
})

router.get('/sync', async (req, res) => {
    try {
        let players = await User.find()
        players = players.map(i => {
            return {
                id: i._id,
                name: i.name,
                playground: i.playground,
                team: i.team,
            }
        })
        res.status(200).json({data: players})
    } catch (e) {
        res.status(500).json({data: {message: 'Ошибка сервера'}})
    }
})

router.get('/:userId', async (req, res) => {
        try {
            let userId = req.params.userId
            let user = await User.findOne({_id: userId})
            user = {
                name: user.name,
                team: user.team,
                playground: user.playground
            }
            res.status(200).json({data: user})
        } catch (e) {
            res.status(500).json({data: {message: 'Ошибка сервера'}})
        }
    })

module.exports = router

