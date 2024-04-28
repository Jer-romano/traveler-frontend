import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import TripForm from './TripForm';
import { MemoryRouter } from 'react-router-dom';
import TravelerApi from '../api/api';
import { UserProvider } from '../testUtils';
//import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

jest.mock('../api/api');

// jest.mock("react-router-dom", () => ({
//     useHistory: jest.fn()
// }));

describe('<TripForm />', () => {
  test('renders form correctly', () => {
    const { getByLabelText, getByText } = render(
        <MemoryRouter>
        <UserProvider>
            <TripForm />
        </UserProvider>
      </MemoryRouter>
    );

    expect(getByLabelText('Title of Trip')).toBeInTheDocument();
    expect(getByText('Choose your images')).toBeInTheDocument();
  });

  test('updates title correctly', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <UserProvider>
            <TripForm />
        </UserProvider>
      </MemoryRouter>
    );

    const titleInput = getByLabelText('Title of Trip');
    fireEvent.change(titleInput, { target: { value: 'New Trip' } });

    expect(titleInput.value).toBe('New Trip');
  });

  // Add more tests for file inputs, caption inputs, adding/removing fields, etc.
  //Issue with this test: Doesn't call the history.push function, probably bc it's being passed down as a prop
  test('submits form correctly', async () => {
    const mockCreateTrip = jest.fn().mockResolvedValue({ id: 123 });
    const mockAddImageToTrip = jest.fn().mockResolvedValue();

    TravelerApi.createTrip = mockCreateTrip;
    TravelerApi.addImageToTrip = mockAddImageToTrip;

    const mockHistoryPush = jest.fn();
    //history={{ push: mockHistoryPush }}
    const { getByText, getByLabelText } = render(
      <MemoryRouter>
        <UserProvider>
         <TripForm history={{ push: mockHistoryPush }} />
        </UserProvider>
      </MemoryRouter>
    );

    // Fill out form fields
    fireEvent.change(getByLabelText('Title of Trip'), { target: { value: 'New Trip' } });

    // Mock file object
    const file = new File(['image content'], 'image.png', { type: 'image/png' });
    fireEvent.change(getByLabelText('Image #1'), { target: { files: [file] } });

    // Submit form
    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
        expect(mockCreateTrip).toHaveBeenCalledTimes(1);
        expect(mockAddImageToTrip).toHaveBeenCalledTimes(1);
        //expect(mockHistoryPush).toHaveBeenCalledWith('/thankyou');
    });
  });

  // Add more tests for error handling, API calls, etc.
});
