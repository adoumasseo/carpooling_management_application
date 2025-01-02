'use strict';

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
    await queryInterface.bulkInsert('Users', [
      {
        id: '50d5689d-6027-4623-a879-7aeec6d05540',
        name: 'Nithael',
        password: 'Ortniel@Ortniel',
        email: 'nithael@ortniel.bj',
        companyId: '95c47a68-f724-483a-921a-4d8aefd86c8b',
        role: 'user',
        createdAt: '2018-03-22 08:30:58.7',
        updatedAt: '2018-03-22 08:30:58.7',
      },
      {
        id: '51d5689d-6027-4623-a879-7aeec6d05540',
        name: 'Mac-Arthur',
        password: 'Ortniel@Ortniel',
        email: 'mac@ortniel.bj',
        companyId: '95c47a68-f724-483a-921a-4d8aefd86c8b',
        role: 'user',
        createdAt: '2018-03-22 08:30:58.7',
        updatedAt: '2018-03-22 08:30:58.7',
      },
      {
        id: '52d5689d-6027-4623-a879-7aeec6d05540',
        name: 'DSI',
        password: 'Ortniel@Ortniel',
        email: 'charly@ortniel.bj',
        companyId: '95c47a68-f724-483a-921a-4d8aefd86c8b',
        role: 'company_admin',
        createdAt: '2018-03-22 08:30:58.7',
        updatedAt: '2018-03-22 08:30:58.7',
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {});
  }
};
