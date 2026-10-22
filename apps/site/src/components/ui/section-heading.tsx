export function SectionHeading({
  title,
  intro,
}: {
  title: React.ReactNode;
  intro?: React.ReactNode;
}) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <h2 className="text-balance text-2xl font-semibold tracking-tight text-title sm:text-3xl">
        {title}
      </h2>
      {intro ? <p className="mt-3 text-pretty text-muted">{intro}</p> : null}
    </div>
  );
}
