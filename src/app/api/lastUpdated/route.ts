import { NextResponse } from "next/server";
import jsonFile from "./lastUpdated.json";
export async function GET() {
  const lastUpdated = jsonFile.lastUpdated;

  return NextResponse.json({ lastUpdated });
}
