// import LogOut from "./Logout"
// import { fiftyStates } from "../fiftyStates"
import { api } from "~/utils/api";
import { useContext, useEffect } from "react";
// import { DogsContext } from "./context/DogContext"
// import { DogSearch, DogLocationSearch } from "../types/types"
// import { Location } from "../types/types"
// import { responseCheck } from "./utils/responseCheck"
// import { handleChoiceSelection } from "./utils/handleChoice"
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
    setDogs,
    zipSearch,
    setZipSearch,
    breedSearch,
    setBreedSearch,
  } = useContext(DogContext);

  const { refetch: fetchFilteredDogs } = api.dog.getAllSearch.useQuery(
    {
      age: ageSearch,
      state: stateSearch,
      city: citySearch,
      zipCode: zipSearch,
      breed: breedSearch,
    },
    {
      enabled: false,
    },
  );

  const { data: dogById } = api.dog.getOneById.useQuery({
    id: 66213666,
  });

  console.log("dogById", dogById);



  const { mutate: addFavoriteDog } = api.favorites.create.useMutation({});

  const handleSearch = async () => {
    try {
      const response = await fetchFilteredDogs();
      const fetchedDogs = response.data;

      if (fetchedDogs) {
        setDogs(fetchedDogs);
        setAgeSearch("");
        setStateSearch("");
        setCitySearch("");
        setZipSearch("");
        setBreedSearch("");
      }
    } catch (e) {
      console.error("Unable to fetch filtered dogs", e);
    }
  };

  useEffect(() => {
    console.log("stateSearch", stateSearch);
    console.log("ageSearch", ageSearch);
  }, [stateSearch, ageSearch]);

  return (
    <div className="flex flex-col items-start">
      <h1 className="pl-4 text-[1.5rem]">Search for Dogs!</h1>
      <button
        onClick={() => {
          // const favoriteDog = { ...dogById, id: "ckja9sjja0000utdd6qpvwix5" };
          dogById &&
            addFavoriteDog({ dogId: dogById.id});
        }}
      >
        addFavoriteDog
      </button>

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
          >
            <option className="" disabled selected>
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
          >
            <option disabled selected>
              Age
            </option>
            <option value="Baby">Baby</option>
            <option value="Young">Young</option>
            <option value="Adult">Adult</option>
            <option value="Senior">Senior</option>
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
