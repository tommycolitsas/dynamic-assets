import { NextResponse } from "next/server";

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

if (!ELEVENLABS_API_KEY) {
  throw new Error("Missing ELEVENLABS_API_KEY in .env.local file");
}

export const dynamic = "force-dynamic";

// cache to make it snappy
const cache = new Map();

export async function POST(req) {
  try {
    const { text, voiceId } = await req.json();
    if (!text || !voiceId) {
      console.error("Text and voiceId are required");
      return NextResponse.json(
        { error: "Text and voiceId are required" },
        { status: 400 }
      );
    }

    // Check cache first
    const cacheKey = `${voiceId}-${text}`;
    if (cache.has(cacheKey)) {
      return new Response(cache.get(cacheKey), {
        headers: { "Content-Type": "audio/mpeg" },
      });
    }

    const headers = new Headers({
      "Content-Type": "application/json",
      "xi-api-key": ELEVENLABS_API_KEY,
    });

    const body = JSON.stringify({
      text,
      model_id: "eleven_turbo_v2_5",
      output_format: "mp3_44100_128",
    });

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`,
      {
        method: "POST",
        headers,
        body,
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Error response from ElevenLabs:", errorResponse);
      return NextResponse.json(
        { error: errorResponse.detail },
        { status: response.status }
      );
    }

    const audioData = await response.arrayBuffer();

    // Store in cache
    cache.set(cacheKey, audioData);

    return new Response(audioData, {
      headers: { "Content-Type": "audio/mpeg" },
    });
  } catch (error) {
    console.error("Error in text-to-speech route:", error);
    return NextResponse.json(
      { error: "Failed to generate audio", details: error.message },
      { status: 500 }
    );
  }
}
