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
  const { ageSearch, setAgeSearch, stateSearch, setStateSearch, setDogs } =
    useContext(DogContext);

  //   const {
  //     breedSearch,
  //     setBreedSearch,
  //     citySearch,
  //     setCitySearch,
  //     zipSearch,
  //     setZipSearch,
  //     stateSearch,
  //     setStateSearch,
  //     ageMin,
  //     setAgeMin,
  //     ageMax,
  //     setAgeMax,
  //     favoriteDogsIds,
  //     currentPage,
  //     setCurrentPage,
  //     sortChoice,
  //     setSortChoice,
  //     setTotal,
  //     setNextParams,
  //     setErrorMessage,
  //     setZipCodeArr,
  //     fetchLocations,
  //     fetchDogObjects,
  //     searchByLocation,
  //   } = useContext(DogsContext)

  // const handleSearch = async () => {
  //   // if (currentPage !== 0) {
  //   //   setCurrentPage(0)
  //   // }

  //   const params: DogSearch = {};

  //   if (breedSearch) {
  //     params.breeds = [breedSearch];
  //   }
  //   if (zipSearch) {
  //     params.zipCodes = [zipSearch];
  //     try {
  //       let locations = await fetchLocations([zipSearch]);
  //       setZipCodeArr(locations);
  //     } catch (error) {
  //       console.error("Couldn't fetch locations!", error);
  //     }
  //   }
  //   if (ageMin) {
  //     if (typeof ageMin === "string") {
  //       params.ageMin = parseInt(ageMin);
  //     } else {
  //       params.ageMin = ageMin;
  //     }
  //   }
  //   if (ageMax) {
  //     if (typeof ageMax === "string") {
  //       params.ageMax = parseInt(ageMax);
  //     } else {
  //       params.ageMax = ageMax;
  //     }
  //   }
  //   if (sortChoice) {
  //     params.sort = `breed:${sortChoice}`;
  //   }

  //   //there was a CORS issue when sending an array of multiple zip codes so I had to take this functionality out.

  //   if (citySearch || stateSearch) {
  //     try {
  //       const filteredZips: string[] | undefined =
  //         await handleSearchByLocation();

  //       params.zipCodes = filteredZips;

  //       if (filteredZips) {
  //         await fetchLocations(filteredZips);
  //       }
  //     } catch (error) {
  //       console.error("Couldn't fetch locations", error);
  //     }
  //   }

  //   const response = await search(params);

  //   if (response) {
  //     const isResponse200 = responseCheck(response);
  //     if (isResponse200) {
  //       setTotal(response.data.total);
  //       setNextParams(response.data.next);
  //       fetchDogObjects(response.data.resultIds);
  //       if (response.data.total === 0) {
  //         setErrorMessage("No Dogs Found :(");
  //       }
  //       if (response.data.total > 0) {
  //         setErrorMessage("");
  //       }
  //     }

  //     if (!response.status) {
  //       throw new Error("Fetch request failed!");
  //     }
  //   }
  // };

  // const handleSearchByLocation: () => Promise<
  //   string[] | undefined
  // > = async () => {
  //   const params: DogLocationSearch = {
  //     size: 10000,
  //     from: currentPage * 25,
  //   };

  //   if (citySearch) {
  //     params.city = citySearch;
  //   }
  //   if (stateSearch) {
  //     params.states = [stateSearch];
  //   }

  //   const response = await searchByLocation(params);

  //   if (response) {
  //     const isResponse200: boolean = responseCheck(response);
  //     if (isResponse200) {
  //       let zipCodes: string[] = response.data.results.map(
  //         (location: Location) => location.zip_code,
  //       );

  //       return zipCodes;
  //     }
  //   }
  // };

  // const handleSearch = () => {

  // }
  const {
    // data: filteredDogs,
    // isSuccess: isFilteredSuccess,
    refetch: fetchFilteredDogs,
  } = api.dog.getAllSearch.useQuery(
    {
      age: ageSearch,

      state: stateSearch,
    },
    {
      // enabled: ageSearch.length > 0,
      enabled: false,
    },
  );

  const handleChoice = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    console.log("value", value);
    // setDogs(filteredDogs)
  };

  // useEffect(() => {
  //   console.log("isFilteredSuccess", isFilteredSuccess);
  //   if (isFilteredSuccess && filteredDogs) {
  //     console.log("filteredDogs", filteredDogs);
  //     setDogs(filteredDogs);
  //   }
  // }, [isFilteredSuccess, filteredDogs, setDogs]);

  // useEffect(() => {
  //   console.log("filteredDogs", filteredDogs);
  // }, [filteredDogs]);

  const handleSearch = async () => {
    try {
      const response = await fetchFilteredDogs();
      const fetchedDogs = response.data;

      if (fetchedDogs) {
        console.log("fetchedDogs", fetchedDogs);
        setDogs(fetchedDogs);
        // setAgeSearch("")
        // setStateSearch("")
      }
    } catch (e) {
      console.error("Unable to fetch filtered dogs", e)
    }
  };

  useEffect(() => {
    console.log("stateSearch", stateSearch);
    console.log("ageSearch", ageSearch);
  }, [stateSearch, ageSearch]);

  return (
    <div className="flex flex-col items-start">
      <h1 className="pl-4 text-[1.5rem]">Search for Dogs!</h1>

      <>
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          <input
            className="border-2 border-black "
            type="text"
            placeholder="Breed"
            // value={breedSearch}
            // onChange={(e) => setBreedSearch(e.target.value)}
          />
          <input
            className="border-2 border-black"
            type="text"
            placeholder="City"
            // value={citySearch}
            // onChange={(e) => setCitySearch(e.target.value)}
          />
          <input
            className="border-2 border-black"
            type="text"
            placeholder="Zip Code"
            // value={zipSearch}
            // onChange={(e) => setZipSearch(e.target.value)}
          />
          <select
            className="border-2 border-black"
            value={stateSearch}
            onChange={(e) =>
              isStateValid(e.target.value) && setStateSearch(e.target.value)
            }
          >
            <option className="" disabled selected>
              State
            </option>
            {fiftyStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => {
              isAgeValid(e.target.value) && setAgeSearch(e.target.value);
              console.log('e.target', e.target.value)
              handleChoice(e);
            }}
            className="w-36 border-2 border-black"
          >
            <option value="" disabled selected>
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
