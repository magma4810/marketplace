module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Orders', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      productsID: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
        allowNull: false
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      deliveryAdress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deliveryDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      orderDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }

});
},

async down(queryInterface) {
  await queryInterface.dropTable('Orders');
}
};



