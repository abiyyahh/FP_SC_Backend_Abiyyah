const routers = require('express').Router()
const Controller = require('../controllers/controller')

routers.get('/add', Controller.renderAdd)
routers.post('/add', Controller.createArts)
routers.get('/:id', Controller.artsDetail)
routers.post('/:id/edit', Controller.editArts)
routers.get('/:id/delete', Controller.handleDelete)

module.exports = routers