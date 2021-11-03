const express = require('express')
const router = express.Router()
const Playground = require('./../models/Playgrounds')
const User = require('./../models/User')

router.use((req, res, next) => {
    console.log('Route type: /playground')
    next()
})

router.get('/sync', async (req, res) => {
        try {
            const playgrounds = await Playground.find()
            for (let i = 0; i < playgrounds.length; i++) {
                playgrounds[i].game = playgrounds[i].game.filter(item => getDateFormat(new Date()) === getDateFormat(new Date(item.date)))
            }
            res.status(200).json({data: {playgrounds}})
        } catch (e) {
            res.status(500).json({data: {message: 'Ошибка сервера'}})
        }
    })

router.put('/favorite', async (req, res) => {
        try {
            const playground = await Playground.findOne({_id: req.body.playgroundName})
            const user = await User.update({name: req.body.userName}, {$set: {playground: playground.playgroundName}})
            if (user.n) {
                res.status(201).json({data: {message: `Площадка ${playground.playgroundName} дабавлена к пользователю ${req.body.userName}`}})
            } else {
                res.status(400).json({data: {message: `Площадка не добавилась`}})
            }
        } catch (e) {
            res.status(500).json({data: {message: 'Ошибка сервера'}})
        }
    })

router.get('/:playgroundId', async (req, res) => {
        try {
            const playground = await Playground.findOne({_id: req.params.playgroundId})
            const playgroundData = {
                id: playground._id,
                city: playground.city,
                address: playground.address,
                institution: playground.institution,
                playgroundName: playground.playgroundName,
                position: playground.position,
                game: [...playground.game]
            }
            res.status(200).json({data: playgroundData})
        } catch (e) {
            res.status(500).json({data: {message: 'Ошибка сервера'}})
        }
    })

module.exports = router

function getDateFormat(date) {
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
}
