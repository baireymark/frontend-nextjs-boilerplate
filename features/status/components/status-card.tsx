'use client';

import { Button, Card } from '@/shared/ui';
import { useHealth } from '../api';
import { useStatusSettings } from '../store';

const REFRESH_MS = 30_000;

export function StatusCard() {
  const autoRefresh = useStatusSettings((state) => state.autoRefresh);
  const toggleAutoRefresh = useStatusSettings((state) => state.toggleAutoRefresh);
  const health = useHealth({ refetchInterval: autoRefresh ? REFRESH_MS : false });

  return (
    <Card>
      <h2 className="text-lg font-semibold">API status</h2>
      <div role="status" aria-live="polite" className="mt-3 text-sm">
        {health.isPending ? <p>Checking…</p> : null}
        {health.isError ? <p className="text-danger">The API is unreachable.</p> : null}
        {health.isSuccess ? (
          <p>
            <span className="font-medium text-success">Operational</span>
            <span className="text-fg-muted">
              {' '}
              · checked {new Date(health.data.timestamp).toLocaleTimeString()}
            </span>
          </p>
        ) : null}
      </div>
      <div className="mt-4 flex gap-2">
        <Button variant="secondary" size="sm" onClick={() => void health.refetch()}>
          Check now
        </Button>
        <Button
          variant="secondary"
          size="sm"
          aria-pressed={autoRefresh}
          onClick={toggleAutoRefresh}
        >
          Auto-refresh: {autoRefresh ? 'on' : 'off'}
        </Button>
      </div>
    </Card>
  );
}
