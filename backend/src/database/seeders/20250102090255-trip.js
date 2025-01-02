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
        id: 'ff540d05-095f-4112-b7dd-a5c0f26aaa2a',
        name: 'Ortniel ADOUMASSE',
        startDate: 'admin@admin',
        email: 'adoumasseo@gmail.com',
        role: 'super_admin',
        createdAt: '2018-03-22 08:30:58.7',
        updatedAt: '2018-03-22 08:30:58.7',
      },
      {
        id: '10d5689d-6027-4623-a879-7aeec6d05540',
        name: 'Ortniel',
        password: 'Ortniel@Ortniel',
        email: 'adoumasseo@ortniel.bj',
        companyId: '95c47a68-f724-483a-921a-4d8aefd86c8b',
        role: 'user',
        createdAt: '2018-03-22 08:30:58.7',
        updatedAt: '2018-03-22 08:30:58.7',
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
