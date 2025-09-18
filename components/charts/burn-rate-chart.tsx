"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface BurnRateChartProps {
  data: Array<{
    month: string
    burnRate: number
    runway: number
  }>
}

export function BurnRateChart({ data }: BurnRateChartProps) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="month" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickFormatter={(value) => `$${value}K`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px",
              fontSize: "12px"
            }}
            formatter={(value: number) => [`$${value}K`, "Burn Rate"]}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Area 
            type="monotone" 
            dataKey="burnRate" 
            stroke="hsl(var(--destructive))" 
            fill="hsl(var(--destructive) / 0.1)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
