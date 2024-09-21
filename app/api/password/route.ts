import { NextResponse } from 'next/server'
 
export async function GET(request: Request) {
  const password = Math.random().toString(36).substring(7);
  return NextResponse.json({ password }, { status: 200 })
}