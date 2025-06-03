CREATE TABLE IF NOT EXISTS public.app_config (
    config_key text NOT NULL PRIMARY KEY,
    config_value text,
    updated_at timestamp with time zone DEFAULT now()
);
 
COMMENT ON TABLE public.app_config IS 'Stores application-wide configuration settings, like the Slack invite link.'; 