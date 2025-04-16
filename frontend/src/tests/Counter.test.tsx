import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { addProductsID, deleteProductsID, userReducer } from '../store/user.slice';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { AddToCart } from '../components/AddToCart';
import { productsReducer } from '@/store/products.slice';
import { Products } from '../../types';
import { Counter } from '@/components/Counter';

jest.mock('../store', () => ({
    ...jest.requireActual('../store'),
    useAppDispatch: () => jest.fn(),
}));

describe('Counter component', () => {
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

    it('renders with authentication', () => {
        const mockStore = {
            ...createMockStore(true, [1]),
            dispatch: mockDispatch
        };

        render(
            <Provider store={mockStore}>
                <MemoryRouter>
                    <Counter id={1}/>
                </MemoryRouter>
            </Provider>
        );
        const decrement = screen.getByText('-');
        const increment = screen.getByText('+');
        fireEvent.click(increment);
        fireEvent.click(decrement);
        expect(mockDispatch).toHaveBeenCalledTimes(2);
        expect(mockDispatch).toHaveBeenCalledWith(addProductsID(product.id));
        expect(mockDispatch).toHaveBeenCalledWith(deleteProductsID(product.id));
    });
});