// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render, wait } from '@testing-library/react';
import { getData as mockGetData, insaneFunction } from '../api';
import StarWarsCharacters from './StarWarsCharacters';

jest.mock('../api');

test('initially displays data from API', async () => {
  mockGetData.mockResolvedValueOnce({ 
    next: '/foo.bar/people/?page=3',
    previous: '/foo.bar/people/?page=1',
    results: [{name: 'Moo', url: '/foo.bar/people/4'}], 
  });

  const { getByText } = render (<StarWarsCharacters />);

  expect(mockGetData).toHaveBeenCalledTimes(1);
  // expect(mockGetData).toHaveBeenCalledWith('https://swapi.co/api/people');

  wait(() => expect(getByText(/Luke Skywalker/i)));
});