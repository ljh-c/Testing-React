// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render, wait, fireEvent } from '@testing-library/react';
import { getData as mockGetData } from '../api';
import StarWarsCharacters from './StarWarsCharacters';

jest.mock('../api');

mockGetData.mockResolvedValueOnce({ 
  next: '/foo.bar/people/?page=3',
  previous: '/foo.bar/people/?page=1',
  results: [{name: 'Moo', url: '/foo.bar/people/4'}], 
});

mockGetData.mockResolvedValueOnce({ 
  next: '/foo.bar/people/?page=4',
  previous: '/foo.bar/people/?page=2',
  results: [{name: 'Lily', url: '/foo.bar/people/3'}]
});

test('initially displays data from API', async () => {
  const { getByText } = render(<StarWarsCharacters />);

  expect(mockGetData).toHaveBeenCalledTimes(1);

  await wait(() => {
    expect(getByText(/Moo/i));
    // expect(getByText(/Aaron/i)); // * * SHOULD FAIL TEST
  });
}); 

test('clicking next button displays next page of characters from API', async () => {
  const { getByText } = render(<StarWarsCharacters />);

  fireEvent.click(getByText(/Next/i));

  await wait(() => {
    expect(getByText(/Lily/i));
    // expect(getByText(/Aaron/i)); // * * SHOULD FAIL TEST
  });
});