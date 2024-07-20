<<<<<<< HEAD
=======
//
>>>>>>> 0224b24d47bc523d4c2e6a67f2a607924c7bae70
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
