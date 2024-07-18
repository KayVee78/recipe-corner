"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "./detailedRecipePage.module.css";

const DetailedRecipePage = () => {
  const [updateMode, setUpdateMode] = useState(false);
  const [title, setTitle] = useState("");
  const [ingredientsList, setIngredientsList] = useState("");
  const [instructions, setInstructions] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [ratings, setRatings] = useState("");

  const ingredientString =
    "Sliced cheese (our favorite is thick-sliced, medium cheddar),Dill pickle slices,Fresh red onions (or caramelized onions)Tomato,Green leaf or iceberg lettuce,Avocado,Bacon + pineapple + the BBQ sauce below,Jalapeños to add some heat";

  const ingredients = ingredientString.split(",");

  return (
    <div className={styles.detailRecipe}>
      <div className={styles.detailRecipeWrapper}>
        <Image
          src="/home2.png"
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
            {"Perfect Hamburger Recipe"}
            {/* {post.username === user?.username && ( */}
            <div className={styles.detailRecipeEdit}>
              <FontAwesomeIcon
                icon={faEdit}
                className={styles.detailRecipeIcon}
                onClick={() => setUpdateMode(true)}
                style={{ fontSize: "24px" }}
              />
              <FontAwesomeIcon
                icon={faTrashAlt}
                style={{ color: "#eb3b5a", fontSize: "24px" }}
                className={styles.detailRecipeIcon}
                onClick={() => console.log("Delete icon clicked")}
              />
            </div>
            {/* )} */}
          </h1>
        )}
        <div className={styles.detailRecipeInfo}>
          <span className={styles.detailRecipeAuthor}>
            Author:
            {/* <Link to={`/?user=${post.username}`} className="link"> */}
            <Link href={"/test"} className="link">
              <b> Mary Fernando</b>
            </Link>
          </span>
          <span className={styles.detailRecipeDate}>
            {/* {new Date(post.createdAt).toDateString()} */}
            {"2024/12/12"}
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
            <p className={styles.detailRecipeDesc}>
              Preheat oven to 200°C. Preheat grill on high. Spray a large baking
              tray with olive oil spray to lightly grease. Place the capsicum,
              skin-side up, on the prepared tray. Lightly spray with olive oil
              spray. Cook under grill for 5 minutes or until charred and
              blistered.
            </p>
            <span className={styles.titleHead}>Preparation Time: </span>
            <p>1 hour</p>
            <span className={styles.titleHead}>Cooking Time: </span>
            <p>3 hours</p>
            <span className={styles.titleHead}>Ratings: </span>
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
