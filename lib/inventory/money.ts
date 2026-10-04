export function allocatedTransportCents(value: unknown): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0 || parsed > Number.MAX_SAFE_INTEGER / 100000000) {
    throw new Error("Transport cost must be a non-negative amount");
  }
  return Math.round(parsed * 100000000) / 100000000;
}

export function transportUsdToCents(value: string): number {
  return allocatedTransportCents(Number(value || 0) * 100);
}
