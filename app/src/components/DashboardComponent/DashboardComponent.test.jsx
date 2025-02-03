import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardComponent from './DashboardComponent';

describe('<DashboardComponent />', () => {
  test('it should mount', () => {
    render(<DashboardComponent />);

    const dashboardComponent = screen.getByTestId('DashboardComponent');

    expect(dashboardComponent).toBeInTheDocument();
  });
});