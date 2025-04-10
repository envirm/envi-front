import { createClient } from "@supabase/supabase-js"

let supabaseInstance = null

export const getSupabaseClient = () => {
  if (supabaseInstance) return supabaseInstance

  const supabaseUrl = "https://etwpaijgikjdorwvxxkn.supabase.co"
  const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0d3BhaWpnaWtqZG9yd3Z4eGtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDEwNzksImV4cCI6MjA1OTg3NzA3OX0.y7qJt2yVZIJFKWtYdX-MXb8wdzwyAf5LTgpWdjNL_Wo"

  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  return supabaseInstance
}

// For backward compatibility
export const supabaseClient = getSupabaseClient()
