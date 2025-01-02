'use strict';
const { faker } = require('@faker-js/faker')

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
    const fakeCompanies = [];
      for (let i = 0; i < 10; i++) {
        fakeCompanies.push({
          id: faker.string.uuid(),
          name: faker.company.name(),
          address: faker.address.streetAddress(),
          email: faker.internet.email(),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
    };
    await queryInterface.bulkInsert('Companies', fakeCompanies, {})
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
