import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase environment variables');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const body = await request.json();
    const { userId, subject, topic, level, score } = body;

    if (!userId || !subject || !topic) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        subject,
        topic,
        level,
        score,
        completed_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ progress: data });
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