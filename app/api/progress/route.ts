import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// GET user progress
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json(
      { error: 'User ID is required' },
      { status: 400 }
    );
  }

  try {
    const result = await sql`
      SELECT 
        subject,
        topic,
        level,
        score,
        completed_at
      FROM user_progress
      WHERE user_id = ${userId}
      ORDER BY completed_at DESC;
    `;

    return NextResponse.json({ progress: result.rows });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    );
  }
}

// POST new progress
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, subject, topic, level, score } = body;

    if (!userId || !subject || !topic) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO user_progress (
        user_id,
        subject,
        topic,
        level,
        score
      ) VALUES (
        ${userId},
        ${subject},
        ${topic},
        ${level},
        ${score}
      )
      ON CONFLICT (user_id, subject, topic)
      DO UPDATE SET
        level = EXCLUDED.level,
        score = EXCLUDED.score,
        completed_at = CURRENT_TIMESTAMP
      RETURNING *;
    `;

    return NextResponse.json({ progress: result.rows[0] });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    );
  }
} 