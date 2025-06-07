'use strict'; 

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Products', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT, 
        defaultValue: "",
      },
      count: {
        type: DataTypes.INTEGER, 
        defaultValue: 0,
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vendorInfo: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  },
};