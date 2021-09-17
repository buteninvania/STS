const {Router} = require('express')
const User = require('../models/User')
const router = Router()

router.post(
    '/authorization',
    async (req, res) => {
        try {
            const user = new User({name: req.body.name, password: req.body.password})
            await user.save()
            res.status(201).json({data: {message: 'Пользователь создан'}})

        } catch (e) {
            res.status(500).json({data: {message: 'Ошибка сервера'}})
        }
    })