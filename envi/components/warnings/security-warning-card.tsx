"use client"

import { formatDistanceToNow } from "date-fns"
import { AlertTriangle, DoorOpen, Clock, Shield } from "lucide-react"
import { motion } from "framer-motion"

import type { SecurityWarning } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface SecurityWarningCardProps {
  warning: SecurityWarning
}

export function SecurityWarningCard({ warning }: SecurityWarningCardProps) {
  const { room_number, timestamp, type, status, description, user_name } = warning

  const getIcon = () => {
    switch (type) {
      case "unauthorized-access":
        return <DoorOpen className="h-5 w-5" />
      case "door-forced":
        return <AlertTriangle className="h-5 w-5" />
      case "extended-access":
        return <Clock className="h-5 w-5" />
      case "unusual-hours":
        return <Shield className="h-5 w-5" />
      default:
        return <AlertTriangle className="h-5 w-5" />
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card
        className={cn(
          "transition-all duration-300 overflow-hidden border-l-4",
          status === "critical"
            ? "border-l-alert-critical"
            : status === "warning"
              ? "border-l-alert-warning"
              : "border-l-alert-normal",
        )}
      >
        <CardHeader
          className={cn(
            "flex flex-row items-center justify-between py-3",
            status === "critical"
              ? "bg-alert-critical/10"
              : status === "warning"
                ? "bg-alert-warning/10"
                : "bg-alert-normal/10",
          )}
        >
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "h-8 w-8 flex items-center justify-center rounded-full",
                status === "critical"
                  ? "bg-alert-critical/20 text-alert-critical"
                  : status === "warning"
                    ? "bg-alert-warning/20 text-alert-warning"
                    : "bg-alert-normal/20 text-alert-normal",
              )}
            >
              {getIcon()}
            </div>
            <div>
              <span className="font-semibold">Room {room_number}</span>
              <div className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
              </div>
            </div>
          </div>
          <div
            className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              status === "critical"
                ? "bg-alert-critical/20 text-alert-critical"
                : status === "warning"
                  ? "bg-alert-warning/20 text-alert-warning"
                  : "bg-alert-normal/20 text-alert-normal",
            )}
          >
            {status.toUpperCase()}
          </div>
        </CardHeader>
        <CardContent className="py-4">
          <div className="flex flex-col gap-2">
            <div className="text-sm font-medium">{description}</div>
            {user_name && (
              <div className="mt-2 text-xs text-muted-foreground">
                Associated user: <span className="font-medium">{user_name}</span>
              </div>
            )}
            <div className="mt-2 flex items-center gap-2 text-xs">
              <div
                className={cn(
                  "px-2 py-1 rounded-md",
                  type === "unauthorized-access"
                    ? "bg-alert-critical/10 text-alert-critical"
                    : type === "door-forced"
                      ? "bg-alert-critical/10 text-alert-critical"
                      : type === "extended-access"
                        ? "bg-alert-warning/10 text-alert-warning"
                        : "bg-alert-warning/10 text-alert-warning",
                )}
              >
                {type
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
