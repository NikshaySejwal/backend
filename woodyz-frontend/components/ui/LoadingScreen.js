/**
 * Full-screen loading indicator used across protected pages.
 * Replaces 6 near-identical loading blocks throughout the app.
 */
export default function LoadingScreen({
  icon = 'ph:horse-bold',
  message = 'Loading...',
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="animate-pulse flex flex-col items-center">
        <iconify-icon icon={icon} class="text-6xl text-cedar mb-4"></iconify-icon>
        <p className="font-display text-2xl font-black text-charcoal/40">
          {message}
        </p>
      </div>
    </div>
  );
}
