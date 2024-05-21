'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'admins',
      [
        {
          firstname: 'Super',
          lastname: 'Admin',
          email: 'admin@admin.com',
          password: '25d55ad283aa400af464c76d713c07ad', // Replace with an actual hashed password
          status: 1,
          role_id: 1, // Assuming you have a role_id of 1
          access_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiU3VwZXIxMjMiLCJsYXN0bmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJzdGF0dXMiOjEsInJvbGVfaWQiOjEsInBlcm1pc3Npb25fcmVzZXQiOjAsImNyZWF0ZWQiOiIyMDI0LTA1LTIwVDExOjU2OjUzLjAwMFoiLCJ1cGRhdGVkIjoiMjAyNC0wNS0yMFQxMTo1Njo1My4wMDBaIiwiZnVsbE5hbWUiOiJTdXBlcjEyMyBBZG1pbiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNjI2NjYzNSwiZXhwIjoxNzE2MjczODM1fQ.lHR-9AphcZ_cDV1_a9AyEsfrMvge56txn9r7meDE924',
          permission_reset: false,
          created: new Date(),
          updated: new Date()
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('admins', null, {})
  }
}
