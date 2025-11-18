import { NextResponse } from 'next/server';

const SUBMISSION_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwWIozSGTUxg0E9IJ-MDngjfrXWDj4vURhv0z-TaPTqBJn2BNcLQTfgYmKpcG0eYpt1/exec';

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const upstream = await fetch(SUBMISSION_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    const text = await upstream.text();
    if (!upstream.ok) {
      throw new Error(text || 'Upstream rejected the submission.');
    }

    return NextResponse.json({ ok: true, upstream: text });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
