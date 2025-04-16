import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../store/user.slice';
import { logoutFetch as mockLogoutFetch } from '../store/user.slice';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';

jest.mock('../assets/muscle.png', () => 'test-muscle-stub');
jest.mock('../assets/my_orders.png', () => 'test-orders-stub');
jest.mock('../assets/cart.png', () => 'test-cart-stub');
jest.mock('../assets/logout.png', () => 'test-logout-stub');

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

jest.mock('../store/user.slice', () => ({
    ...jest.requireActual('../store/user.slice'),
    logoutFetch: jest.fn(() => ({ type: 'user/logoutFetch' })),
  }));

describe('Header component', () => {
    const mockDispatch = jest.fn();
    const mockNavigate = jest.fn();
    beforeEach(() => {
        (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
        jest.spyOn(require('../store'), 'useAppDispatch').mockReturnValue(mockDispatch);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    const createMockStore = (isAuthenticated: boolean) => configureStore({
        reducer: {
            user: userReducer
        },
        preloadedState: {
            user: {
                username: "",
                password: "",
                productsID: [],
                ordersID: [],
                loading: false,
                isAuthenticated,
                address: ""
            }
        }
    });

    it('renders without authentication', () => {
        render(
            <Provider store={createMockStore(false)}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('SportFuelMarket')).toBeInTheDocument();
        const images = document.querySelectorAll('img');
        expect(images.length).toBeGreaterThanOrEqual(1);
    });

    it('renders with authentication', () => {
        const mockStore = {
            ...createMockStore(true),
            dispatch: mockDispatch
        };
        render(
            <Provider store={mockStore}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('SportFuelMarket')).toBeInTheDocument();
        const images = document.querySelectorAll('img');
        expect(images.length).toBeGreaterThanOrEqual(4);
        const logout = screen.getByTestId('logout');
        fireEvent.click(logout);
        expect(mockLogoutFetch).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith('/signin');
    });
});