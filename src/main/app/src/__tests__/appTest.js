import React from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import App from '../App.js';

it('renders without crashing', () => {
  shallow(<App />);
});

it('renders welcome message', () => {
  const { getByText } = render(<App />);
  expect(getByText('Welcome!')).toBeInTheDocument();
});
