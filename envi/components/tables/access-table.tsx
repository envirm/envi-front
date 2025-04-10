"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ArrowDown, ArrowUp, ArrowUpDown, DoorOpen, User } from "lucide-react"

import type { AccessLog, UserSummary } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DataTable } from "@/components/tables/data-table"

interface AccessTableProps {
  logs: AccessLog[]
  userSummaries: Record<string, UserSummary>
}

export function AccessTable({ logs, userSummaries }: AccessTableProps) {
  const [selectedUser, setSelectedUser] = useState<UserSummary | null>(null)

  const columns = [
    {
      accessorKey: "timestamp",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-ml-4"
          >
            Timestamp
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        )
      },
      cell: ({ row }) => {
        const timestamp = row.getValue("timestamp") as string
        return <div>{format(new Date(timestamp), "yyyy-MM-dd HH:mm:ss")}</div>
      },
    },
    {
      accessorKey: "user_name",
      header: "User",
      cell: ({ row }) => {
        const userId = row.original.user_id
        const userName = row.getValue("user_name") as string

        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="link"
                className="p-0 h-auto font-normal"
                onClick={() => setSelectedUser(userSummaries[userId])}
              >
                {userName}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>User Summary</DialogTitle>
              </DialogHeader>
              {selectedUser && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{selectedUser.user_name}</div>
                      <div className="text-sm text-muted-foreground">
                        {selectedUser.last_seen
                          ? `Last seen: ${format(new Date(selectedUser.last_seen), "yyyy-MM-dd HH:mm")}`
                          : "No activity recorded"}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-md border p-4">
                    <div className="mb-2 font-medium">Activity Summary</div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-muted-foreground">Total time spent:</div>
                      <div>{selectedUser.total_time_spent} minutes</div>
                      <div className="text-muted-foreground">Rooms visited:</div>
                      <div>{selectedUser.rooms_visited.length}</div>
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 font-medium">Rooms Visited</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedUser.rooms_visited.map((room) => (
                        <div key={room} className="rounded-md bg-muted px-2 py-1 text-sm">
                          Room {room}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        )
      },
    },
    {
      accessorKey: "room_number",
      header: "Room",
      cell: ({ row }) => {
        return <div>Room {row.getValue("room_number")}</div>
      },
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        const action = row.getValue("action") as string
        return (
          <div className="flex items-center gap-2">
            <DoorOpen className={cn("h-4 w-4", action === "enter" ? "text-alert-normal" : "text-alert-warning")} />
            <span className="capitalize">{action}</span>
          </div>
        )
      },
    },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <User className="h-5 w-5 text-primary" />
          User Access Logs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={logs}
          searchColumn="user_name"
          filterOptions={{
            column: "action",
            options: [
              { label: "Enter", value: "enter" },
              { label: "Exit", value: "exit" },
            ],
          }}
        />
      </CardContent>
    </Card>
  )
}
