import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Tabuleiro from './App';

test('renders learn react link', () => {
  render(<Tabuleiro/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
