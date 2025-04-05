module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Orders', [
            {
                productsID: [1, 6, 3, 9, 10],
                deliveryAdress: "pr Mira 68, Moscow",
                deliveryDate: "11.03.2025",
                orderDate: "13.03.2025",
                cost: 10650
            },
            {
                productsID: [2, 7, 4, 10, 11],
                deliveryAdress: "pr Mira 68, Moscow",
                deliveryDate: "01.05.2025",
                orderDate: "03.05.2025",
                cost: 12250
            },
            {
                productsID: [2, 1, 3, 8, 9],
                deliveryAdress: "pr Lenina 69, Moscow",
                deliveryDate: "19.03.2025",
                orderDate: "22.03.2025",
                cost: 8850
            },
            {
                productsID: [1, 2],
                deliveryAdress: "Arbat 11, Moscow",
                deliveryDate: "20.03.2025",
                orderDate: "21.03.2025",
                cost: 4480
            },
            {
                productsID: [5, 6, 1],
                deliveryAdress: "Pushkina 11, Saint-Peterburg",
                deliveryDate: "21.03.2025",
                orderDate: "25.03.2025",
                cost: 9070
            },
            {
                productsID: [6, 14, 11, 13, 2, 12],
                deliveryAdress: "Kashkina 22, Saint-Peterburg",
                deliveryDate: "19.03.2025",
                orderDate: "21.03.2025",
                cost: 17972
            },
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Orders', null, {});
    }
};