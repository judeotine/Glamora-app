import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';

import {
  selectCart,
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
  updateQuantity as updateQuantityAction,
  clearCart as clearCartAction,
} from '@/store/slices/cartSlice';
import { api } from '@/services/api';
import { analytics } from '@/services/analytics';

export const useCart = () => {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  const addToCart = useCallback(
    async (productId: string, name: string, price: number, imageUrl: string, quantity = 1) => {
      const item = {
        id: Date.now().toString(),
        productId,
        name,
        price,
        quantity,
        imageUrl,
      };

      dispatch(addToCartAction(item));
      analytics.trackAddToCart(productId, quantity);

      try {
        await api.addToCart(productId, quantity);
      } catch (error) {
        console.error('Failed to sync cart with backend:', error);
      }
    },
    [dispatch]
  );

  const removeFromCart = useCallback(
    async (itemId: string) => {
      dispatch(removeFromCartAction(itemId));

      try {
        await api.removeFromCart(itemId);
      } catch (error) {
        console.error('Failed to remove from cart:', error);
      }
    },
    [dispatch]
  );

  const updateQuantity = useCallback(
    async (itemId: string, quantity: number) => {
      dispatch(updateQuantityAction({ id: itemId, quantity }));

      try {
        await api.updateCartItem(itemId, quantity);
      } catch (error) {
        console.error('Failed to update cart:', error);
      }
    },
    [dispatch]
  );

  const clearCart = useCallback(() => {
    dispatch(clearCartAction());
  }, [dispatch]);

  const checkout = useCallback(async (shippingAddress: any) => {
    try {
      const response = await api.createOrder({
        items: cart.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress,
      });

      analytics.trackPurchase(
        response.data.order.id,
        cart.total,
        cart.items.length
      );

      dispatch(clearCartAction());
      return response;
    } catch (error) {
      console.error('Checkout error:', error);
      throw error;
    }
  }, [cart, dispatch]);

  return {
    items: cart.items,
    total: cart.total,
    itemCount: cart.items.length,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    checkout,
  };
};

