"use client"

import RecipeList from "../../components/RecipeList";
import SearchBar from "../../components/SearchBar";

const RecipesPage = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 relative pb-48">
      {/* SEARCH BAR */}
      <SearchBar />
      {/* RECIPE LIST */}
      <h1 className="mt-12 text-xl font-semibold mb-5">Search Results!</h1>
      <RecipeList />
    </div>
  );
};

export default RecipesPage;
