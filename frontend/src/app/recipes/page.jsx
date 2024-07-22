"use client";

import RecipeList from "../../components/recipeList/RecipeList";
import SearchBar from "../../components/searchBar/SearchBar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./recipes.module.css";

const RecipesPage = () => {
  const router = useRouter();
  const [recipesList, setRecipesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [keyword, setKeyword] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedInUser");
    if (!loggedIn) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    const getPostDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_APP_URL}/post`
        );
        if (response.ok) {
          const responseData = await response.json();
          setRecipesList(responseData);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError(true);
        setErrorText("Error fetching recipes");
      } finally {
        setLoading(false);
      }
    };

    getPostDetails();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const queryParams = new URLSearchParams({
        keyword,
        ingredients,
        category,
      }).toString();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_APP_URL}/post?${queryParams}`
      );
      if (response.ok) {
        const data = await response.json();
        setRecipesList(data);
      }
      setCategory("");
      setIngredients("");
      setKeyword("");
    } catch (err) {
      setError(true);
      setErrorText("Error fetching recipes");
    }
  };

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 relative pb-48">
      {/* SEARCH BAR */}
      <div className="mt-8 flex justify-between">
        <div className="flex gap-6 flex-wrap">
          <form className={styles.form} onSubmit={handleSearch}>
            <input
              type="text"
              name="keyword"
              placeholder="Type a keyword"
              className="text-xs text-[#000] rounded-2xl pl-2 w-80 ring-1 ring-gray-400 h-10"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <input
              type="text"
              name="ingredient"
              placeholder="Type an ingredient"
              className="text-xs text-[#000] rounded-2xl pl-2 w-50 ring-1 ring-gray-400 h-10"
              onChange={(e) => setIngredients(e.target.value)}
            />
            <select
              name="category"
              id=""
              className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#ebeded] text-[#000000] h-10"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
            <button>Search</button>
          </form>
        </div>
      </div>
      {/* RECIPE LIST */}
      <h1 className="mt-12 text-xl font-semibold mb-5"></h1>
      {recipesList.length > 0 ? (
        <RecipeList recipeList={recipesList} />
      ) : (
        <div>No recipes found!</div>
      )}

      {error && (
        <span style={{ color: "#b71540", marginTop: "10px" }}>
          {errorText || "Something went wrong"}
        </span>
      )}
    </div>
  );
};

export default RecipesPage;
