class AnalyticsService {
  private enabled: boolean = true;

  initialize() {
    console.log('Analytics initialized');
  }

  setUserId(userId: string) {
    if (!this.enabled) return;
    console.log('Set user ID:', userId);
  }

  trackEvent(eventName: string, properties?: Record<string, any>) {
    if (!this.enabled) return;
    console.log('Track event:', eventName, properties);
  }

  trackScreen(screenName: string, properties?: Record<string, any>) {
    if (!this.enabled) return;
    console.log('Track screen:', screenName, properties);
  }

  setUserProperties(properties: Record<string, any>) {
    if (!this.enabled) return;
    console.log('Set user properties:', properties);
  }

  trackDesignCreated(designId: string, type: string, style: string) {
    this.trackEvent('design_created', { designId, type, style });
  }

  trackProductViewed(productId: string, productName: string, price: number) {
    this.trackEvent('product_viewed', { productId, productName, price });
  }

  trackAddToCart(productId: string, quantity: number) {
    this.trackEvent('add_to_cart', { productId, quantity });
  }

  trackPurchase(orderId: string, total: number, itemCount: number) {
    this.trackEvent('purchase', { orderId, total, itemCount });
  }

  trackARTryOn(productId: string) {
    this.trackEvent('ar_try_on', { productId });
  }

  trackShare(contentType: string, contentId: string) {
    this.trackEvent('share', { contentType, contentId });
  }
}

export const analytics = new AnalyticsService();

