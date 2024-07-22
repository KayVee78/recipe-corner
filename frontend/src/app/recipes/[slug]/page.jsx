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
import { ReviewComponent } from "@/components/reviewComponent/ReviewComponent";

const DetailedRecipePage = () => {
  const [updateMode, setUpdateMode] = useState(false);
  const [title, setTitle] = useState("");
  const [ingredientsList, setIngredientsList] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [ratings, setRatings] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [recipeData, setRecipeData] = useState(null);
  const [publishedUser, setPublishedUser] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

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
      setIngredientsList(data?.ingredients.split(","));
      setInstructions(data.instructions);
      setPrepTime(data.preparationTime);
      setCookTime(data.cookingTime);
      setPublishedUser(data.username);
      setRecipeData(data);

      // setIngredientsArr(ingredientsList.split(","));
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

  const handleUpdate = async () => {
    try {
      const updatedData = {
        title,
        ingredients: ingredientsList,
        instructions,
        preparationTime: prepTime,
        cookingTime: cookTime,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_APP_URL}/post/${recipeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setTitle(data.title);
        setIngredientsList(data.ingredients.split(","));
        setInstructions(data.instructions);
        setCookTime(data.cookingTime);
        setPrepTime(data.preparationTime);
        setUpdateMode(false);
      } else {
        setError(true);
        setErrorText(data.message);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_APP_URL}/post/${recipeId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        window.location.replace("/recipes");
      } else {
        setError(true);
        setErrorText(data.message);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  const ingredientString =
    "Sliced cheese (our favorite is thick-sliced, medium cheddar),Dill pickle slices,Fresh red onions (or caramelized onions)Tomato,Green leaf or iceberg lettuce,Avocado,Bacon + pineapple + the BBQ sauce below,Jalapeños to add some heat";

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
                onClick={handleDelete}
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
              type="text"
              value={prepTime}
              className={styles.detailRecipeTitleInput}
              autoFocus
              style={{ marginBottom: "14px" }}
              onChange={(e) => setPrepTime(e.target.value)}
            />
            <input
              type="text"
              value={cookTime}
              className={styles.detailRecipeTitleInput}
              autoFocus
              style={{ marginBottom: "14px" }}
              onChange={(e) => setCookTime(e.target.value)}
            />
          </>
        ) : (
          <>
            <span className={styles.titleHead}>Ingredients: </span>
            <ul>
              {ingredientsList.map((item, index) => (
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
          <button className={styles.detailRecipeButton} onClick={handleUpdate}>
            Update
          </button>
        )}
        {error && (
          <span style={{ color: "#b71540", marginTop: "10px" }}>
            {errorText || "Something went wrong"}
          </span>
        )}
        <br />
        <ReviewComponent />
      </div>
    </div>
  );
};

export default DetailedRecipePage;
