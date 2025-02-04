import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AlertTableRowComponent from './AlertTableRowComponent';

describe('<AlertTableRowComponent />', () => {
  test('it should mount', () => {
    render(<AlertTableRowComponent />);

    const dashboardListViewItemComponent = screen.getByTestId('AlertTableRowComponent');

    expect(dashboardListViewItemComponent).toBeInTheDocument();
  });
});