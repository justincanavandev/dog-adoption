import { useContext } from "react";
import { fiftyStates } from "~/utils/helpers";
import { DogContext } from "~/context/DogContext";
import { isAgeValid } from "~/utils/type-guards";
import { isStateValid } from "~/utils/type-guards";


const SearchInputs = () => {
  const {
    ageSearch,
    setAgeSearch,
    stateSearch,
    setStateSearch,
    citySearch,
    setCitySearch,
    zipSearch,
    setZipSearch,
    breedSearch,
    setBreedSearch,
    setSearchTerms,
    setCurrentPage,
    searchLimit,
    setSearchLimit
  } = useContext(DogContext);

  const handleSearch = async () => {
    setCurrentPage(0);
    setSearchTerms({
      limit: searchLimit,
      age: ageSearch,
      state: stateSearch,
      city: citySearch,
      zipCode: zipSearch,
      breed: breedSearch,
      
    });

  };

  return (
    <div className="flex flex-col items-start">
      <h1 className="pl-4 text-[1.5rem]">Search for Dogs!</h1>
      {/* <button
        onClick={() => {
          // const favoriteDog = { ...dogById, id: "ckja9sjja0000utdd6qpvwix5" };
          // dogById &&
          //   addFavoriteDog({ dogId: dogById.id});
        }}
      >
        Add Favorite Dog
      </button> */}

      <>
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          <input
            className="border-2 border-black "
            type="text"
            placeholder="Breed"
            value={breedSearch}
            onChange={(e) => setBreedSearch(e.target.value)}
          />
          <input
            className="border-2 border-black"
            type="text"
            placeholder="City"
            value={citySearch}
            onChange={(e) => setCitySearch(e.target.value)}
          />
          <input
            className="border-2 border-black"
            type="text"
            placeholder="Zip Code"
            value={zipSearch}
            onChange={(e) => setZipSearch(e.target.value)}
          />
          <select
            className="border-2 border-black"
            onChange={(e) =>
              isStateValid(e.target.value) && setStateSearch(e.target.value)
            }
            defaultValue="State"
          >
            <option className="" disabled>
              State
            </option>
            {fiftyStates.map(
              (state) =>
                state.length > 0 && (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ),
            )}
          </select>
          <select
            onChange={(e) => {
              isAgeValid(e.target.value) && setAgeSearch(e.target.value);
            }}
            className="w-36 border-2 border-black"
            defaultValue="Age"
          >
            <option disabled>Age</option>
            <option value="Baby">Baby</option>
            <option value="Young">Young</option>
            <option value="Adult">Adult</option>
            <option value="Senior">Senior</option>
          </select>
          <select onChange={(e)=> {
            setSearchLimit(Number(e.target.value))
          }} defaultValue={5} className="border-2 border-black">
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
          <div className="flex w-full justify-center">
            <button
              className="w-24 border-2 border-black"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </>
    </div>
  );
};

export default SearchInputs;
