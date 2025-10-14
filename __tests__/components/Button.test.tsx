import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '@/components/atoms/Button';

describe('Button Component', () => {
  it('renders correctly with title', () => {
    const { getByText } = render(
      <Button title="Test Button" onPress={() => {}} />
    );
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Press Me" onPress={onPressMock} />
    );
    
    fireEvent.press(getByText('Press Me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Disabled" onPress={onPressMock} disabled />
    );
    
    fireEvent.press(getByText('Disabled'));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('shows loading indicator when loading', () => {
    const { queryByText, UNSAFE_getByType } = render(
      <Button title="Loading" onPress={() => {}} loading />
    );
    
    expect(queryByText('Loading')).toBeNull();
    expect(UNSAFE_getByType('ActivityIndicator')).toBeTruthy();
  });
});

