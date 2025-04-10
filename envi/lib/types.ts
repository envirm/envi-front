export type UserStatus = "active" | "in-room" | "off-shift"
export type AccessAction = "enter" | "exit"
export type ShiftAction = "start" | "end"
export type WarningType = "unauthorized-access" | "door-forced" | "extended-access" | "unusual-hours"
export type WarningStatus = "critical" | "warning" | "resolved"

export interface User {
  id: string
  name: string
  status: UserStatus
  location?: string
  last_active?: string
  shift_start?: string
  shift_end?: string
  created_at?: string
}

export interface AccessLog {
  id: string
  user_id: string
  user_name?: string
  room_number: string
  timestamp: string
  action: AccessAction
  created_at?: string
}

export interface ShiftLog {
  id: string
  user_id: string
  user_name?: string
  timestamp: string
  action: ShiftAction
  created_at?: string
}

export interface SecurityWarning {
  id: string
  room_number: string
  timestamp: string
  type: WarningType
  status: WarningStatus
  description: string
  user_id?: string
  user_name?: string
  created_at?: string
}

export interface UserSummary {
  user_id: string
  user_name: string
  rooms_visited: string[]
  total_time_spent: number
  last_seen?: string
}
