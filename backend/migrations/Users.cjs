module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productsID: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
    allowNull: false
  },
  ordersID: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
      allowNull: false,
    }
  
});
},

async down(queryInterface) {
  await queryInterface.dropTable('Users');
}
};

