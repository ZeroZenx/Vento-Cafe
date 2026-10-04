import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin/auth";
import { importOpeningStock, reconcileOpeningCosts } from "@/lib/inventory/store";
import { validateOpeningEntries } from "@/lib/inventory/opening-stock";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await hasAdminSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json() as { entries: unknown };
    const importedUnits = await importOpeningStock(validateOpeningEntries(body.entries));
    return NextResponse.json({ importedUnits });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Opening stock import failed" }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  if (!(await hasAdminSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json() as { entries: unknown };
    const correctedProducts = await reconcileOpeningCosts(validateOpeningEntries(body.entries));
    return NextResponse.json({ correctedProducts });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Opening cost correction failed" }, { status: 400 });
  }
}
