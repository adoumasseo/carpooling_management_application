'use strict';
const { faker } = require('@faker-js/faker');
const db = require('../models/index')

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
    const companies = await db.Company.findAll();
    const fakeUsers = [
      {
        id: 'ee540d05-095f-4112-b7dd-a5c0f26aaa2a',
        name: 'AdminAdmin',
        password: 'admin@admin',
        email: 'adoumasseo@gmail.com',
        role: 'super_admin',
        createdAt: '2018-03-22 08:30:58.7',
        updatedAt: '2018-03-22 08:30:58.7',
      }
    ];
    let role = 'user';
    companies.forEach((company) => {
      for (let i = 0; i < 5; i++) { 
        if ( i % 2 === 0) { role = 'company_admin'}
        fakeUsers.push({
          id: faker.string.uuid(),
          name: faker.name.fullName(),
          email: faker.internet.email(),
          password: 'test@test',
          role: role,
          companyId: company.id, // Foreign key
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    });
    await queryInterface.bulkInsert('Users', fakeUsers, {})
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
