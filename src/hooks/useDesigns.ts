import { useSelector, useDispatch } from 'react-redux';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { selectDesigns, addDesign, setGenerating, removeDesign } from '@/store/slices/designSlice';
import { api } from '@/services/api';
import { analytics } from '@/services/analytics';

export const useDesigns = () => {
  const designs = useSelector(selectDesigns);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { data: fetchedDesigns, isLoading, refetch } = useQuery({
    queryKey: ['designs'],
    queryFn: () => api.getDesigns(),
    staleTime: 5 * 60 * 1000,
  });

  const generateMutation = useMutation({
    mutationFn: (data: { type: string; style: string; description?: string }) =>
      api.generateDesign(data),
    onMutate: () => {
      dispatch(setGenerating(true));
    },
    onSuccess: (response) => {
      const design = response.data.design;
      dispatch(addDesign(design));
      analytics.trackDesignCreated(design.id, design.type, design.style);
      queryClient.invalidateQueries({ queryKey: ['designs'] });
    },
    onError: (error) => {
      console.error('Design generation error:', error);
    },
    onSettled: () => {
      dispatch(setGenerating(false));
    },
  });

  const generateDesign = useCallback(
    (type: string, style: string, description?: string) => {
      return generateMutation.mutateAsync({ type, style, description });
    },
    [generateMutation]
  );

  const deleteDesign = useCallback(
    async (designId: string) => {
      dispatch(removeDesign(designId));
      queryClient.invalidateQueries({ queryKey: ['designs'] });
    },
    [dispatch, queryClient]
  );

  return {
    designs: designs.designs,
    isGenerating: designs.isGenerating,
    generateDesign,
    deleteDesign,
    refetch,
    isLoading,
  };
};

