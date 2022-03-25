const express = require('express')
const sequelize = require('./config/connection')
const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', routes)

const PORT = process.env.PORT || 5001

// force: true will drop the tables and re-create
sequelize.sync({ force: false })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`App started on ${PORT}`)
        })
    })