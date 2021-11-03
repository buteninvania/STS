const express = require('express')
const router = express.Router()
const User = require('./../models/User')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('./../middleware/auth.middleware')

router.use((req, res, next) => {
    console.log('Route type: /auth')
    next()
})

router.get('/data', auth, async (req, res) => {
        try {
            const userName = req.body.userName
            const dataUser = await User.findOne({name: userName})
            res.status(200).json({data: dataUser})
        } catch (e) {
            res.status(500).json({data: {message: 'Ошибка сервера'}})
        }
})

router.post('/login', async (req, res) => {
    try {
        let userName = req.body.name
        let user = await User.findOne({name: userName})
        if (!user) {
            return res.status(400).json({message: "пользователь не найден"})
        }
        const token = jwt.sign({userName}, config.get('jwtSecret'), {expiresIn: '2h'})
        res.status(200).json({data: {name: user.name, playground: user.playground, token}})
    } catch (e) {
        res.status(500).json({data: {message: 'Ошибка сервера'}})
    }
})

router.post('/register', async (req, res) => {
        try {
            const user = new User({name: req.body.name, password: req.body.password})
            await user.save()
            const userName = user.name
            const token = jwt.sign({userName}, config.get('jwtSecret'), {expiresIn: '2h'})
            res.status(201).json({data: {name: req.body.name, message: 'Пользователь создан', token}})
        } catch (e) {
            res.status(500).json({data: {message: 'Ошибка сервера'}})
        }
    })

module.exports = router


