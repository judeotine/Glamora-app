import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

export interface Design {
  id: string;
  type: 'necklace' | 'bracelet' | 'earrings' | 'ring';
  style: string;
  description?: string;
  imageUrl: string;
  createdAt: string;
  isFavorite: boolean;
}

interface DesignState {
  designs: Design[];
  currentDesign: Design | null;
  isGenerating: boolean;
}

const initialState: DesignState = {
  designs: [],
  currentDesign: null,
  isGenerating: false,
};

export const designSlice = createSlice({
  name: 'design',
  initialState,
  reducers: {
    addDesign: (state, action: PayloadAction<Design>) => {
      state.designs.unshift(action.payload);
    },
    setCurrentDesign: (state, action: PayloadAction<Design | null>) => {
      state.currentDesign = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const design = state.designs.find(d => d.id === action.payload);
      if (design) {
        design.isFavorite = !design.isFavorite;
      }
    },
    setGenerating: (state, action: PayloadAction<boolean>) => {
      state.isGenerating = action.payload;
    },
    removeDesign: (state, action: PayloadAction<string>) => {
      state.designs = state.designs.filter(d => d.id !== action.payload);
    },
  },
});

export const {
  addDesign,
  setCurrentDesign,
  toggleFavorite,
  setGenerating,
  removeDesign,
} = designSlice.actions;

export const selectDesigns = (state: RootState) => state.design;
export default designSlice.reducer;

