import { Card, CardContent } from "./card"
import type { ReactNode } from "react"
import { ArrowDown, ArrowUp } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  icon: ReactNode
  change?: string
  changeText?: string
}

export function StatCard({ title, value, icon, change, changeText }: StatCardProps) {
  const isPositive = change && change.startsWith("+")
  const isNegative = change && change.startsWith("-")
  const isNeutral = change && change === "0"

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="rounded-full bg-gray-100 p-2">{icon}</div>
        </div>
        <div className="mt-4">
          <h3 className="text-3xl font-bold">{value}</h3>
          {change && (
            <div className="mt-2 flex items-center text-sm">
              {isPositive && (
                <div className="flex items-center text-green-600">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  {change}
                </div>
              )}
              {isNegative && (
                <div className="flex items-center text-red-600">
                  <ArrowDown className="mr-1 h-3 w-3" />
                  {change.substring(1)}
                </div>
              )}
              {isNeutral && <div className="text-gray-500">{change}</div>}
              {changeText && <span className="ml-1 text-gray-500">{changeText}</span>}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

