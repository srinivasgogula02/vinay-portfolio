import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  try {
    const testimonials = await sql`SELECT * FROM testimonials ORDER BY created_at DESC`;
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { client_name, company, content, rating, image_url, password } = await request.json();

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!client_name || !content) {
      return NextResponse.json({ error: 'Client name and content are required' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO testimonials (client_name, company, content, rating, image_url)
      VALUES (${client_name}, ${company || null}, ${content}, ${rating || 5}, ${image_url || null})
      RETURNING *
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error adding testimonial:', error);
    return NextResponse.json({ error: 'Failed to add testimonial' }, { status: 500 });
  }
}
