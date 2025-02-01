import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardListViewItemComponent from './DashboardListViewItemComponent';

describe('<DashboardListViewItemComponent />', () => {
  test('it should mount', () => {
    render(<DashboardListViewItemComponent />);

    const dashboardListViewItemComponent = screen.getByTestId('DashboardListViewItemComponent');

    expect(dashboardListViewItemComponent).toBeInTheDocument();
  });
});