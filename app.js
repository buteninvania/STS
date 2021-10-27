const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const User = require('./models/User')
const Playground = require('./models/Playgrounds')
const Team = require('./models/Teams')
const Games = require('./models/Games')
const AdminEvents = require('./models/AdminEvents')
const jwt = require('jsonwebtoken')
const auth = require('./middleware/auth.middleware')
const cors = require('cors')
const app = express()

app.use(express.json({extended: true}))
app.use(cors())

app.post(
    '/api/auth/register',
    async (req, res) => {
        try {
            const user = new User({name: req.body.name, password: req.body.password})
            await user.save()
            const name = user.name
            const token = jwt.sign(
                {name},
                config.get('jwtSecret'),
                {expiresIn: '2h'}
            )

            res.status(201).json({data: {name: req.body.name, message: 'Пользователь создан', token}})

        } catch (e) {
            res.status(500).json({data: {message: 'Ошибка сервера'}})
        }
    })
app.post(
    '/api/auth/login',
    async (req, res) => {
        try {

            const name = req.body.name
            const user = await User.findOne({name})
            if (!user) {
                return res.status(400).json({message: "пользователь не найден"})
            }
            const token = jwt.sign(
                {name},
                config.get('jwtSecret'),
            {expiresIn: '2h'}
            )
            res.status(200).json({data: {name: user.name, playground: user.playground, token}})
        } catch (e) {
            res.status(500).json({data: {message: 'Ошибка сервера'}})
        }
    })
app.get(
    '/api/playground/sync',
    async (req, res) => {
        try {
            const playgrounds = await Playground.find()
            for(let i = 0; i < playgrounds.length; i++) {
                playgrounds[i].game.filter(item => {
                    const getDate = (date) => {
                        let day = date.getDate();
                        let month = date.getMonth();
                        let year = date.getFullYear();
                        return `${day}/${month}/${year}`
                    }
                    getDate(new Date()) === getDate(new Date(item.date)) ? true : false
                })
            }
            res.status(200).json({data: {playgrounds}})

        } catch (e) {
            res.status(500).json({data: {message: 'Ошибка сервера'}})
        }
    })
app.get(
    '/api/team/sync',
    async (req, res) => {
        try {
            const teams = await Team.find()
            res.status(200).json({data: {teams}})

        } catch (e) {
            res.status(500).json({data: {message: 'Ошибка сервера'}})
        }
    })
app.put(
    '/api/playground/favorite',
    async (req, res) => {
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
app.post(
    '/api/adminevent/add',
    async (req, res) => {
        try {
            const futureEvent = req.body.data
            if (futureEvent.type === "playground") {
                const event = new AdminEvents
                event.adminEvents = {
                    type: futureEvent.type,
                    city: futureEvent.city,
                    address: futureEvent.address,
                    institution: futureEvent.institution,
                    name: futureEvent.playgroundName,
                }
                await event.save()
                res.status(201).json({data: {message: `Письмо отправлено администратору, в течении часа он рассмотрит его`}})
            }
            if (futureEvent.type === "team") {
                const event = new AdminEvents
                event.adminEvents = {
                    type: futureEvent.type,
                    name: futureEvent.name,
                    fullName: futureEvent.fullName,
                }
                await event.save()
                res.status(201).json({data: {message: `Письмо отправлено администратору, в течении часа он рассмотрит его`}})
            }
            if (futureEvent.type === "game") {
                const event = new AdminEvents
                event.adminEvents = {...futureEvent}
                await event.save()
                res.status(201).json({data: {message: `Письмо отправлено администратору, в течении часа он рассмотрит его`}})
            }
        } catch (e) {
            res.status(500).json({data: {message: 'Ошибка сервера'}})
        }
    })
app.get(
    '/api/adminevent/sync',
    async (req, res) => {
        try {
            let dbEvents = await AdminEvents.find()
            let events = []
            dbEvents.map(item => {
                switch (item.adminEvents.type) {
                    case "playground":
                        events.push({
                            id: item._id,
                            type: item.adminEvents.type,
                            city: item.adminEvents.city,
                            address: item.adminEvents.address,
                            institution: item.adminEvents.institution,
                            name: item.adminEvents.name
                        })
                        break
                    case "team":
                        events.push({
                            id: item._id,
                            type: item.adminEvents.type,
                            name: item.adminEvents.name,
                            fullName: item.adminEvents.fullName
                        })
                        break
                    case "game":
                        events.push({
                            id: item._id,
                            type: item.adminEvents.type,
                            playground: item.adminEvents.playground,
                            gameType: item.adminEvents.gameType,
                            userTeam: item.adminEvents.userTeam,
                            VS: item.adminEvents.VS,
                            enemyTeam: item.adminEvents.enemyTeam,
                            date: item.adminEvents.date
                        })
                    default:
                        break
                }
            })
            res.status(200).json({data: events})
        } catch (e) {
            res.status(500).json({data: {message: 'Ошибка сервера'}})
        }
    })
app.post(
    '/api/adminevent/response',
    async (req, res) => {
        try {
            const event = await AdminEvents.findOne({_id: req.body.eventId})
            if (req.body.response) {
                switch (event.adminEvents.type) {
                    case "playground":
                        const playground = new Playground({
                            city: event.adminEvents.city,
                            address: event.adminEvents.address,
                            institution: event.adminEvents.institution,
                            playgroundName: event.adminEvents.name,
                        })
                        await playground.save()
                        await AdminEvents.findOneAndDelete({_id: event._id})
                        res.status(201).json({data: {message: `Площадка ${playground.playgroundName} создана`}})
                        break
                    case "team":
                        const team = new Team({
                            name: event.adminEvents.name,
                            fullName: event.adminEvents.fullName,
                        })
                        await team.save()
                        await AdminEvents.findOneAndDelete({_id: event._id})
                        res.status(201).json({data: {message: `Команда ${team.name} создана`}})
                        break
                    case "game":
                        const game = new Games({
                            playground: event.adminEvents.playground,
                            gameType: event.adminEvents.gameType,
                            userTeam: event.adminEvents.userTeam,
                            VS: event.adminEvents.VS,
                            enemyTeam: event.adminEvents.enemyTeam,
                            date: event.adminEvents.date
                        })
                        await game.save()
                        //Добавление игры к соответствующей площадке
                        //Сначала найдем соответствующую площадку
                        const gamePlayground = await Playground.findOne({_id: event.adminEvents.playground})
                        gamePlayground.game.push(game)
                        await gamePlayground.save()
                        await AdminEvents.findOneAndDelete({_id: event._id})
                        res.status(201).json({data: {message: `Мероприятие создано`}})
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
                    case "game":
                        await AdminEvents.findOneAndDelete({_id: event._id})
                        res.status(200).json({data: {message: `В созданиии игры отказано в доступе`}})
                }
            }
        } catch (e) {
            res.status(500).json({data: {message: 'Ошибка сервера'}})
        }
    })

app.get(
    '/api/auth/data',
    auth,
    async (req, res) => {
        try {
            const userName = req.body.name
            const dataUser = await User.findOne({name: userName})
            res.status(200).json({data: dataUser})
        } catch (e) {
            res.status(500).json({data: {message: 'Ошибка сервера'}})
        }
    })

app.post(
    '/api/team/favorite',
    async (req, res) => {
        try {
            const team = await Team.findOne({_id: req.body.teamId})
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

app.get(
    '/api/players/sync',
    async (req, res) => {
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

app.get(
    '/api/players/:userId',
    async (req,res) => {
        try {
            const userId = req.params.userId
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
    }
)

app.get (
    '/api/playground/:playgroundId',
    async (req, res) => {
        try {
            const playground = await Playground.findOne({_id: req.params.playgroundId})
            const playgroundData = {
                id: playground._id,
                city: playground.city,
                address: playground.address,
                institution: playground.institution,
                playgroundName: playground.playgroundName,
            }
            res.status(200).json({data: playgroundData})
        } catch (e) {
            res.status(500).json({data: {message: 'Ошибка сервера'}})
        }
    }
)

app.post(
    '/api/games/add',
    async (req, res) => {
        try {
            const reqGameData = req.body
            const newEventAdmin = {
            }
            res.status(201).json({data: {message: `Игра находится у подтверждении у модератора`, eventData: reqGameData}})
        } catch (e) {
            res.status(500).json({data: {message: 'Ошибка сервера'}})
        }
    })

app.get (
    '/api/games/sync',
    async (req, res) => {
        try {
            const games = await Games.find()
            res.status(200).json({data: games})
        } catch (e) {
            res.status(500).json({data: {message: 'Ошибка сервера'}})
        }
    }
)


const PORT = config.get('port') | 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`Сервер запущен на ${PORT} порту`))
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()