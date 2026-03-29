import ReviewCard from './ReviewCard';
import type { ReviewResponse } from '../types';

type Props = {
  reviews: ReviewResponse[];
};

export default function ReviewList({ reviews }: Props) {
  if (reviews.length === 0) {
    return <p className="text-muted">No reviews yet.</p>;
  }

  return (
    <div className="row">
      {reviews.map((review) => (
        <div className="col-md-6 mb-3" key={review.id}>
          <ReviewCard review={review} />
        </div>
      ))}
    </div>
  );
}
