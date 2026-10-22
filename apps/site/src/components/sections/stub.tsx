export function Stub({ id, label }: { id: string; label?: string }) {
  return (
    <section id={id} className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        <p className="text-sm text-muted">🚧 {label ?? id} — M3</p>
      </div>
    </section>
  );
}
