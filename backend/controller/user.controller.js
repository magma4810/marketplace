import { sequelize } from '../database.js';

class UserController {
    async products(req, res) {
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
    async productsById(req, res) {
        const { id } = req.params;
        try {
            const [getData, metadata] = await sequelize.query(
                `select * from "Products" where id=:id`,
                {
                    replacements: {id}
                }
            );
            res.json(getData);
        } catch (error) {
            console.error('Ошибка при получении товарa', error);
            res.status(500).json({ error: 'Ошибка при получении товарa' });
        }
    }
    async getMyOrders(req, res) {
        const { username } = req.params;
        try {
            const [getData, metadata] = await sequelize.query(
                `select "ordersID" from "Users" where username=:username`,
                {
                    replacements: {username}
                }
            );
            res.json(getData);
        } catch (error) {
            console.error('Ошибка при получении заказов', error);
            res.status(500).json({ error: 'Ошибка при получении заказов' });
        }
    }
    async updateMyOrders(req, res) {
        const { username } = req.params;
        const { orders } = req.body;
        try {
            const [getData, metadata] = await sequelize.query(
                `UPDATE "Users" 
                SET "ordersID" = ARRAY[:orders]
                WHERE username = :username`,
                {
                    replacements: {username,orders}
                }
            );
            res.json(getData);
        } catch (error) {
            console.error('Ошибка при обновлении заказов', error);
            res.status(500).json({ error: 'Ошибка при обновлении заказов' });
        }
    }
    async getOrderByID(req, res) {
        const { id } = req.params;
        try {
            const [getData, metadata] = await sequelize.query(
                `select * from "Orders" where id=:id`,
                {
                    replacements: {id}
                }
            );
            res.json(getData);
        } catch (error) {
            console.error('Ошибка при получении заказа', error);
            res.status(500).json({ error: 'Ошибка при получении заказа' });
        }
    }
    async getCart(req, res) {
        const { username } = req.params;
        try {
            const [getData, metadata] = await sequelize.query(
                `select "productsID" from "Users" where username=:username`,
                {
                    replacements: {username}
                }
            );
            res.json(getData);
        } catch (error) {
            console.error('Ошибка при получении корзины', error);
            res.status(500).json({ error: 'Ошибка при получении корзины' });
        }
    }
    async clearCart(req, res) {
        const { username } = req.params;
        try {
            const [getData, metadata] = await sequelize.query(
                `UPDATE "Users" 
                SET "productsID" = ARRAY[]::integer[]
                WHERE username = :username`,
                {
                    replacements: {username}
                }
            );
            res.json(getData);
        } catch (error) {
            console.error('Ошибка при очистке корзины', error);
            res.status(500).json({ error: 'Ошибка при очистке корзины' });
        }
    }
    async updateCart(req, res) {
        const { username } = req.params;
        const { cart } = req.body;
        try {
            const [getData, metadata] = await sequelize.query(
                `UPDATE "Users" 
                SET "productsID" = ARRAY[:cart]
                WHERE username = :username`,
                {
                    replacements: {username,cart}
                }
            );
            res.json(getData);
        } catch (error) {
            console.error('Ошибка при обновлении корзины', error);
            res.status(500).json({ error: 'Ошибка при обновлении корзины' });
        }
    }
    async login(req, res) {
        res.cookie('authenticated', "true", { maxAge: 86400000, httpOnly: false });
        req.session.regenerate((err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Ошибка при создании сессии' });
            }
            req.session.isAuthenticated = true;
            req.session.save((err) => {
                if (err) {
                    return res.status(500).json({ success: false, message: 'Ошибка при сохранении сессии' });
                }
                res.json({
                    success: true,
                    message: 'Успешно!',
                });
            });
        });
    }
    async logout(req, res) {
        try {
            console.log('Cookies before clear:', req.cookies);

            res.clearCookie('authenticated', {
                path: '/',
                httpOnly: true,
            });

            req.session.destroy((err) => {
                if (err) {
                    console.error('Session destruction error:', err);
                    return res.status(500).json({
                        success: false,
                        message: 'Ошибка при выходе'
                    });
                }

                res.clearCookie('connect.sid', {
                    path: '/',
                    httpOnly: true,
                });

                res.json({
                    success: true,
                    message: 'Успешный выход',
                    clearClientCookies: true
                });
            });

        } catch (error) {
            console.error('Logout error:', error);
            res.status(500).json({
                success: false,
                message: 'Внутренняя ошибка сервера'
            });
        }
    }
    async checkAuthUser(req, res) {
        if (req.session.isAuthenticated) {
            res.json({ isAuthenticated: true });
        } else {
            res.json({ isAuthenticated: false });
        }
    }
    async signup(req, res) {
        const { username, password } = req.body;
        try {
            const [getData, metadata] = await sequelize.query(
                'INSERT INTO "Users" (username, password) VALUES (:username, :password)',
                {
                    replacements: { username, password }
                }
            );
            res.json(getData);
        } catch (error) {
            console.error('Ошибка при создании соискателя', error);
            res.status(500).json({ error: 'Ошибка при создании соискателя' });
        }
    }

}

export const userController = new UserController();