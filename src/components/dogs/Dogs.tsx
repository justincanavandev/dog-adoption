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
  const [stateSearch, setStateSearch] = useState<State>("")

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
        setStateSearch
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
