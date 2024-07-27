"use client";

import Link from "next/link";
import Image from "next/image";

const RecipeList = ({ recipeList }) => {
  const recipes = recipeList;
  return (
    <div className="flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {recipes.map((recipe) => (
        <div
          key={recipe._id}
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
        >
          <div className="relative w-full h-60">
            {recipe.photo && (
              <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_APP_URL}/images/${recipe.photo}`}
              alt=""
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md z-10 hover:opacity-80"
            />
            )}
          </div>
          <div className="flex  items-center justify-center">
            <span className="font-medium text-[#FFFF00]">{recipe.title}</span>
          </div>
          {/* <div className="text-sm text-[#ffffff] flex items-center justify-center">
            Description
          </div> */}
          <div className="flex items-center justify-center">
            <Link href={`/recipes/${recipe?._id}`}>
              <button className=" rounded-2xl ring-1 ring-[#9efff2] w-max py-2 px-4 text-xs text-[#fff] hover:bg-[#30CFAC] hover:text-black">
                View Recipe
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
