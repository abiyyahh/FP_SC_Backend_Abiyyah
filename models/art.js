'use strict';
const sequelize = require('sequelize')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Art extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    get reversedDate() {
      const data = new Date(this.date)
      const year = data.getFullYear()
      let month = data.getMonth() + 1
      let day = data.getDate()
    
      if (month < 10) {
        month = '0' + month;
      }
    
      if (day < 10) {
        day = '0' + day
      }
      
      return `${year}-${month}-${day}`
    }

    static async notif(){
      const summarize = await Art.findAll({
        attributes: [ 
          [sequelize.fn('COUNT', sequelize.col('id')), 'total'],
          [sequelize.fn('MIN',sequelize.fn( 'DATE_PART', "year", sequelize.col('date'))), 'min'],
          [sequelize.fn('MAX',sequelize.fn( 'DATE_PART', "year", sequelize.col('date'))), 'max']
        ]
      })

      return summarize
    }

    static associate(models) {
      // define association here
    }
  }
  Art.init({
    name: DataTypes.STRING,
    artist: DataTypes.STRING,
    date: DataTypes.DATE,
    description: DataTypes.TEXT,
    photo: DataTypes.STRING,
    placeOfOrigin: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Art',
  });
  return Art;
};