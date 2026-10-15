import { useQuery } from '@tanstack/react-query';

import { fetchJson } from '@/shared/api/http';
import { healthResponseSchema } from '@/shared/api/schemas';

export const statusKeys = {
  health: ['status', 'health'] as const,
};

export function useHealth(options: { refetchInterval: number | false }) {
  return useQuery({
    queryKey: statusKeys.health,
    queryFn: () => fetchJson('/api/health', healthResponseSchema),
    refetchInterval: options.refetchInterval,
  });
}
