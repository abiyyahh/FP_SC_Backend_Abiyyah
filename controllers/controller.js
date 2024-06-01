const { Art } = require('../models')
const { Op } = require('sequelize')

class Controller {

  //Controller untuk menampilkan tampilan home yang di dalamnya terdapat menu utama
  static async renderHome(req, res) {
    try {
      let options = {}
      if (req.query.searchTitle){
        options.where = {
          name: {
            [Op.iLike]: `%${req.query.searchTitle}%`
          }
        }
      } else {
        options.where = {
          artist: {
            [Op.iLike]: `%${req.query.searchArtist}%`
          }
        }
      }
      options.order = [['date', 'DESC']]

    let data 
      if (req.query.searchTitle || req.query.searchArtist) {
         data = await Art.findAll(options)
      } else {
        data = await Art.findAll({
          order: [
            ['date', 'DESC']
          ]
        })
      }

      const summarize = await Art.notif()

      // res.send({ data, summarize }) //Uncomment section ini hanya untuk mengambil data arts

    
      res.render('home', { data, summarize }) //Uncomment section ini apabila ingin menampilkan tampilan di browser
    } catch (error) {
      console.log(error)
      res.send(error)
    }
  }

  //Controller untuk menampilkan form Add arts
  static async renderAdd(req, res) {
    try {
      res.render('add')
    } catch (error) {
      console.log(error)
      res.send(error)
    }
  }

  //Controller untuk post Add Arts
  static async createArts(req, res) {
    try {
      // console.log(req.body)
      let { name, artist, date, photo, placeOfOrigin, description} = req.body
      await Art.create({
        name, artist, date, photo, placeOfOrigin, description
      })
      res.redirect('/')
    } catch (error) {
      console.log(error)
      res.send(error)
    }
  }

  //Controller untuk menampilkan arts detail
  static async artsDetail(req, res) {
    try {
      let { id } = req.params
      const art = await Art.findByPk(id)

      // res.send({art}) //uncomment section ini untuk menampilkan datanya saja di postman
      res.render('detail', { art }) //uncomment section ini untuk menampilkan tampilan di browser
    } catch (error) {
      console.log(error)
      res.send(error)
    }
  }

  //Controller untuk edit arts
  static async editArts(req, res) {
    try {
      let { id } = req.params
      console.log(req.body)

      let {name, artist, date, photo, placeOfOrigin, description} = req.body

      await Art.update({name, artist, date, photo, placeOfOrigin, description}, {
        where: {
          id
        }
      })
      res.redirect('/')
    } catch (error) {
      console.log(error)
      res.send(error)
    }
  }

  //Controller untuk delete arts
  static async handleDelete(req, res) {
    try {
      let { id } = req.params
      await Art.destroy({
        where: {
          id
        }
      })
      res.redirect('/')

    } catch (error) {
      console.log(error)
      res.send(error)
    }
  }

}

module.exports = Controller