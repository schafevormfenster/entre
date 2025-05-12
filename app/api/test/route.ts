import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log("Test API route hit!");
  return NextResponse.json({ message: "ok" });
}
