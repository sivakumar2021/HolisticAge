export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-stone-500">
        <p className="mb-2 font-medium text-stone-700">Holistic Age</p>
        <p className="max-w-2xl">
          Part of a broader Ageless Living approach to health, purpose, and longevity.
        </p>
        <p className="mt-6 text-xs text-stone-400">
          © {new Date().getFullYear()} Holistic Age. Not medical advice.
        </p>
      </div>
    </footer>
  );
}
