import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { updateProductsID, userReducer } from '../store/user.slice';
import { MemoryRouter } from 'react-router-dom';
import { ordersReducer } from "../store/orders.slice";
import { createOrder as mockCreateOrder } from '@/store/orders.slice';
import { productsReducer } from '@/store/products.slice';
import { Products } from '../../types';
import { Cart } from '@/components/Cart';

jest.mock('../store', () => ({
    ...jest.requireActual('../store'),
    useAppDispatch: () => jest.fn(),
}));

jest.mock('@/components/Header', () => ({
    Header: () => <div>Mock Header</div>
}));

jest.mock('@/store/user.slice', () => ({
    ...jest.requireActual('@/store/user.slice'),
    updateProductsID: jest.fn().mockImplementation((payload) => ({
        type: 'user/updateProductsID',
        payload
    })),
}));

jest.mock('@/store/orders.slice', () => ({
    ...jest.requireActual('@/store/orders.slice'),
    createOrder: jest.fn((payload) => ({
      type: 'user/createOrder',
      payload
    })),
  }));

describe('Cart component', () => {

    const mockDispatch = jest.fn();

    beforeEach(() => {
        jest.spyOn(require('../store'), 'useAppDispatch').mockReturnValue(mockDispatch);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    const product: Products = {
        id: 1,
        title: 'protein',
        description: 'good',
        count: 3,
        photo: 'protein.png',
        price: 3099,
        vendorInfo: 'supabase'
    }
    const createMockStore = (loading: boolean, productsID: Array<number>) => configureStore({
        reducer: {
            user: userReducer,
            products: productsReducer,
            orders: ordersReducer
        },
        preloadedState: {
            user: {
                username: "pasha",
                password: "",
                productsID,
                ordersID: [],
                loading,
                isAuthenticated: true,
                address: ""
            },
            products: {
                products: [product],
                loading
            }
        }
    });

    it("renders", () => {
        render(
            <Provider store={createMockStore(true, [1])}>
                <Cart />
            </Provider>
        );
        expect(screen.getByTestId('cost')).toHaveTextContent("Суммарная стоимость заказа: 3 099 ₽")
    })

    it('should dispatch updateProductsID when productsID changes and not loading', async () => {
        const store = createMockStore(false, [1, 2, 3]);

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Cart />
                </MemoryRouter>
            </Provider>
        );

        expect(mockDispatch).toHaveBeenCalledTimes(4);
        expect(mockDispatch).toHaveBeenCalledWith(updateProductsID({ username: "pasha", productsID: [1, 2, 3] }));
    });

    it('should create order when button clicked', async () => {
        const store = createMockStore(false, [1, 2, 3]);

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Cart />
                </MemoryRouter>
            </Provider>
        );

        const createOrderButton = screen.getByTestId('createOrder');
        fireEvent.click(createOrderButton);
        expect(mockDispatch).toHaveBeenCalledWith(mockCreateOrder({
            productsID: [1, 2, 3],
            deliveryAdress: "",
            cost: 3099,
            username: "pasha"
        }));
    });
});