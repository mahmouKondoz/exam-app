"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"

export function ProgressBar({progress}:{progress:number}) {
  

  return <Progress value={progress} className="w-full text-blue-600 bg-blue-50 h-4 rounded-none [&>div]:bg-blue-600" />
}
