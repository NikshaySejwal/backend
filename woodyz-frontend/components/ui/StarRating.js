/**
 * Renders a row of star icons for a given rating.
 * Supports full, half, and empty stars.
 *
 * Replaces 3 separate inline star-rendering implementations
 * (Bestsellers.js, ProductReviews.js, products/[id].js, profile.js).
 */
export default function StarRating({
  rating,
  maxStars = 5,
  size = 'text-lg',
  color = 'text-orange',
}) {
  return (
    <div className={`flex ${color} ${size}`}>
      {Array.from({ length: maxStars }, (_, i) => {
        const starIndex = i + 1;
        let icon;
        if (starIndex <= Math.floor(rating)) {
          icon = 'ph:star-fill';
        } else if (starIndex === Math.ceil(rating) && rating % 1 !== 0) {
          icon = 'ph:star-half-fill';
        } else {
          icon = 'ph:star-bold';
        }
        return <iconify-icon key={i} icon={icon}></iconify-icon>;
      })}
    </div>
  );
}
