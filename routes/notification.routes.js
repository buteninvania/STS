const express = require('express')
const User = require("./../models/User");
const Playground = require("./../models/Playgrounds");
const router = express.Router()

router.use((req, res, next) => {
    console.log('Route type: /notification')
    next()
})

router.delete('/:userName&:notificationID', async (req, res) => {
    try {
        const userName = req.params.userName
        const notificationID = req.params.notificationID

        console.log(notificationID)

        //1) найти юзера
        const user = await User.findOne({name: userName})
        console.log(user)
        //2) найти у юзера уведомления
        const userNotificationsFilter = user.notifications.filter(u => String(u._id) !== notificationID)
        console.log(userNotificationsFilter)
        //3) обновить данные юзера
        const userUpdate = await User.update({name:userName}, {$set: {notifications: userNotificationsFilter}})
        console.log(userUpdate)
        res.status(200).json({message: 'Уведомление удалено'})
    } catch (e) {
        res.status(500).json({data: {message: 'Ошибка сервера'}})
    }
})

module.exports = router