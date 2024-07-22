import styles from "./review.module.css";

export const ReviewComponent = ({ review }) => {
  const reviews = [
    {
      username: "johnDoe",
      review:
        "This recipe was fantastic! The flavors were well balanced and my family loved it. Will definitely make it again.",
    },
    {
      username: "janeSmith",
      review:
        "The instructions were clear and easy to follow. However, I found the dish a bit too salty for my taste.",
    },
    {
      username: "foodieQueen",
      review:
        "Absolutely delicious! I added a bit more garlic and it was perfect. Highly recommend this recipe.",
    },
    {
      username: "chefMike",
      review:
        "Good recipe, but it took me longer to prep than expected. The end result was worth it though!",
    },
    {
      username: "homeCook123",
      review:
        "I loved this recipe! It was easy to make and the ingredients were readily available. Will be adding it to my regular rotation.",
    },
    {
      username: "veganVibes",
      review:
        "I substituted the meat with tofu and it turned out great. This recipe is very versatile!",
    },
    {
      username: "spicyLover",
      review:
        "Perfect blend of spices! If you love a bit of heat, this recipe is for you.",
    },
    {
      username: "sweetTooth",
      review:
        "The dish was good, but I think it could use a bit more sweetness. I’ll try adding honey next time.",
    },
    {
      username: "healthyEater",
      review:
        "I appreciated the healthy ingredients in this recipe. It was both nutritious and tasty!",
    },
    {
      username: "gourmetGuru",
      review:
        "A gourmet delight! The combination of flavors was exquisite. Definitely a recipe for special occasions.",
    },
  ];

  return (
    <>
      <span className={styles.reviewTitle}>Post Your Review Here! </span>
      <textarea
        className={styles.review}
        style={{ marginBottom: "14px", marginTop: "14px" }}
      ></textarea>
      <button className={styles.reviewButton}>Publish Reviews</button>
      {reviews.map((review, index) => (
        <div style={{ marginBottom: "15px" }}>
          <span className={styles.reviewAuthor}>
            Recipe by:
            <b>&nbsp;{review.username}</b>
          </span>
          <span>
            <p className={styles.reviewText}>{review.review}</p>
          </span>
        </div>
      ))}
    </>
  );
};
