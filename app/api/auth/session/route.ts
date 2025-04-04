import { NextResponse } from 'next/server';

export async function GET() {
  // For now, return a mock session
  return NextResponse.json({
    user: null,
    error: null
  });
} 