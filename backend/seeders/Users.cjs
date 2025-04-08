module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Users', [
        {
            username: "vannesal",
            password: "qwerty123",
            productsID: [1,6,3,9,10],
            ordersID: [1,3],
            address: "Kashkina 22, Saint-Peterburg"
        },
        {
            username: "fondapho",
            password: "qwerty123",
            productsID: [2,10,3,12],
            ordersID: [2,5],
            address: "Belloruskya 69"
        },
        {
            username: "ermesanl",
            password: "qwerty123",
            productsID: [3,7,11,11,13],
            ordersID: [4,6],
            address: "Arbat 11, Moscow"
        },
    ], {});
},

down: async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('Users', null, {});
}
};