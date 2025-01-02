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
        id: 'ee540d05-095f-4112-b7dd-a5c0f26aaa2a',
        name: 'AdminAdmin',
        password: 'admin@admin',
        email: 'adoumasseo@gmail.com',
        role: 'super_admin'
      },
      {
        id: '10d5689d-6027-4623-a879-7aeec6d05540',
        name: 'ENEAM',
        address: 'Gbegamey',
        email: 'eneam@gouv.bj'
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
  }
};
