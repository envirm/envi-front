import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

// Server components will always create a new instance since they run on the server
export function createServerClient() {
  const cookieStore = cookies()
  const   ANNON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0d3BhaWpnaWtqZG9yd3Z4eGtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDEwNzksImV4cCI6MjA1OTg3NzA3OX0.y7qJt2yVZIJFKWtYdX-MXb8wdzwyAf5LTgpWdjNL_Wo"
 
  return createClient("https://etwpaijgikjdorwvxxkn.supabase.co", ANNON_KEY, {
    // Removed invalid 'cookies' property as it is not supported in SupabaseClientOptions
  })
}
