const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const cors = require('cors')
const app = express()
const authRouter = require('./routes/auth.routes')
const playgroundRouter = require('./routes/playground.routes')
const teamRouter = require('./routes/team.routes')
const playersRouter = require('./routes/players.routes')
const gamesRouter = require('./routes/games.routes')
const admineventRouter = require('./routes/adminevent.routes')
const notificationRouter = require('./routes/notification.routes')

app.use(express.json({extended: true}))
app.use(cors())
app.use('/api/auth', authRouter)
app.use('/api/playground', playgroundRouter)
app.use('/api/team', teamRouter)
app.use('/api/players', playersRouter)
app.use('/api/games', gamesRouter)
app.use('/api/adminevent', admineventRouter)
app.use('/api/notification', notificationRouter)

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