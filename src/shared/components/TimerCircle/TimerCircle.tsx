"use client"

import { useEffect, useState } from "react"

export default function TimerCircle() {
  const duration = 300 
  const [timeLeft, setTimeLeft] = useState(duration)

  const size = 65
  const strokeWidth = 10
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  const progress = timeLeft / duration
  const offset = circumference * (1 - progress)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const formatted = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size}>
       
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#DBEAFE" 
          strokeWidth={strokeWidth}
          fill="none"
        />

       
        <circle
      
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#2563EB"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
         
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>

      
      <span className="absolute text-sm ">
        {formatted}
      </span>
    </div>
  )
}