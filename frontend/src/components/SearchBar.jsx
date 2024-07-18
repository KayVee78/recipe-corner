const SearchBar = () => {
  return (
    <div className="mt-8 flex justify-between">
      <div className="flex gap-6 flex-wrap">
        <input
          type="text"
          name="keyword"
          placeholder="Type a keyword"
          className="text-xs text-[#000] rounded-2xl pl-2 w-80 ring-1 ring-gray-400 h-10"
        />
        <input
          type="text"
          name="ingredient"
          placeholder="Type an ingredient"
          className="text-xs text-[#000] rounded-2xl pl-2 w-50 ring-1 ring-gray-400 h-10"
        />
        <select
          name="category"
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#ebeded] text-[#000000] h-10"
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
