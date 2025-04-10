// Types
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
  lastActive?: Date
  shiftStart?: Date
  shiftEnd?: Date
}

export interface AccessLog {
  id: string
  userId: string
  userName: string
  roomNumber: string
  timestamp: Date
  action: AccessAction
}

export interface ShiftLog {
  id: string
  userId: string
  userName: string
  timestamp: Date
  action: ShiftAction
}

export interface UserSummary {
  userId: string
  userName: string
  roomsVisited: string[]
  totalTimeSpent: number // in minutes
  lastSeen?: Date
}

export interface SecurityWarning {
  id: string
  roomNumber: string
  timestamp: Date
  type: WarningType
  status: WarningStatus
  description: string
  userId?: string
  userName?: string
}

// Mock data
export const users: User[] = [
  {
    id: "user1",
    name: "John Smith",
    status: "active",
    shiftStart: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
  {
    id: "user2",
    name: "Emily Johnson",
    status: "in-room",
    location: "104",
    shiftStart: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "user3",
    name: "Michael Brown",
    status: "active",
    shiftStart: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
  {
    id: "user4",
    name: "Sarah Davis",
    status: "off-shift",
    shiftEnd: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: "user5",
    name: "David Wilson",
    status: "in-room",
    location: "102",
    shiftStart: new Date(Date.now() - 1 * 60 * 60 * 1000),
  },
]

// Generate access logs
export const accessLogs: AccessLog[] = Array.from({ length: 40 }, (_, i) => {
  const userIndex = Math.floor(Math.random() * users.length)
  const user = users[userIndex]
  const roomNumber = `10${Math.floor(Math.random() * 5) + 1}`
  const action: AccessAction = i % 2 === 0 ? "enter" : "exit"

  return {
    id: `access-log-${i}`,
    userId: user.id,
    userName: user.name,
    roomNumber,
    timestamp: new Date(Date.now() - i * 15 * 60000), // Every 15 minutes back in time
    action,
  }
})

// Generate shift logs
export const shiftLogs: ShiftLog[] = []

users.forEach((user) => {
  if (user.shiftStart) {
    shiftLogs.push({
      id: `shift-start-${user.id}`,
      userId: user.id,
      userName: user.name,
      timestamp: user.shiftStart,
      action: "start",
    })
  }

  if (user.shiftEnd) {
    shiftLogs.push({
      id: `shift-end-${user.id}`,
      userId: user.id,
      userName: user.name,
      timestamp: user.shiftEnd,
      action: "end",
    })
  }
})

// Sort shift logs by timestamp (newest first)
shiftLogs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

// Generate security warnings
export const securityWarnings: SecurityWarning[] = [
  {
    id: "warning1",
    roomNumber: "101",
    timestamp: new Date(Date.now() - 15 * 60000),
    type: "unauthorized-access",
    status: "critical",
    description: "Door opened without valid credentials",
  },
  {
    id: "warning2",
    roomNumber: "103",
    timestamp: new Date(Date.now() - 45 * 60000),
    type: "door-forced",
    status: "critical",
    description: "Door lock appears to have been forced",
  },
  {
    id: "warning3",
    roomNumber: "102",
    timestamp: new Date(Date.now() - 120 * 60000),
    type: "unusual-hours",
    status: "warning",
    description: "Access attempt outside normal operating hours",
    userId: "user3",
    userName: "Michael Brown",
  },
  {
    id: "warning4",
    roomNumber: "105",
    timestamp: new Date(Date.now() - 180 * 60000),
    type: "extended-access",
    status: "warning",
    description: "Door left open for extended period",
  },
  {
    id: "warning5",
    roomNumber: "104",
    timestamp: new Date(Date.now() - 240 * 60000),
    type: "unauthorized-access",
    status: "resolved",
    description: "Multiple failed access attempts",
  },
]

// AI suggestions
export const aiSuggestions = [
  "2 critical security warnings in the last hour",
  "Room 101 shows pattern of unauthorized access attempts",
  "Consider reviewing access permissions for Room 103",
  "Unusual activity detected outside normal hours",
]

// Generate user summaries
export const userSummaries: Record<string, UserSummary> = {}

users.forEach((user) => {
  const userLogs = accessLogs.filter((log) => log.userId === user.id)
  const roomsVisited = [...new Set(userLogs.map((log) => log.roomNumber))]

  userSummaries[user.id] = {
    userId: user.id,
    userName: user.name,
    roomsVisited,
    totalTimeSpent: Math.floor(Math.random() * 240), // Random time in minutes
    lastSeen: userLogs.length > 0 ? userLogs[0].timestamp : undefined,
  }
})
