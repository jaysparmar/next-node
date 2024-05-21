'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'roles',
      [
        {
          name: 'Admin',
          permissions: JSON.stringify([
            'admin-read',
            'chat-read',
            'chat-write',
            'chat-update',
            'chat-delete',
            'settings-read',
            'settings-write',
            'settings-update',
            'x-read',
            'x-write',
            'x-update',
            'x-delete',
            'admin-update',
            'admin-delete'
          ])
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('roles', null, {})
  }
}
