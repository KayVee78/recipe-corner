"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./newPost.module.css";
import useAuth from "@/utils/useAuth";

const NewPost = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form className={styles.form} action={""}>
          <input type="text" placeholder="Title" name="title" />
          <input type="file" />
          <textarea
            name="ingredients"
            id=""
            cols="30"
            rows="5"
            placeholder="Ingredients (separated by commas)"
          ></textarea>
          <textarea
            name="instructions"
            id=""
            cols="30"
            rows="10"
            placeholder="Instructions"
          ></textarea>
          <input
            type="text"
            placeholder="Preparation Time"
            name="preparation"
          />
          <input type="text" placeholder="Cooking Time" name="cooking" />
          <button>Publish</button>
        </form>
      </div>
    </div>
  );
};

export default useAuth(NewPost);
