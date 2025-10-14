import React, { Component, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './atoms/Text';
import { Button } from './atoms/Button';
import { Icon } from './atoms/Icon';
import { colors, spacing } from '@/theme';
import { errorTracking } from '@/services/errorTracking';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    errorTracking.captureException(error, {
      componentStack: errorInfo.componentStack,
    });
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Icon name="alert-circle-outline" size={80} color={colors.error} />
          <Text variant="h4" style={styles.title}>
            Something went wrong
          </Text>
          <Text variant="body" style={styles.message}>
            We encountered an unexpected error. Please try again.
          </Text>
          {__DEV__ && this.state.error && (
            <Text variant="caption" style={styles.errorText}>
              {this.state.error.message}
            </Text>
          )}
          <Button title="Try Again" onPress={this.handleReset} style={styles.button} />
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    backgroundColor: colors.backgroundLight,
  },
  title: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    color: colors.error,
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    marginBottom: spacing.xl,
    color: colors.text.secondary,
  },
  errorText: {
    color: colors.error,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  button: {
    minWidth: 200,
  },
});

