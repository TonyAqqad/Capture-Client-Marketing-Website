import { NextResponse } from "next/server";

// Use nodejs runtime for process.uptime() support
export const runtime = "nodejs";

interface HealthCheckResponse {
  status: "healthy" | "unhealthy";
  timestamp: string;
  uptime: number;
  service: string;
  version: string;
}

export async function GET() {
  try {
    const healthData: HealthCheckResponse = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: typeof process.uptime === "function" ? process.uptime() : 0,
      service: "capture-client-website",
      version: process.env.npm_package_version || "1.0.0",
    };

    return NextResponse.json(healthData, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
        service: "capture-client-website",
      },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  }
}
