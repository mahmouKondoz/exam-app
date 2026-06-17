import { getAuthToken } from "@/features/hooks/get-auth-token"
import { NextResponse } from "next/server"


export async function POST(req: Request) {
  let resultBody = await req.json()
  let token = await getAuthToken()

  let { examId, answers, startedAt } = resultBody

  let res = await fetch('https://exam-app.elevate-bootcamp.cloud/api/submissions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ examId, answers, startedAt })
  })

  let data = await res.json()

  if (!res.ok) {
    return NextResponse.json(  
      { status: 'error', data: data.message },
      { status: res.status }
    )
  }

  return NextResponse.json({ message: 'Success', data })
}