const express = require('express')
const router = express.Router()
const Teams = require('./../models/Teams')
const User = require('./../models/User')

router.use((req, res, next) => {
    console.log('Route type: /team')
    next()
})

router.get('/sync', async (req, res) => {
    try {
        const teams = await Teams.find()
        res.status(200).json({data: {teams}})
    } catch (e) {
        res.status(500).json({data: {message: 'Ошибка сервера'}})
    }
})

router.post('/favorite', async (req, res) => {
    try {
        const team = await Teams.findOne({_id: req.body.teamId})
        team.users.push(req.body.userName)
        await team.save()
        const user = await User.update({name: req.body.userName}, {$set: {team: team.fullName}})
        if (user.n) {
            res.status(201).json({data: {message: `Команда ${team.fullName} дабавлена к пользователю ${req.body.userName}`}})
        } else {
            res.status(400).json({data: {message: `Площадка не добавилась`}})
        }
    } catch (e) {
        res.status(500).json({data: {message: 'Ошибка сервера'}})
    }
})

router.get('/:teamId', async (req, res) => {
    try {
        const teamId = req.params.teamId
        const team = await Teams.findOne({_id: teamId})
        res.status(200).json({data: team})
    } catch (e) {
        res.status(500).json({data: {message: 'Ошибка сервера'}})
    }
})

module.exports = router

