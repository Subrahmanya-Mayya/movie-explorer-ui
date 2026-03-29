type Props = {
  genres: string[];
};

export default function GenreBadges({ genres }: Props) {
  return (
    <div>
      {genres.map((genre) => (
        <span key={genre} className="badge bg-secondary me-1">
          {genre}
        </span>
      ))}
    </div>
  );
}
