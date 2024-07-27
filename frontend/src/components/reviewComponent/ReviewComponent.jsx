"use client";

import { useEffect, useState } from "react";
import styles from "./review.module.css";

export const ReviewComponent = ({ loggedInUser, recipeId }) => {
  //   const reviews = [
  //     {
  //       username: "johnDoe",
  //       review:
  //         "This recipe was fantastic! The flavors were well balanced and my family loved it. Will definitely make it again.",
  //     },
  //     {
  //       username: "janeSmith",
  //       review:
  //         "The instructions were clear and easy to follow. However, I found the dish a bit too salty for my taste.",
  //     },
  //     {
  //       username: "foodieQueen",
  //       review:
  //         "Absolutely delicious! I added a bit more garlic and it was perfect. Highly recommend this recipe.",
  //     },
  //     {
  //       username: "chefMike",
  //       review:
  //         "Good recipe, but it took me longer to prep than expected. The end result was worth it though!",
  //     },
  //     {
  //       username: "homeCook123",
  //       review:
  //         "I loved this recipe! It was easy to make and the ingredients were readily available. Will be adding it to my regular rotation.",
  //     },
  //     {
  //       username: "veganVibes",
  //       review:
  //         "I substituted the meat with tofu and it turned out great. This recipe is very versatile!",
  //     },
  //     {
  //       username: "spicyLover",
  //       review:
  //         "Perfect blend of spices! If you love a bit of heat, this recipe is for you.",
  //     },
  //     {
  //       username: "sweetTooth",
  //       review:
  //         "The dish was good, but I think it could use a bit more sweetness. I’ll try adding honey next time.",
  //     },
  //     {
  //       username: "healthyEater",
  //       review:
  //         "I appreciated the healthy ingredients in this recipe. It was both nutritious and tasty!",
  //     },
  //     {
  //       username: "gourmetGuru",
  //       review:
  //         "A gourmet delight! The combination of flavors was exquisite. Definitely a recipe for special occasions.",
  //     },
  //   ];
  const [reviewsList, setReviewsList] = useState([]);
  const [review, setReview] = useState("");
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    const getReviewsList = async () => {
      try {
        if (recipeId) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_APP_URL}/review/${recipeId}`
          );
          if (response.ok) {
            const responseData = await response.json();
            setReviewsList(responseData);
          }
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError(true);
        setErrorText("Error fetching reviews!");
      }
    };

    getReviewsList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const newReview = {
        username: loggedInUser.username,
        review: review,
        recipeId: recipeId,
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_APP_URL}/review`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newReview),
        }
      );
      if (response.ok) {
        setReview("");
        setReviewsList([...reviewsList, newReview]);
      } else {
        setError(true);
        setErrorText(responseJson.message);
      }
      const responseJson = await response.json();
    } catch (err) {
      setError(true);
    }
  };

  return (
    <>
      <span className={styles.reviewTitle}>Post Your Review Here! </span>
      <textarea
        className={styles.review}
        style={{ marginBottom: "14px", marginTop: "14px" }}
        onChange={(e) => setReview(e.target.value)}
      ></textarea>
      <button className={styles.reviewButton} onClick={handleSubmit}>
        Publish Reviews
      </button>
      {reviewsList.map((review, index) => (
        <div style={{ marginBottom: "15px" }} key={index}>
          <span className={styles.reviewAuthor}>
            Review by:
            <b>&nbsp;{review.username}</b>
          </span>
          <span>
            <p className={styles.reviewText}>{review.review}</p>
          </span>
        </div>
      ))}
      {error && (
        <span style={{ color: "#b71540", marginTop: "10px" }}>
          {errorText || "Something went wrong!"}
        </span>
      )}
    </>
  );
};
