"use server"

import { createServerClient } from "@/lib/supabase/server"
import type { User } from "@/lib/types"

export async function getUsers(): Promise<User[]> {
  const supabase = createServerClient()

  const { data, error } = await supabase.from("users").select("*").order("name")

  if (error) {
    console.error("Error fetching users:", error)
    return []
  }

  return data || []
}

export async function getUserById(id: string): Promise<User | null> {
  const supabase = createServerClient()

  const { data, error } = await supabase.from("users").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching user ${id}:`, error)
    return null
  }

  return data
}
