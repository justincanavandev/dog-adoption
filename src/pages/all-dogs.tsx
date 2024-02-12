import DogSearch from "~/components/all-dogs/DogSearch";

const AllDogs = () => {
  return (
    <div className="mt-4 flex flex-col gap-2 ">
      {/* <SearchInputs /> */}

      {/* {errorMessage && (
        <div className="mt-4 w-full text-center">{errorMessage}</div>
      )} */}
      {/* {matchedDog.id && <MatchedDog />} */}
      {/* {favoriteDogObjects.length > 0 && <FavoriteDogs />} */}

      {/* {filteredDogs.length > 0 && <DogSearch />} */}
      <DogSearch/>
    </div>
  );
};

export default AllDogs;
