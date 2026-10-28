-- AI Factory: schvalovane operace planovace
-- Migrace se zatim pouze uklada do Gitu.

CREATE TABLE IF NOT EXISTS public.factory_planner_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_key uuid NOT NULL UNIQUE,
  action text NOT NULL
    CHECK (action IN ('create_group', 'create_event')),
  payload jsonb NOT NULL
    CHECK (jsonb_typeof(payload) = 'object'),
  payload_hash text NOT NULL
    CHECK (payload_hash ~ '^[a-f0-9]{64}$'),
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN (
      'pending', 'approved', 'rejected',
      'executing', 'executed', 'failed', 'expired'
    )),
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL,
  approved_at timestamptz,
  approved_by_telegram_id bigint,
  executed_at timestamptz,
  result jsonb,
  CHECK (expires_at > created_at)
);

CREATE INDEX IF NOT EXISTS factory_planner_requests_status_idx
  ON public.factory_planner_requests (status, expires_at);

ALTER TABLE public.factory_planner_requests
  ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.factory_planner_requests
  FROM PUBLIC, anon, authenticated;

COMMENT ON TABLE public.factory_planner_requests IS
  'Private AI Factory proposals; only trusted backend may access.';
