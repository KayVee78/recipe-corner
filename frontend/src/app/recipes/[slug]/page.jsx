"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "./detailedRecipePage.module.css";
import useAuth from "@/utils/useAuth";
import { useRouter } from "next/navigation";

const DetailedRecipePage = () => {
  const [updateMode, setUpdateMode] = useState(false);
  const [title, setTitle] = useState("");
  const [ingredientsList, setIngredientsList] = useState("");
  const [instructions, setInstructions] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [ratings, setRatings] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [recipeData, setRecipeData] = useState(null);
  const [publishedUser, setPublishedUser] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const router = useRouter();
  const currentPath = window.location.href;
  const recipeId = currentPath.split("/")[4];

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedInUser");
    setLoggedInUser(JSON.parse(loggedIn));
    if (!loggedIn) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    const getPostDetails = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_APP_URL}/post/${recipeId}`
      );
      const data = await response.json();
      setTitle(data.title);
      setIngredientsList(data.ingredients);
      setInstructions(data.instructions);
      setPrepTime(data.preparationTime);
      setCookTime(data.cookingTime);
      setPublishedUser(data.username);
      setRecipeData(data);
    };

    getPostDetails();
  }, [currentPath]);

  useEffect(() => {
    if (loggedInUser?.username !== publishedUser) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [loggedInUser, publishedUser]);

  const ingredientString =
    "Sliced cheese (our favorite is thick-sliced, medium cheddar),Dill pickle slices,Fresh red onions (or caramelized onions)Tomato,Green leaf or iceberg lettuce,Avocado,Bacon + pineapple + the BBQ sauce below,Jalapeños to add some heat";

  const ingredients = ingredientsList.split(",");

  return (
    <div className={styles.detailRecipe}>
      <div className={styles.detailRecipeWrapper}>
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_APP_URL}/images/${recipeData?.photo}`}
          width={500}
          height={200}
          alt=""
          className={styles.recipeImg}
        />
        {updateMode ? (
          <input
            type="text"
            value={title}
            className={styles.detailRecipeTitleInput}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className={styles.detailRecipeTitle}>
            {/* {title} */}
            {title}
            {/* {post.username === user?.username && ( */}
            <div className={styles.detailRecipeEdit}>
              <FontAwesomeIcon
                icon={faEdit}
                className={`${styles.detailRecipeIcon} ${
                  disabled ? styles.disabled : ""
                }`}
                onClick={() => setUpdateMode(true)}
                style={{ fontSize: "24px" }}
              />
              <FontAwesomeIcon
                icon={faTrashAlt}
                style={{ color: "#eb3b5a", fontSize: "24px" }}
                className={`${styles.detailRecipeIcon} ${
                  disabled ? styles.disabled : ""
                }`}
                onClick={() => console.log("Delete icon clicked")}
              />
            </div>
            {/* )} */}
          </h1>
        )}
        <div className={styles.detailRecipeInfo}>
          <span className={styles.detailRecipeAuthor}>
            Recipe by:
            {/* <Link to={`/?user=${post.username}`} className="link"> */}
            <Link href={"/test"} className="link">
              <b> {publishedUser}</b>
            </Link>
          </span>
          <span className={styles.detailRecipeDate}>
            {/* {new Date(post.createdAt).toDateString()} */}
            {/* {"2024/12/12"} */}
          </span>
        </div>
        {updateMode ? (
          <>
            <textarea
              className={styles.detailRecipeDescInput}
              value={ingredientsList}
              style={{ marginBottom: "14px" }}
              onChange={(e) => setIngredientsList(e.target.value)}
            />
            <textarea
              className={styles.detailRecipeDescInput}
              value={instructions}
              style={{ marginBottom: "14px" }}
              onChange={(e) => setInstructions(e.target.value)}
            />
            <input
              type="time"
              value={prepTime}
              className={styles.detailRecipeTitleInput}
              autoFocus
              style={{ marginBottom: "14px" }}
              onChange={(e) => setPrepTime(e.target.value)}
            />
            <input
              type="time"
              value={cookTime}
              className={styles.detailRecipeTitleInput}
              autoFocus
              style={{ marginBottom: "14px" }}
              onChange={(e) => setCookTime(e.target.value)}
            />
            <input
              type="range"
              value={ratings}
              className={styles.detailRecipeTitleInput}
              autoFocus
              style={{ marginBottom: "14px" }}
              onChange={(e) => setRatings(e.target.value)}
            />
          </>
        ) : (
          <>
            <span className={styles.titleHead}>Ingredients: </span>
            <ul>
              {ingredients.map((item, index) => (
                <li key={index}>{`◽ ${item.trim()}`}</li>
              ))}
            </ul>
            <span className={styles.titleHead}>Instructions: </span>
            <p className={styles.detailRecipeDesc}>{instructions}</p>
            <span className={styles.titleHead}>Preparation Time: </span>
            <p>{prepTime}</p>
            <span className={styles.titleHead}>Cooking Time: </span>
            <p>{cookTime}</p>
            {/* <span className={styles.titleHead}>Ratings: </span> */}
          </>
        )}
        {updateMode && (
          <button className={styles.detailRecipeButton} onClick={""}>
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default DetailedRecipePage;
