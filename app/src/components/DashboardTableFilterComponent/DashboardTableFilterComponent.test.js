import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardTableFilterComponent from './DashboardTableFilterComponent';

describe('<DashboardTableFilterComponent />', () => {
  test('it should mount', () => {
    render(<DashboardTableFilterComponent />);

    const dashboardTableFilterComponent = screen.getByTestId('DashboardTableFilterComponent');

    expect(dashboardTableFilterComponent).toBeInTheDocument();
  });
});