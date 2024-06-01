'use strict';

const {readFile} = require('fs').promises

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const data = await readFile('./data/arts.json', 'utf-8')
    const parsed = JSON.parse(data)
    const arts = parsed.map(el => {
      delete el.id
      el.createdAt = new Date()
      el.updatedAt = new Date()
      el.placeOfOrigin = 'example'

      return el
    })
    await queryInterface.bulkInsert('Arts', arts, {} )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Arts', null, {
      truncate: true,
      restartIdentity: true
    })
  }
};
