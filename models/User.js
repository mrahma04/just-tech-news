const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class User extends Model { }

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        }
    },
    {
        sequelize,
        timestamps: false, // disables automatic creation of 'created_at' and 'updated_at' fields
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
)

// User.sync({ force: true })

module.exports = User