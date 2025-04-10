"use client"

import { format } from "date-fns"
import { ArrowDown, ArrowUp, ArrowUpDown, Clock } from "lucide-react"
import { motion } from "framer-motion"

import type { ShiftLog } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/tables/data-table"

interface ShiftLogsProps {
  logs: ShiftLog[]
}

export function ShiftLogs({ logs }: ShiftLogsProps) {
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
        return <div>{row.getValue("user_name")}</div>
      },
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        const action = row.getValue("action") as string
        return (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="capitalize">Shift {action}</span>
          </div>
        )
      },
    },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <motion.div
              animate={{
                rotate: [0, 15, 0, -15, 0],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 5,
                repeatDelay: 2,
              }}
            >
              <Clock className="h-5 w-5 text-primary" />
            </motion.div>
            Shift Logs
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
                { label: "Start", value: "start" },
                { label: "End", value: "end" },
              ],
            }}
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}
