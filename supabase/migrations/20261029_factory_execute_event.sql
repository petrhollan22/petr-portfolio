CREATE OR REPLACE FUNCTION public.factory_execute_approved_event(
  p_proposal_id uuid
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  req public.factory_planner_requests%ROWTYPE;
  new_event_id uuid;
  person_ids uuid[];
  output jsonb;
BEGIN
  SELECT * INTO req
  FROM public.factory_planner_requests
  WHERE id = p_proposal_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'proposal_not_found';
  END IF;

  IF req.status = 'executed' THEN
    RETURN req.result;
  END IF;

  IF req.status <> 'approved'
     OR req.approved_at IS NULL
     OR req.expires_at <= now()
     OR req.action <> 'create_event' THEN
    RAISE EXCEPTION 'proposal_not_executable';
  END IF;

  IF jsonb_typeof(req.payload->'personIds') <> 'array'
     OR jsonb_array_length(req.payload->'personIds') = 0 THEN
    RAISE EXCEPTION 'missing_people';
  END IF;

  SELECT array_agg(DISTINCT item::uuid)
  INTO person_ids
  FROM jsonb_array_elements_text(req.payload->'personIds')
    AS participants(item);

  IF person_ids IS NULL THEN
    RAISE EXCEPTION 'missing_people';
  END IF;

  INSERT INTO public.events (
    activity, starts_at, duration_minutes,
    rsvp_deadline, plus_one
  )
  VALUES (
    req.payload->>'activity',
    (req.payload->>'startsAt')::timestamptz,
    120,
    (req.payload->>'startsAt')::timestamptz
      - interval '24 hours',
    'no'
  )
  RETURNING id INTO new_event_id;

  INSERT INTO public.invitations (event_id, person_id)
  SELECT new_event_id, unnest(person_ids);

  IF req.payload ? 'groupId' THEN
    INSERT INTO public.event_groups (event_id, group_id)
    VALUES (
      new_event_id,
      (req.payload->>'groupId')::uuid
    );
  END IF;

  output := jsonb_build_object('eventId', new_event_id);

  UPDATE public.factory_planner_requests
  SET status = 'executed',
      executed_at = now(),
      result = output
  WHERE id = p_proposal_id;

  RETURN output;
END;
$$;

REVOKE ALL ON FUNCTION
  public.factory_execute_approved_event(uuid)
  FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION
  public.factory_execute_approved_event(uuid)
  TO service_role;
