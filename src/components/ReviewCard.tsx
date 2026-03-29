import type { ReviewResponse } from '../types';

type Props = {
  review: ReviewResponse;
};

export default function ReviewCard({ review }: Props) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between mb-1">
          <strong>{review.reviewer_name}</strong>
          <span>{review.score.toFixed(1)} / 10</span>
        </div>
        <p className="card-text">{review.comment}</p>
      </div>
    </div>
  );
}
