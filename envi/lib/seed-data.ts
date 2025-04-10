import { createServerClient } from "@/lib/supabase/server"
import type { UserStatus, AccessAction, ShiftAction, WarningType, WarningStatus } from "@/lib/types"

export async function seedDatabase() {
  const supabase = createServerClient()

  // Create more users with varied statuses
  const users = [
    {
      name: "John Smith",
      status: "active" as UserStatus,
      shift_start: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
    {
      name: "Emily Johnson",
      status: "in-room" as UserStatus,
      location: "104",
      shift_start: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      name: "Michael Brown",
      status: "active" as UserStatus,
      shift_start: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    },
    {
      name: "Sarah Davis",
      status: "off-shift" as UserStatus,
      shift_end: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    },
    {
      name: "David Wilson",
      status: "in-room" as UserStatus,
      location: "102",
      shift_start: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
    // Additional users
    {
      name: "Jennifer Lee",
      status: "active" as UserStatus,
      shift_start: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
    {
      name: "Robert Garcia",
      status: "in-room" as UserStatus,
      location: "201",
      shift_start: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    },
    {
      name: "Lisa Martinez",
      status: "off-shift" as UserStatus,
      shift_end: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      name: "James Taylor",
      status: "active" as UserStatus,
      shift_start: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    },
    {
      name: "Patricia Anderson",
      status: "in-room" as UserStatus,
      location: "301",
      shift_start: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
    },
  ]

  const { data: createdUsers, error: userError } = await supabase.from("users").insert(users).select()

  if (userError) {
    console.error("Error creating users:", userError)
    return { success: false, error: userError }
  }

  // Create shift logs
  const shiftLogs = []

  for (const user of createdUsers) {
    if (user.shift_start) {
      shiftLogs.push({
        user_id: user.id,
        timestamp: user.shift_start,
        action: "start" as ShiftAction,
      })
    }

    if (user.shift_end) {
      shiftLogs.push({
        user_id: user.id,
        timestamp: user.shift_end,
        action: "end" as ShiftAction,
      })
    }
  }

  // Add historical shift logs for the past week
  for (let i = 1; i <= 7; i++) {
    const dayOffset = i * 24 * 60 * 60 * 1000

    // Morning shift
    const morningUser = createdUsers[i % createdUsers.length]
    shiftLogs.push({
      user_id: morningUser.id,
      timestamp: new Date(Date.now() - dayOffset + 8 * 60 * 60 * 1000).toISOString(), // 8 AM
      action: "start" as ShiftAction,
    })
    shiftLogs.push({
      user_id: morningUser.id,
      timestamp: new Date(Date.now() - dayOffset + 16 * 60 * 60 * 1000).toISOString(), // 4 PM
      action: "end" as ShiftAction,
    })

    // Evening shift
    const eveningUser = createdUsers[(i + 3) % createdUsers.length]
    shiftLogs.push({
      user_id: eveningUser.id,
      timestamp: new Date(Date.now() - dayOffset + 16 * 60 * 60 * 1000).toISOString(), // 4 PM
      action: "start" as ShiftAction,
    })
    shiftLogs.push({
      user_id: eveningUser.id,
      timestamp: new Date(Date.now() - dayOffset + 24 * 60 * 60 * 1000).toISOString(), // 12 AM
      action: "end" as ShiftAction,
    })
  }

  const { error: shiftLogError } = await supabase.from("shift_logs").insert(shiftLogs)

  if (shiftLogError) {
    console.error("Error creating shift logs:", shiftLogError)
    return { success: false, error: shiftLogError }
  }

  // Create access logs with more varied room numbers
  const accessLogs = []
  const roomNumbers = ["101", "102", "103", "104", "105", "201", "202", "203", "301", "302", "303"]

  // Generate 100 access logs instead of 40
  for (let i = 0; i < 100; i++) {
    const userIndex = Math.floor(Math.random() * createdUsers.length)
    const user = createdUsers[userIndex]
    const roomNumber = roomNumbers[Math.floor(Math.random() * roomNumbers.length)]
    const action = i % 2 === 0 ? ("enter" as AccessAction) : ("exit" as AccessAction)

    // Vary the timestamps more - from 5 minutes ago to 7 days ago
    const minutesAgo = Math.floor(Math.random() * 10080) + 5 // 5 minutes to 7 days (10080 minutes)

    accessLogs.push({
      user_id: user.id,
      room_number: roomNumber,
      timestamp: new Date(Date.now() - minutesAgo * 60000).toISOString(),
      action,
    })
  }

  // Sort by timestamp to ensure enter/exit pairs make sense
  accessLogs.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())

  const { error: accessLogError } = await supabase.from("access_logs").insert(accessLogs)

  if (accessLogError) {
    console.error("Error creating access logs:", accessLogError)
    return { success: false, error: accessLogError }
  }

  // Create more security warnings with varied types and statuses
  const securityWarnings = [
    // Critical warnings - recent
    {
      room_number: "101",
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      type: "unauthorized-access" as WarningType,
      status: "critical" as WarningStatus,
      description: "Door opened without valid credentials",
    },
    {
      room_number: "103",
      timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
      type: "door-forced" as WarningType,
      status: "critical" as WarningStatus,
      description: "Door lock appears to have been forced",
    },
    {
      room_number: "302",
      timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
      type: "door-forced" as WarningType,
      status: "critical" as WarningStatus,
      description: "Multiple failed access attempts followed by forced entry",
    },

    // Warning level - recent
    {
      room_number: "102",
      timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
      type: "unusual-hours" as WarningType,
      status: "warning" as WarningStatus,
      description: "Access attempt outside normal operating hours",
      user_id: createdUsers[2].id,
    },
    {
      room_number: "105",
      timestamp: new Date(Date.now() - 180 * 60000).toISOString(),
      type: "extended-access" as WarningType,
      status: "warning" as WarningStatus,
      description: "Door left open for extended period",
    },
    {
      room_number: "201",
      timestamp: new Date(Date.now() - 150 * 60000).toISOString(),
      type: "unusual-hours" as WarningType,
      status: "warning" as WarningStatus,
      description: "Multiple access attempts at 2:30 AM",
      user_id: createdUsers[6].id,
    },

    // Resolved issues
    {
      room_number: "104",
      timestamp: new Date(Date.now() - 240 * 60000).toISOString(),
      type: "unauthorized-access" as WarningType,
      status: "resolved" as WarningStatus,
      description: "Multiple failed access attempts",
    },
    {
      room_number: "202",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      type: "door-forced" as WarningType,
      status: "resolved" as WarningStatus,
      description: "Door sensor triggered alarm",
    },
    {
      room_number: "301",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      type: "extended-access" as WarningType,
      status: "resolved" as WarningStatus,
      description: "Room accessed for over 4 hours outside maintenance window",
      user_id: createdUsers[4].id,
    },

    // Historical data
    {
      room_number: "103",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      type: "unauthorized-access" as WarningType,
      status: "resolved" as WarningStatus,
      description: "Attempted access with expired credentials",
      user_id: createdUsers[7].id,
    },
    {
      room_number: "302",
      timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
      type: "unusual-hours" as WarningType,
      status: "resolved" as WarningStatus,
      description: "Weekend access without prior authorization",
      user_id: createdUsers[1].id,
    },
    {
      room_number: "201",
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      type: "door-forced" as WarningType,
      status: "resolved" as WarningStatus,
      description: "Door held open for more than 30 seconds",
    },
  ]

  const { error: warningError } = await supabase.from("security_warnings").insert(securityWarnings)

  if (warningError) {
    console.error("Error creating security warnings:", warningError)
    return { success: false, error: warningError }
  }

  return { success: true }
}
