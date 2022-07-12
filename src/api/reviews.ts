import db from "../fierbase";

export const saveReview = async (reviewData) => {
  await db.collection("reviews").add(reviewData);
  const productRef = db.collection("products").doc(reviewData.product);
  const productDoc = await productRef.get();
  let { rating, rateCount, trueRating } = productDoc.data();
  rateCount = rateCount || 0;
  rating = rating || 0;
  trueRating = trueRating || 0;
  trueRating = (trueRating * rateCount + reviewData.rating) / (rateCount + 1);
  const newRating = Math.ceil(trueRating);
  await productRef.update({
    rating: newRating,
    rateCount: rateCount + 1,
    trueRating: trueRating,
  });
  alert("saved");
};

export const loadreviews = async (productID) => {
  return db
    .collection("reviews")
    .where("product", "==", productID)
    .get();
};
