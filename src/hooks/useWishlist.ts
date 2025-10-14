import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';

import {
  selectWishlist,
  addToWishlist as addToWishlistAction,
  removeFromWishlist as removeFromWishlistAction,
} from '@/store/slices/wishlistSlice';
import { api } from '@/services/api';

export const useWishlist = () => {
  const wishlist = useSelector(selectWishlist);
  const dispatch = useDispatch();

  const addToWishlist = useCallback(
    async (productId: string, name: string, price: number, imageUrl: string) => {
      const item = {
        id: Date.now().toString(),
        productId,
        name,
        price,
        imageUrl,
        addedAt: new Date().toISOString(),
      };

      dispatch(addToWishlistAction(item));

      try {
        await api.addToWishlist(productId);
      } catch (error) {
        console.error('Failed to add to wishlist:', error);
      }
    },
    [dispatch]
  );

  const removeFromWishlist = useCallback(
    async (itemId: string) => {
      dispatch(removeFromWishlistAction(itemId));

      try {
        await api.removeFromWishlist(itemId);
      } catch (error) {
        console.error('Failed to remove from wishlist:', error);
      }
    },
    [dispatch]
  );

  const isInWishlist = useCallback(
    (productId: string) => {
      return wishlist.items.some(item => item.productId === productId);
    },
    [wishlist.items]
  );

  return {
    items: wishlist.items,
    itemCount: wishlist.items.length,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };
};

