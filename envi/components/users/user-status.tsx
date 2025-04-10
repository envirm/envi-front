import { formatDistanceToNow } from "date-fns"
import { Clock, User } from "lucide-react"

import type { User as UserType } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface UserStatusProps {
  users: UserType[]
}

export function UserStatus({ users }: UserStatusProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Users On Shift</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between rounded-md p-2 hover:bg-muted">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    user.status === "active"
                      ? "bg-alert-normal/20"
                      : user.status === "in-room"
                        ? "bg-primary/20"
                        : "bg-muted",
                  )}
                >
                  <User
                    className={cn(
                      "h-4 w-4",
                      user.status === "active"
                        ? "text-alert-normal"
                        : user.status === "in-room"
                          ? "text-primary"
                          : "text-muted-foreground",
                    )}
                  />
                </div>
                <div>
                  <span className="font-medium">{user.name}</span>
                  {user.shiftStart && user.status !== "off-shift" && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Started {formatDistanceToNow(user.shiftStart, { addSuffix: true })}</span>
                    </div>
                  )}
                  {user.shiftEnd && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Ended {formatDistanceToNow(user.shiftEnd, { addSuffix: true })}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                {user.status === "active" && (
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-alert-normal animate-pulse-slow"></span>
                    <span className="text-sm text-muted-foreground">Active</span>
                  </span>
                )}
                {user.status === "in-room" && (
                  <span className="text-sm text-muted-foreground">In Room {user.location}</span>
                )}
                {user.status === "off-shift" && <span className="text-sm text-muted-foreground">Off Shift</span>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
