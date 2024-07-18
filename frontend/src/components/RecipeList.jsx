import Link from "next/link";
import Image from "next/image";

const RecipeList = () => {
  return (
    <div className="flex gap-x-8 gap-y-16 justify-between flex-wrap">
      <Link
        href="/test"
        className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
      >
        <div className="relative w-full h-60">
          <Image
            src="https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-80"
          />
        </div>
        <div className="flex  items-center justify-center">
          <span className="font-medium text-[#FFFF00]">Recipe Name</span>
        </div>
        <div className="text-sm text-[#ffffff] flex items-center justify-center">
          Description
        </div>
        <div className="flex items-center justify-center">
          <Link href={`/test`}>
            <button className=" rounded-2xl ring-1 ring-[#9efff2] w-max py-2 px-4 text-xs text-[#fff] hover:bg-[#30CFAC] hover:text-black">
              View Recipe
            </button>
          </Link>
        </div>
      </Link>
      <Link
        href="/test"
        className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
      >
        <div className="relative w-full h-60">
          <Image
            src="https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-80"
          />
        </div>
        <div className="flex  items-center justify-center">
          <span className="font-medium text-[#FFFF00]">Recipe Name</span>
        </div>
        <div className="text-sm text-[#ffffff] flex items-center justify-center">
          Description
        </div>
        <div className="flex items-center justify-center">
          <button className=" rounded-2xl ring-1 ring-[#9efff2] w-max py-2 px-4 text-xs text-[#fff] hover:bg-[#30CFAC] hover:text-black">
            View Recipe
          </button>
        </div>
      </Link>
      <Link
        href="/test"
        className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
      >
        <div className="relative w-full h-60">
          <Image
            src="https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-80"
          />
        </div>
        <div className="flex  items-center justify-center">
          <span className="font-medium text-[#FFFF00]">Recipe Name</span>
        </div>
        <div className="text-sm text-[#ffffff] flex items-center justify-center">
          Description
        </div>
        <div className="flex items-center justify-center">
          <button className=" rounded-2xl ring-1 ring-[#9efff2] w-max py-2 px-4 text-xs text-[#fff] hover:bg-[#30CFAC] hover:text-black">
            View Recipe
          </button>
        </div>
      </Link>
      <Link
        href="/test"
        className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
      >
        <div className="relative w-full h-60">
          <Image
            src="https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-80"
          />
        </div>
        <div className="flex  items-center justify-center">
          <span className="font-medium text-[#FFFF00]">Recipe Name</span>
        </div>
        <div className="text-sm text-[#ffffff] flex items-center justify-center">
          Description
        </div>
        <div className="flex items-center justify-center">
          <button className=" rounded-2xl ring-1 ring-[#9efff2] w-max py-2 px-4 text-xs text-[#fff] hover:bg-[#30CFAC] hover:text-black">
            View Recipe
          </button>
        </div>
      </Link>
      <Link
        href="/test"
        className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
      >
        <div className="relative w-full h-60">
          <Image
            src="https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-80"
          />
        </div>
        <div className="flex  items-center justify-center">
          <span className="font-medium text-[#FFFF00]">Recipe Name</span>
        </div>
        <div className="text-sm text-[#ffffff] flex items-center justify-center">
          Description
        </div>
        <div className="flex items-center justify-center">
          <button className=" rounded-2xl ring-1 ring-[#9efff2] w-max py-2 px-4 text-xs text-[#fff] hover:bg-[#30CFAC] hover:text-black">
            View Recipe
          </button>
        </div>
      </Link>
    </div>
  );
};

export default RecipeList;
