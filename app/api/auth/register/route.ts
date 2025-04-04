import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { hash } from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    // Check if user already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `;

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await hash(password, 12);

    // Create user
    const result = await sql`
      INSERT INTO users (email, name, password_hash)
      VALUES (${email}, ${name}, ${passwordHash})
      RETURNING id, email, name
    `;

    // Initialize user progress
    await sql`
      INSERT INTO user_progress (user_id)
      VALUES (${result.rows[0].id})
    `;

    return NextResponse.json({
      user: result.rows[0]
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 