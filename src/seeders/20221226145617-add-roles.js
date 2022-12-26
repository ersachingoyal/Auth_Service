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

    
      await queryInterface.bulkInsert(  //our project will be having these roles only
        "Roles",
        [
          {
            name: "ADMIN",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: "CUSTOMER",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: "AIRLINE_BUISNESS",
            createdAt: new Date(),
            updatedAt: new Date()
          },
        ],
        {}
      );
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
