import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import TripDetail from './TripDetail';
import { UserContext } from "../auth/UserContext" // Import UserContext from your application
import { useParams, Link, MemoryRouter } from 'react-router-dom'; // Import useParams and Link from react-router-dom
import TravelerApi from '../api/api'; // Import TravelerApi from your application
import { UserProvider } from '../testUtils';

// Mocking UserContext
// jest.mock('../auth/UserContext', () => ({
//   UserContext: {
//     currentUser: {
//       id: 'mockUserId', // Mock current user ID
//     },
//   },
// }));

// Mocking useParams
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

// Mocking TravelerApi
jest.mock('../api/api', () => ({
  getTrip: jest.fn().mockResolvedValue({
    id: 'mockTripId',
    title: 'Mock Trip Title',
    username: 'mockUser',
    userId: 'mockUserId',
    images: [],
  }),
  deleteTrip: jest.fn().mockResolvedValue('mockTripId'),
}));

describe('TripDetail component', () => {
  it('renders loading spinner initially', async () => {
    useParams.mockReturnValue({ id: 'mockTripId' });
    const { getByTestId } = render( <UserProvider>
                                    <TripDetail /> 
                                    </UserProvider>
                                    );
    expect(getByTestId('loading-spinner')).toBeInTheDocument();
    await waitFor(() => {});
  });

  it('renders trip details after fetching', async () => {
    useParams.mockReturnValue({ id: 'mockTripId' });
    const { getByText } = render(<UserProvider>
                                     <TripDetail /> 
                                </UserProvider>);
    await waitFor(() => expect(getByText('Mock Trip Title')).toBeInTheDocument());
  });

  it('renders delete button for own trip', async () => {
    useParams.mockReturnValue({ id: 'mockTripId' });
    const { getByText } = render( <UserProvider>
                                     <TripDetail /> 
                                 </UserProvider>);
    await waitFor(() => expect(getByText('Delete')).toBeInTheDocument());
  });

  it('calls deleteTrip function when delete button is clicked', async () => {
    useParams.mockReturnValue({ id: 'mockTripId' });
    const { getByText } = render(<UserProvider>
                                    <TripDetail /> 
                                </UserProvider>);
    fireEvent.click(getByText('Delete'));
    await waitFor(() => expect(TravelerApi.deleteTrip).toHaveBeenCalledTimes(1));
  });
});
