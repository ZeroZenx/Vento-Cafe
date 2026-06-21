type QrPlaceholderProps = {
  label: string;
};

const modules = [
  1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0,
  0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1,
  1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0,
  1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1,
  0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0,
  1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1,
  0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0,
  1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1,
  1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0,
  0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1,
  1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0,
  0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1,
  1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0,
  0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0,
  1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1
];

export function QrPlaceholder({ label }: QrPlaceholderProps) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[250px] rounded-3xl bg-white p-5 shadow-[0_18px_55px_-28px_rgba(25,23,21,0.5)]">
      <div className="grid h-full w-full grid-cols-[repeat(16,minmax(0,1fr))] overflow-hidden rounded-lg" aria-hidden="true">
        {modules.map((active, index) => (
          <span key={`${label}-${index}`} className={active ? "bg-matte" : "bg-white"} />
        ))}
      </div>
      <span className="absolute inset-x-8 bottom-8 rounded-full bg-cream px-3 py-1 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-espresso">
        {label}
      </span>
    </div>
  );
}
