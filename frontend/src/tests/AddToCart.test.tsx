import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { addProductsID, userReducer } from '../store/user.slice';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { AddToCart } from '../components/AddToCart';
import { productsReducer } from '@/store/products.slice';
import { Products } from '../../types';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

jest.mock('../store', () => ({
    ...jest.requireActual('../store'),
    useAppDispatch: () => jest.fn(),
}));

describe('AddToCart component', () => {
    const mockNavigate = jest.fn();
    const mockDispatch = jest.fn();

    beforeEach(() => {
        (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
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
    const createMockStore = (isAuthenticated: boolean, productsID: Array<number>) => configureStore({
        reducer: {
            user: userReducer,
            products: productsReducer
        },
        preloadedState: {
            user: {
                username: "",
                password: "",
                productsID,
                ordersID: [],
                loading: false,
                isAuthenticated,
                address: ""
            },
            products: {
                products: [product],
                loading: false
            }
        }
    });




    it('renders without authentication', () => {
        render(
            <Provider store={createMockStore(false, [])}>
                <MemoryRouter>
                    <AddToCart data={product} />
                </MemoryRouter>
            </Provider>
        );
        const button = screen.getByText('Добавить в корзину');
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        expect(mockNavigate).toHaveBeenCalledWith('/signin');
    });

    it('renders with authentication', () => {
        const mockStore = {
            ...createMockStore(true, [2]),
            dispatch: mockDispatch
        };

        render(
            <Provider store={mockStore}>
                <MemoryRouter>
                    <AddToCart data={product} />
                </MemoryRouter>
            </Provider>
        );
        const button = screen.getByText('Добавить в корзину');
        fireEvent.click(button);
        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(mockDispatch).toHaveBeenCalledWith(addProductsID(product.id));
    });
});