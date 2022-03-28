const Sequelize = require('sequelize');
const fs = require('fs')

require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'db.stippled.art',
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        key: fs.readFileSync('./certs/client-key.cer'),
        cert: fs.readFileSync('./certs/client-cert.cer'),
        ca: fs.readFileSync('./certs/server-ca.cer')
      }
    },
    port: 3306
  });
}

module.exports = sequelize;
