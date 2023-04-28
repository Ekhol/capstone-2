import React from 'react';
import { render } from '@testing-library/react';
import Router from './Router';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from '../testUtilities';


it('renders without crashing', function () {
    render(
        <MemoryRouter>
            <UserProvider>
                <Router />
            </UserProvider>
        </MemoryRouter>,
    );
});

it('matches snapshot', function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <Router />
            </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});