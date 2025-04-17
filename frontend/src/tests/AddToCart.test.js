import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AddToCart } from '../components/AddToCart';
import { addProductsID, userReducer } from '../store/user.slice';
import { productsReducer } from '@/store/products.slice';
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});
const mockDispatch = vi.fn();
vi.mock('../store', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useAppDispatch: () => mockDispatch,
    };
});
describe('AddToCart component', () => {
    const product = {
        id: 1,
        title: 'protein',
        description: 'good',
        count: 3,
        photo: 'protein.png',
        price: 3099,
        vendorInfo: 'supabase'
    };
    const createMockStore = (isAuthenticated, productsID) => {
        return configureStore({
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
    };
    beforeEach(() => {
        mockNavigate.mockClear();
        mockDispatch.mockClear();
    });
    afterEach(() => {
        vi.restoreAllMocks();
    });
    it('renders without authentication', () => {
        render(_jsx(Provider, { store: createMockStore(false, []), children: _jsx(MemoryRouter, { children: _jsx(AddToCart, { data: product }) }) }));
        const button = screen.getByText('Добавить в корзину');
        fireEvent.click(button);
        expect(mockNavigate).toHaveBeenCalledWith('/signin');
    });
    it('renders with authentication', () => {
        render(_jsx(Provider, { store: createMockStore(true, [2]), children: _jsx(MemoryRouter, { children: _jsx(AddToCart, { data: product }) }) }));
        const button = screen.getByText('Добавить в корзину');
        fireEvent.click(button);
        expect(mockDispatch).toHaveBeenCalledWith(addProductsID(product.id));
    });
});
