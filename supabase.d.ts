
declare module '@supabase/supabase-js' {
    interface SupabaseRealtimePayload<T = any> {
      unsubscribe(): void
    }
  }