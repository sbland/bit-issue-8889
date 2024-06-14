import React from 'react';
import { render } from '@testing-library/react';
import { BasicDemoCard } from './demo-card.composition';

it('should render the correct text', () => {
  const { getByText } = render(<BasicDemoCard />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
