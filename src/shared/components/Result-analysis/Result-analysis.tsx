"use client"

import { Pie, PieChart } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"



const chartConfig = {
  visitors: {
    label: "Total",
  },
  correct: {
    label: "Correct",
    color: "#00BC7D", 
  },
  incorrect: {
    label: "Incorrect",
    color: "#EF4444",
  },
} satisfies ChartConfig

interface ResultAnalysisType{
  wrongAnswer:number
  correctAnswer:number

}

export function ResultAnalysis({wrongAnswer , correctAnswer}:ResultAnalysisType) {
  const chartData = [
  { status: "correct", visitors: correctAnswer*10, fill: "var(--color-correct)" },
  { status: "incorrect", visitors: wrongAnswer*10, fill: "var(--color-incorrect)" },
]
  return (
    <ChartContainer 
  config={chartConfig} 
  className="w-100"
>
  <PieChart width={203} height={203}>
    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
    <Pie
      data={chartData}
      dataKey="visitors"
      nameKey="status"
      innerRadius={70} 
      outerRadius={107}
      strokeWidth={0} 
    />
  </PieChart>
</ChartContainer>
  )
}