const express = require('express')
const router = express.Router()
const AdminEvents = require('./../models/AdminEvents')
const Playground = require('./../models/Playgrounds')
const Team = require('./../models/Teams')
const Games = require('./../models/Games')
const Users = require('./../models/User')

router.use((req, res, next) => {
    console.log('Route type: /adminevent')
    next()
})

router.get('/sync', async (req, res) => {
    try {
        let dbEvents = await AdminEvents.find()
        let events = dbEvents.map(item => {
            switch (item.adminEvents.type) {
                case "playground":
                    return {
                        id: item._id,
                        type: item.adminEvents.type,
                        city: item.adminEvents.city,
                        address: item.adminEvents.address,
                        institution: item.adminEvents.institution,
                        name: item.adminEvents.name,
                        position: item.adminEvents.position
                    }
                case "team":
                    return {
                        id: item._id,
                        type: item.adminEvents.type,
                        name: item.adminEvents.name,
                        fullName: item.adminEvents.fullName,
                        users: item.adminEvents.users,
                        leader: item.adminEvents.leader
                    }
                case "game":
                    return {
                        id: item._id,
                        type: item.adminEvents.type,
                        playground: item.adminEvents.playground,
                        gameType: item.adminEvents.gameType,
                        userTeam: item.adminEvents.userTeam,
                        VS: item.adminEvents.VS,
                        enemyTeam: item.adminEvents.enemyTeam,
                        date: item.adminEvents.date
                    }
                default:
                    break
            }
        })
        res.status(200).json({data: events})
    } catch (e) {
        res.status(500).json({data: {message: 'Ошибка сервера'}})
    }
})

router.post('/add', async (req, res) => {
    try {
        console.log(req.body.data)
        const {
            city,
            address,
            institution,
            position,
            type,
            name,
            userName,
            fullName,
            playground,
            gameType,
            userTeam,
            VS,
            enemyTeam,
            date
        } = req.body.data
        console.log(`Данные для создания ивента: ${city + address + institution + position + type + name}`)
        const event = new AdminEvents
        switch (type) {
            case "playground":
                event.adminEvents = {type, city, address, institution, name, position}
                console.log(event.adminEvents)
                await event.save()
                res.status(201).json({data: {message: `Площадка '${name}' - добавится в приложение после того как рассмотрится модератором`}})
                break
            case "team":
                event.adminEvents = {type, name, fullName, users: [userName], leader: userName}
                await event.save()
                res.status(201).json({data: {message: `Новая команда - '${fullName}' добавится в приложении, после того как рассмотрится модератором`}})
                break
            case "game":
                event.adminEvents = {playground, gameType, userTeam, VS, enemyTeam, date, type}
                console.log(event.adminEvents)
                await event.save()
                res.status(201).json({data: {message: `Письмо отправлено администратору, в течении часа он рассмотрит его`}})
                break
        }
    } catch
        (e) {
        res.status(500).json({data: {message: 'Ошибка сервера'}})
    }
})

router.post('/response', async (req, res) => {
    try {
        const event = await AdminEvents.findOne({_id: req.body.eventId})
        if (req.body.response) {
            switch (event.adminEvents.type) {
                case "playground":
                    const playgroundCreator = (eventData) => {
                        let {city, address, institution, name, position} = eventData
                        return {city, address, institution, playgroundName: name, position}
                    }
                    const playground = new Playground(playgroundCreator(event.adminEvents))
                    await playground.save()
                    await AdminEvents.findOneAndDelete({_id: event._id})
                    res.status(201).json({data: {message: `Площадка ${playground.playgroundName} создана`}})
                    break
                case "team":
                    const teamCreator = (eventData) => {
                        let {name, fullName, leader} = eventData
                        return {name, fullName, leader, users: [leader]}
                    }
                    const team = new Team(teamCreator(event.adminEvents))
                    await team.save()
                    await AdminEvents.findOneAndDelete({_id: event._id})
                    res.status(201).json({data: {message: `Команда ${team.name} создана`}})
                    break
                case "game":
                    const gameCreator = (eventData) => {
                        let {playground, gameType, userTeam, VS, enemyTeam, date} = eventData
                        return {playground, gameType, userTeam, VS, enemyTeam, date}
                    }
                    const game = new Games(gameCreator(event.adminEvents))
                    await game.save()
                    const gamePlayground = await Playground.findOne({_id: event.adminEvents.playground})
                    gamePlayground.game.push(game)
                    await gamePlayground.save()
                    //await AdminEvents.findOneAndDelete({_id: event._id})
                    //Раскинуть уведомления всем участникам игры
                    let usersTeam1 = await Team.findOne({fullName: event.adminEvents.userTeam})
                    let usersTeam2 = await Team.findOne({fullName: event.adminEvents.enemyTeam})
                    let usersSubscribers = [...usersTeam1.users, ...usersTeam2.users]
                    for(let user of usersSubscribers) {
                        user = await Users.findOne({name: user})
                        user.notifications.push(game)
                        await user.save()
                    }

                    // ..............
                    res.status(201).json({data: {message: `Мероприятие создано`}})
                    break
                default:
                    break
            }
        } else {
            switch (event.adminEvents.type) {
                case "playground":
                    await AdminEvents.findOneAndDelete({_id: event._id})
                    res.status(200).json({data: {message: `Создание площадки ${event.adminEvents.name} администратор не одобрил`}})
                    break
                case "team":
                    await AdminEvents.findOneAndDelete({_id: event._id})
                    res.status(200).json({data: {message: `В созданиии команды ${event.adminEvents.name} отказано в доступе`}})
                    break
                case "game":
                    await AdminEvents.findOneAndDelete({_id: event._id})
                    res.status(200).json({data: {message: `В созданиии игры отказано в доступе`}})
            }
        }
    } catch (e) {
        res.status(500).json({data: {message: 'Ошибка сервера'}})
    }
})

module.exports = router

