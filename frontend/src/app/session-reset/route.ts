import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const store = await cookies()
  store.delete('novavest-token')
  const url = new URL('/login', request.url)
  return NextResponse.redirect(url)
}
