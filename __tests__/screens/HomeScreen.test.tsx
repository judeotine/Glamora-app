import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from '@/screens/HomeScreen';
import { store } from '@/store';

const MockedNavigator = ({ children }: any) => (
  <NavigationContainer>
    <Provider store={store}>{children}</Provider>
  </NavigationContainer>
);

describe('HomeScreen', () => {
  it('renders home screen correctly', () => {
    const { getByText } = render(
      <MockedNavigator>
        <HomeScreen />
      </MockedNavigator>
    );
    
    expect(getByText(/Welcome/i)).toBeTruthy();
  });

  it('displays featured designs section', () => {
    const { getByText } = render(
      <MockedNavigator>
        <HomeScreen />
      </MockedNavigator>
    );
    
    expect(getByText(/Celestial Harmony/i)).toBeTruthy();
  });

  it('displays seasonal collections', () => {
    const { getByText } = render(
      <MockedNavigator>
        <HomeScreen />
      </MockedNavigator>
    );
    
    expect(getByText(/Seasonal Collections/i)).toBeTruthy();
  });
});

