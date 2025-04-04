import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { compare } from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const result = await sql`
      SELECT id, email, name, password_hash
      FROM users
      WHERE email = ${email}
    `;

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const user = result.rows[0];
    const passwordValid = await compare(password, user.password_hash);

    if (!passwordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // In a real app, you would set up a session here
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 