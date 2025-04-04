import { NextResponse } from 'next/server';

// GET user progress
export async function GET() {
  // For now, return mock progress data
  return NextResponse.json({
    progress: {
      level: 1,
      score: 0,
      achievements: [],
      completedLessons: []
    }
  });
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

export async function PUT(request: Request) {
  const data = await request.json();
  return NextResponse.json({
    progress: {
      ...data
    }
  });
} 