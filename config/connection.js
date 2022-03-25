const Sequelize = require('sequelize')
const fs = require('fs')

require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'db.stippled.art',
    dialect: 'mysql',
    dialectOptions: {
        ssl: {
            cert: fs.readFileSync('././certs/client-cert.cer'),
            key: fs.readFileSync('././certs/client-key.cer'),
            ca: fs.readFileSync('././certs/server-ca.cer')
        }
    }
})

// sequelize.authenticate()
//     .then(() => console.log('Connection has been established successfully.'))
//     .then(() => sequelize.sync({ force: true }))
//     .catch((error) => console.error('Unable to connect to the database:', error))

// sequelize.sync({ force: true })
//     .then(() => console.log('Models synced'))
//     .catch((error) => console.error(error))

module.exports = sequelize