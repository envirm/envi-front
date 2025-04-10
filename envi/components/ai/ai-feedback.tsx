"use client"

import { Brain } from "lucide-react"
import { motion } from "framer-motion"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AiFeedbackProps {
  suggestions: string[]
}

export function AiFeedback({ suggestions }: AiFeedbackProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              duration: 2,
            }}
          >
            <Brain className="h-5 w-5 text-primary" />
          </motion.div>
          AI Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <motion.li
              key={index}
              className="flex items-start gap-2 text-sm"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
            >
              <span className="mt-0.5 h-2 w-2 rounded-full bg-primary"></span>
              <span>{suggestion}</span>
            </motion.li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
