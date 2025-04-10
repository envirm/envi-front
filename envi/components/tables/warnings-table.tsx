"use client"

import { format } from "date-fns"
import { ArrowDown, ArrowUp, ArrowUpDown, Shield } from "lucide-react"

import type { SecurityWarning } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/tables/data-table"

interface WarningsTableProps {
  warnings: SecurityWarning[]
}

export function WarningsTable({ warnings }: WarningsTableProps) {
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
      accessorKey: "room_number",
      header: "Room",
      cell: ({ row }) => {
        return <div>Room {row.getValue("room_number")}</div>
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("type") as string
        return (
          <div className="capitalize">
            {type
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </div>
        )
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        return <div>{row.getValue("description")}</div>
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "h-2 w-2 rounded-full",
                status === "critical"
                  ? "bg-alert-critical"
                  : status === "warning"
                    ? "bg-alert-warning"
                    : "bg-alert-normal",
              )}
            />
            <span
              className={cn(
                "capitalize",
                status === "critical"
                  ? "text-alert-critical"
                  : status === "warning"
                    ? "text-alert-warning"
                    : "text-alert-normal",
              )}
            >
              {status}
            </span>
          </div>
        )
      },
    },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Shield className="h-5 w-5 text-primary" />
          Security Warnings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={warnings}
          searchColumn="room_number"
          filterOptions={{
            column: "status",
            options: [
              { label: "Critical", value: "critical" },
              { label: "Warning", value: "warning" },
              { label: "Resolved", value: "resolved" },
            ],
          }}
        />
      </CardContent>
    </Card>
  )
}
