import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AlertTableFilterComponent from './AlertTableFilterComponent';

describe('<AlertTableFilterComponent />', () => {
  test('it should mount', () => {
    render(<AlertTableFilterComponent />);

    const dashboardTableFilterComponent = screen.getByTestId('AlertTableFilterComponent');

    expect(dashboardTableFilterComponent).toBeInTheDocument();
  });
});