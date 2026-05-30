import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  try {
    const clients = await sql`SELECT * FROM clients ORDER BY created_at DESC`;
    return NextResponse.json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, image_url, link, password } = await request.json();

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!name || !image_url) {
      return NextResponse.json({ error: 'Name and image URL are required' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO clients (name, image_url, link)
      VALUES (${name}, ${image_url}, ${link || null})
      RETURNING *
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error adding client:', error);
    return NextResponse.json({ error: 'Failed to add client' }, { status: 500 });
  }
}
