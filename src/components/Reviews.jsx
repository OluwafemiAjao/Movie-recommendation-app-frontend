import { useState, useEffect } from "react";

function Reviews({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");

  // Load reviews for this movie from localStorage on mount
  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem(`reviews-${movieId}`)) || [];
    setReviews(storedReviews);
  }, [movieId]);

  // Save reviews for this movie to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`reviews-${movieId}`, JSON.stringify(reviews));
  }, [reviews, movieId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.trim()) return;

    const updatedReviews = [...reviews, { text: newReview, date: new Date().toISOString() }];
    setReviews(updatedReviews);
    setNewReview("");
  };

  return (
    <div className="mt-6 p-4 border rounded bg-gray-100">
      <h2 className="text-xl font-bold mb-3">User Reviews</h2>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Write your review..."
          className="w-full p-2 border rounded"
          rows="3"
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit Review
        </button>
      </form>

      {/* Review List */}
      {reviews.length === 0 ? (
        <p className="text-gray-600">No reviews yet. Be the first to review!</p>
      ) : (
        <ul className="space-y-2">
          {reviews.map((review, idx) => (
            <li key={idx} className="bg-white p-2 rounded shadow">
              <p>{review.text}</p>
              <small className="text-gray-500">
                {new Date(review.date).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Reviews;
