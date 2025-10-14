import axios, { AxiosInstance, AxiosError } from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      async config => {
        const token = await SecureStore.getItemAsync('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      response => response.data,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          await SecureStore.deleteItemAsync('auth_token');
        }
        return Promise.reject(error);
      }
    );
  }

  async login(email: string, password: string) {
    const response = await this.client.post('/auth/login', { email, password });
    if (response.data.token) {
      await SecureStore.setItemAsync('auth_token', response.data.token);
    }
    return response;
  }

  async register(name: string, email: string, password: string) {
    const response = await this.client.post('/auth/register', {
      name,
      email,
      password,
    });
    if (response.data.token) {
      await SecureStore.setItemAsync('auth_token', response.data.token);
    }
    return response;
  }

  async logout() {
    await this.client.post('/auth/logout');
    await SecureStore.deleteItemAsync('auth_token');
  }

  async getMe() {
    return this.client.get('/auth/me');
  }

  async generateDesign(data: {
    type: string;
    style: string;
    description?: string;
  }) {
    return this.client.post('/designs/generate', data);
  }

  async getDesigns(page = 1, limit = 20) {
    return this.client.get('/designs', { params: { page, limit } });
  }

  async getProducts(params?: any) {
    return this.client.get('/products', { params });
  }

  async getProductById(id: string) {
    return this.client.get(`/products/${id}`);
  }

  async getCart() {
    return this.client.get('/cart');
  }

  async addToCart(productId: string, quantity = 1) {
    return this.client.post('/cart/add', { productId, quantity });
  }

  async updateCartItem(itemId: string, quantity: number) {
    return this.client.put(`/cart/${itemId}`, { quantity });
  }

  async removeFromCart(itemId: string) {
    return this.client.delete(`/cart/${itemId}`);
  }

  async createOrder(data: any) {
    return this.client.post('/orders', data);
  }

  async getOrders(page = 1) {
    return this.client.get('/orders', { params: { page } });
  }

  async getWishlist() {
    return this.client.get('/wishlist');
  }

  async addToWishlist(productId: string) {
    return this.client.post('/wishlist/add', { productId });
  }

  async removeFromWishlist(id: string) {
    return this.client.delete(`/wishlist/${id}`);
  }

  async getNotifications(page = 1) {
    return this.client.get('/notifications', { params: { page } });
  }

  async markNotificationAsRead(id: string) {
    return this.client.put(`/notifications/${id}/read`);
  }

  async getSocialFeed(page = 1) {
    return this.client.get('/social/feed', { params: { page } });
  }

  async createPost(content: string, imageUrls: string[] = []) {
    return this.client.post('/social/posts', { content, imageUrls });
  }

  async likePost(postId: string) {
    return this.client.post(`/social/posts/${postId}/like`);
  }

  async unlikePost(postId: string) {
    return this.client.delete(`/social/posts/${postId}/like`);
  }
}

export const api = new ApiService();

