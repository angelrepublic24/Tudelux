import { findDistributors} from '@/api/AuthApi';
import { useQuery } from '@tanstack/react-query';

export const useDistributor = (limit: number = 10, page: number = 1) => {
  return useQuery({
    queryKey: ['sellers', limit, page],
    queryFn: () => findDistributors(limit, page),
    staleTime: 1000 * 60 * 5, // 5 minutos
    placeholderData: (prev) => prev, // 👈 esto reemplaza keepPreviousData
  });
};
