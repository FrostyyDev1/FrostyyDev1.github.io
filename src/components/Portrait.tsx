/**
 * Intentional monogram until a real photograph exists.
 * TODO: replace this figure with public/jacob-photo.jpg
 * (4:5, described as Jacob Wiseman) when Jacob provides one.
 */
export default function Portrait() {
  return (
    <figure className="portrait">
      <div className="monogram" aria-hidden="true">
        <span>Portrait</span>
        <strong>JW</strong>
        <span>Elkview, WV</span>
      </div>
      <figcaption className="sr-only">
        Monogram placeholder for a portrait of Jacob Wiseman
      </figcaption>
    </figure>
  );
}
