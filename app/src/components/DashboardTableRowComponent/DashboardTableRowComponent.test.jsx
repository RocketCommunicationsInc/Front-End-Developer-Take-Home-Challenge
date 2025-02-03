import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardTableRowComponent from './DashboardTableRowComponent';

describe('<DashboardTableRowComponent />', () => {
  test('it should mount', () => {
    render(<DashboardTableRowComponent />);

    const dashboardListViewItemComponent = screen.getByTestId('DashboardTableRowComponent');

    expect(dashboardListViewItemComponent).toBeInTheDocument();
  });
});