import { jsx as _jsx } from "react/jsx-runtime";
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../store/user.slice';
import { logoutFetch as mockLogoutFetch } from '../store/user.slice';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '../components/Header';
import { vi, describe, it, expect, afterEach } from 'vitest';
// Mock assets
vi.mock('../assets/muscle.png', () => ({ default: 'test-muscle-stub' }));
vi.mock('../assets/my_orders.png', () => ({ default: 'test-orders-stub' }));
vi.mock('../assets/cart.png', () => ({ default: 'test-cart-stub' }));
vi.mock('../assets/logout.png', () => ({ default: 'test-logout-stub' }));
// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});
// Mock user.slice
vi.mock('../store/user.slice', async () => {
    const actual = await vi.importActual('../store/user.slice');
    return {
        ...actual,
        logoutFetch: vi.fn(() => ({ type: 'user/logoutFetch' })),
    };
});
describe('Header component', () => {
    const mockDispatch = vi.fn();
    afterEach(() => {
        vi.clearAllMocks();
    });
    const createMockStore = (isAuthenticated) => configureStore({
        reducer: {
            user: userReducer,
        },
        preloadedState: {
            user: {
                username: '',
                password: '',
                productsID: [],
                ordersID: [],
                loading: false,
                isAuthenticated,
                address: '',
            },
        },
    });
    it('renders without authentication', () => {
        render(_jsx(Provider, { store: createMockStore(false), children: _jsx(MemoryRouter, { children: _jsx(Header, {}) }) }));
        expect(screen.getByText('SportFuelMarket')).toBeDefined();
        const images = document.querySelectorAll('img');
        expect(images.length).toBeGreaterThanOrEqual(1);
    });
    it('renders with authentication', () => {
        const mockStore = createMockStore(true);
        mockStore.dispatch = mockDispatch;
        render(_jsx(Provider, { store: mockStore, children: _jsx(MemoryRouter, { children: _jsx(Header, {}) }) }));
        expect(screen.getByText('SportFuelMarket')).toBeDefined();
        const images = document.querySelectorAll('img');
        expect(images.length).toBeGreaterThanOrEqual(4);
        const logout = screen.getByTestId('logout');
        fireEvent.click(logout);
        expect(mockLogoutFetch).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith('/signin');
    });
});
