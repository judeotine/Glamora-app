export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  role: 'USER' | 'DESIGNER' | 'ADMIN';
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  material: string;
  gemstone?: string;
  imageUrls: string[];
  category: string;
  rating?: number;
  reviewCount?: number;
  inStock: boolean;
}

export interface Design {
  id: string;
  type: 'necklace' | 'bracelet' | 'earrings' | 'ring';
  style: string;
  description?: string;
  imageUrl: string;
  createdAt: string;
  isFavorite: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  material?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  total: number;
  shippingAddress: Address;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Notification {
  id: string;
  type: 'system' | 'transactional' | 'social' | 'reminder';
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
  imageUrl?: string;
  actionUrl?: string;
}

export interface Post {
  id: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  imageUrls: string[];
  likes: number;
  comments: Comment[];
  createdAt: string;
  isLiked: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  user: {
    name: string;
    avatar?: string;
  };
  content: string;
  createdAt: string;
}

