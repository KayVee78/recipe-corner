"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./newPost.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const router = useRouter();

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedInUser");
    if (!loggedIn) {
      router.push("/login");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      userId: user._id,
      title,
      ingredients,
      instructions,
      preparationTime,
      cookingTime,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_APP_URL}/upload`, {
          method: "POST",
          body: data,
        });
      } catch (err) {}
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_APP_URL}/post`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPost),
        }
      );
      if (response.ok) {
        const responseJson = await response.json();
        console.log(responseJson);
        router.push("/recipes/" + responseJson.userId);
      } else {
        setError(true);
        setErrorText(responseJson.message);
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <textarea
            name="ingredients"
            id=""
            cols="30"
            rows="5"
            placeholder="Ingredients (separated by commas)"
            onChange={(e) => setIngredients(e.target.value)}
          ></textarea>
          <textarea
            name="instructions"
            id=""
            cols="30"
            rows="10"
            placeholder="Instructions"
            onChange={(e) => setInstructions(e.target.value)}
          ></textarea>
          <input
            type="text"
            placeholder="Preparation Time"
            name="preparation"
            onChange={(e) => setPreparationTime(e.target.value)}
          />
          <input
            type="text"
            placeholder="Cooking Time"
            name="cooking"
            onChange={(e) => setCookingTime(e.target.value)}
          />
          <button type="submit">Publish</button>
        </form>
        {error && (
          <span style={{ color: "#b71540", marginTop: "10px" }}>
            {errorText || "Something went wrong"}
          </span>
        )}
      </div>
    </div>
  );
};

export default NewPost;
