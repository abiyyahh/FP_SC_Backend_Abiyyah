const express = require('express')
const routers = express.Router()
const Controller = require('../controllers/controller')
const artRouter = require('./arts')

routers.get('/', Controller.renderHome)
routers.use('/arts', artRouter)


module.exports = routers