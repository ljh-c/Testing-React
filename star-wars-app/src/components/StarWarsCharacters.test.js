// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render, wait, fireEvent } from '@testing-library/react';
import { getData  as mockGetData } from '../api';
import StarWarsCharacters from './StarWarsCharacters';

jest.mock('../api');

test('initially displays data from API', async () => {
  mockGetData.mockResolvedValueOnce({ 
    next: '/foo.bar/people/?page=3',
    previous: null,
    results: [{name: 'Moo', url: '/foo.bar/people/4'}]
  });
  
  const { getByText } = render(<StarWarsCharacters />);

  expect(mockGetData).toHaveBeenCalledTimes(1);

  await wait(() => {
    expect(getByText(/Moo/i));
    // expect(getByText(/Carl/i)); // * * SHOULD FAIL TEST
  });
}); 

test('clicking next button displays next page of characters from API', async () => {
  mockGetData.mockResolvedValueOnce({ 
    next: '/foo.bar/people/?page=3',
    previous: null,
    results: [{name: 'Moo', url: '/foo.bar/people/4'}]
  }).mockResolvedValueOnce({
    next: '/foo.bar/people/?page=4',
    previous: '/foo.bar/people/?page=2',
    results: [{name: 'Lily', url: '/foo.bar/people/3'}]
  })

  const { getByText } = render(<StarWarsCharacters />);

  await wait(() => fireEvent.click(getByText(/Next/i)));

  await wait(() => {
    expect(getByText(/Lily/i));
    // expect(getByText(/Carl/i)); // * * SHOULD FAIL TEST
  });
});

test('clicking previous button displays previous page of characters from API', async () => {
  mockGetData.mockResolvedValueOnce({ 
    next: '/foo.bar/people/?page=4',
    previous: '/foo.bar/people/?page=2',
    results: [{name: 'Lily', url: '/foo.bar/people/3'}]
  }).mockResolvedValueOnce({
    next: '/foo.bar/people/?page=3',
    previous: null,
    results: [{name: 'Moo', url: '/foo.bar/people/4'}]
  })

  const { getByText } = render(<StarWarsCharacters />);

  await wait(() => fireEvent.click(getByText(/Previous/i)));
  
  await wait(() => {
    expect(getByText(/Moo/i));
    // expect(getByText(/Carl/i)); // * * SHOULD FAIL TEST
  });
});

test('clicking previous button displays previous page of characters from API', async () => {
  mockGetData.mockResolvedValueOnce({ 
    next: '/foo.bar/people/?page=4',
    previous: '/foo.bar/people/?page=2',
    results: [{name: 'Lily', url: '/foo.bar/people/3'}]
  }).mockResolvedValueOnce({
    next: '/foo.bar/people/?page=3',
    previous: null,
    results: [{name: 'Moo', url: '/foo.bar/people/4'}]
  })

  const { getByText } = render(<StarWarsCharacters />);

  await wait(() => fireEvent.click(getByText(/Previous/i)));
  
  await wait(() => {
    expect(getByText(/Moo/i));
    // expect(getByText(/Carl/i)); // * * SHOULD FAIL TEST
  });
});

test('previous button disabled on page 1 of characters from API', async () => {
  mockGetData.mockResolvedValueOnce({ 
    next: '/foo.bar/people/?page=3',
    previous: null,
    results: [{name: 'Moo', url: '/foo.bar/people/4'}]
  });

  const { getByTestId } = render(<StarWarsCharacters />);
  
  await wait(() => {
    const previousButton = getByTestId(/previous-btn/i);
    expect(previousButton).toBeDisabled();
    expect(getByTestId(/next-btn/i)).not.toBeDisabled();
  });
});