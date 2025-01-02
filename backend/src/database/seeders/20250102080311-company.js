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
    await queryInterface.bulkInsert('Companies', [
      {
        id: '95c47a68-f724-483a-921a-4d8aefd86c8b',
        name: 'MTCA',
        address: 'Haie Vive',
        email: 'mtcasp@gouv.bj'
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
     await queryInterface.bulkDelete('Companies', null, {});
  }
};
