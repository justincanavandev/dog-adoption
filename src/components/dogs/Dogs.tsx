import { useState } from "react";
import type { DogWithRelations, Age, State } from "~/types/dog-types";
import { DogContext } from "~/context/DogContext";
import DogSearch from "./DogSearch";
import SearchInputs from "./SearchInputs";

type DogsProps = {
  allDogs: DogWithRelations[];
};

const Dogs = ({ allDogs }: DogsProps) => {
  const [dogs, setDogs] = useState<DogWithRelations[]>(allDogs);
  const [favoriteDogs, setFavoriteDogs] = useState<DogWithRelations[]>([]);
  const [ageSearch, setAgeSearch] = useState<Age>("");
  const [stateSearch, setStateSearch] = useState<State>("");
  const [citySearch, setCitySearch] = useState<string>("");
  const [zipSearch, setZipSearch] = useState<string>("");
  const [breedSearch, setBreedSearch] = useState<string>("");

  return (
    <DogContext.Provider
      value={{
        dogs,
        setDogs,
        allDogs,
        favoriteDogs,
        setFavoriteDogs,
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
      }}
    >
      <SearchInputs />
      {/* {errorMessage && (
        <div className="mt-4 w-full text-center">{errorMessage}</div>
      )} */}
      {/* {matchedDog.id && <MatchedDog />} */}
      {/* {favoriteDogObjects.length > 0 && <FavoriteDogs />} */}

      {/* {filteredDogs.length > 0 && <DogSearch />} */}
      <DogSearch />
    </DogContext.Provider>
  );
};
export default Dogs;
