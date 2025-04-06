module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Users', [
        {
            username: "vannesal",
            password: "qwerty123",
            productsID: [1,6,3,9,10],
            ordersID: [1,3]
        },
        {
            username: "fondapho",
            password: "qwerty123",
            productsID: [2,10,3,12],
            ordersID: [2,5]
        },
        {
            username: "ermesanl",
            password: "qwerty123",
            productsID: [3,7,11,11,13],
            ordersID: [4,6,7]
        },
    ], {});
},

down: async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('Users', null, {});
}
};