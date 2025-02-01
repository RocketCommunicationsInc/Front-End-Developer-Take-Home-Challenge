import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AlertDetailsModalComponent from './AlertDetailsAlertDetailsModalComponent';

describe('<AlertDetailsModalComponent />', () => {
  test('it should mount', () => {
    render(<AlertDetailsModalComponent />);

    const alertDetailsModalComponent = screen.getByTestId('AlertDetailsModalComponent');

    expect(alertDetailsModalComponent).toBeInTheDocument();
  });
});