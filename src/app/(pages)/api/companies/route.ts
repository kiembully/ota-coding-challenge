// app/api/companies/route.ts
import { Company } from "@/types/types";
import { NextResponse } from "next/server";

const companies: Company[] = [
  { id: 1, name: "Company 1" },
  { id: 2, name: "Company 2" },
  { id: 3, name: "Company 3" },
  { id: 4, name: "Company 4" },
  { id: 5, name: "Company 5" },
  { id: 6, name: "Company 6" },
  { id: 7, name: "Company 7" },
  { id: 8, name: "Company 8" },
  { id: 9, name: "Company 9" },
  { id: 10, name: "Company 10" },
  { id: 11, name: "Company 11" },
  { id: 12, name: "Company 12" },
  { id: 13, name: "Company 13" },
  { id: 14, name: "Company 14" },
  { id: 15, name: "Company 15" },
  { id: 16, name: "Company 16" },
  { id: 17, name: "Company 17" },
  { id: 18, name: "Company 18" },
  { id: 19, name: "Company 19" },
  { id: 20, name: "Company 20" },
  { id: 21, name: "Company 21" },
  { id: 22, name: "Company 22" },
  { id: 23, name: "Company 23" },
  { id: 24, name: "Company 24" },
  { id: 25, name: "Company 25" },
  { id: 26, name: "Company 26" },
];

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const limit = Number(url.searchParams.get("limit")) || 5;

  const start = (page - 1) * limit;
  const end = start + limit;

  return NextResponse.json(companies.slice(start, end));
}
