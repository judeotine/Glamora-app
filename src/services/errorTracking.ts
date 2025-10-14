class ErrorTrackingService {
  private enabled: boolean = true;
  private dsn: string | null = null;

  initialize(dsn?: string) {
    if (dsn) {
      this.dsn = dsn;
      console.log('Error tracking initialized');
    }
  }

  captureException(error: Error, context?: Record<string, any>) {
    if (!this.enabled) return;
    
    console.error('Error captured:', error.message, context);
    
    if (this.dsn) {
      console.log('Sending to Sentry:', error);
    }
  }

  captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
    if (!this.enabled) return;
    
    console.log(`[${level.toUpperCase()}]`, message);
  }

  setUser(userId: string, email?: string) {
    if (!this.enabled) return;
    
    console.log('Set error tracking user:', userId);
  }

  addBreadcrumb(message: string, category?: string) {
    if (!this.enabled) return;
    
    console.log(`Breadcrumb [${category}]:`, message);
  }

  clearUser() {
    console.log('Clear error tracking user');
  }
}

export const errorTracking = new ErrorTrackingService();

