import { sequelize } from '../database.js';

class UserController {
    async getProducts(req, res) {
        try {
            const [getData, metadata] = await sequelize.query(
                `select * from "Products"`,
                {
                    replacements: {}
                }
            );
            res.json(getData);
        } catch (error) {
            console.error('Ошибка при получении товаров', error);
            res.status(500).json({ error: 'Ошибка при получении товаров' });
        }
    }
}

export const userController = new UserController();