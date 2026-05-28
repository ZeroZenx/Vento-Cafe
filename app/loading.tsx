export default function Loading() {
  return (
    <div className="grid min-h-[65vh] place-items-center bg-cream px-6">
      <div className="flex items-center gap-3 rounded-full border border-espresso/15 bg-white px-6 py-3 shadow-soft">
        <span className="loading-dot h-2.5 w-2.5 rounded-full bg-forest" />
        <span className="loading-dot h-2.5 w-2.5 rounded-full bg-forest" style={{ animationDelay: "120ms" }} />
        <span className="loading-dot h-2.5 w-2.5 rounded-full bg-forest" style={{ animationDelay: "220ms" }} />
        <p className="ml-2 text-sm font-medium text-matte/75">Brewing your experience...</p>
      </div>
    </div>
  );
}
