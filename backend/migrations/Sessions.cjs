module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.createTable('Sessions', {
        sid: {
          type: Sequelize.STRING,
          primaryKey: true
        },
        expires: {
          type: Sequelize.DATE
        },
        data: {
          type: Sequelize.TEXT
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false
        }
      });
    },
  
    async down(queryInterface) {
      await queryInterface.dropTable('Sessions');
    }
  };