const express = require('express')
const router = express.Router()
const User = require('./../models/User')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('./../middleware/auth.middleware')
const Playground = require("./../models/Playgrounds");

router.use((req, res, next) => {
    console.log('Route type: /auth')
    next()
})

router.get('/data', auth, async (req, res) => {
        try {
            const userName = req.body.token.userName
            const dataUser = await User.findOne({name: userName})
            /* clear notifications*/
            let playgroundsId = [... new Set(dataUser.notifications.map(n => n.playground))]
            const playground = await Playground.findOne({_id: playgroundsId[0]})
            console.log(playground)
            /**********************/

            const responseData = {
                avatar: dataUser.avatar,
                name: dataUser.name,
                notifications: dataUser.notifications,
                team: dataUser.team,
                id: dataUser._id,
                playground: playground
            }
            res.status(200).json(responseData)
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
        res.status(200).json({name: user.name, token})
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
            res.status(201).json({name: req.body.name, message: 'Пользователь создан', token})
        } catch (e) {
            res.status(500).json({data: {message: 'Ошибка сервера'}})
        }
})

router.post('/avatar', auth, async (req, res) => {
    try {
        const userName = req.body.token.userName
        let user = await User.findOne({name: userName})
        if (!user) {
            return res.status(400).json({message: "пользователь не найден"})
        }
        user.avatar = req.body.imgUrl
        await user.save()
        res.status(201).json({data: {imgUrl: req.body.imgUrl, message: 'Фото добавлено'}})
    } catch (e) {
        res.status(500).json({data: {message: 'Ошибка сервера'}})
    }
})

module.exports = router


