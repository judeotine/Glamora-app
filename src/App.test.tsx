import { render } from '@testing-library/react-native';
import App from '../App';

jest.mock('expo-font');
jest.mock('expo-asset');

describe('App', () => {
  it('renders without crashing', () => {
    const { getByText, queryByText } = render(<App />);
    expect(queryByText(/glamora/i)).toBeTruthy();
  });
});

