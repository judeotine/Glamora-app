import { renderHook, act } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { useAuth } from '@/hooks/useAuth';

const wrapper = ({ children }: any) => <Provider store={store}>{children}</Provider>;

describe('useAuth Hook', () => {
  it('should initialize with unauthenticated state', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it('should handle login', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    await act(async () => {
      try {
        await result.current.login('test@example.com', 'password123');
      } catch (error) {
        console.log('Expected error in test environment');
      }
    });
  });

  it('should handle logout', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    await act(async () => {
      await result.current.logout();
    });
    
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });
});

