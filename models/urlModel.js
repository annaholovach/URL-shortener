const sequelize = require('../db')
const {DataTypes} = require('sequelize') 

const Url = sequelize.define('Url', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    urlCode: {type: DataTypes.STRING, required: true, unique: true, lowercase: true, trim: true},
    longUrl: {type: DataTypes.STRING, required: true, lowercase: true, trim: true},
    shortUrl: {type: DataTypes.STRING, required: true, lowercase: true, trim: true},
    }
);

module.exports = Url