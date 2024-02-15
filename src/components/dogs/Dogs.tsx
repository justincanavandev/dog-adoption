import { useState } from "react";
import type { DogWithRelations } from "~/types/dog-types";
import { DogContext } from "~/context/DogContext";
import DogSearch from "./DogSearch";

type DogsProps = {
  allDogs: DogWithRelations[];
};

const Dogs = ({ allDogs }: DogsProps) => {
  const [dogs, setDogs] = useState<DogWithRelations[]>(allDogs);
  const [favoriteDogs, setFavoriteDogs] = useState<DogWithRelations[]>([]);
  return (
    <DogContext.Provider
      value={{
        dogs,
        setDogs,
        allDogs,
        favoriteDogs,
        setFavoriteDogs,
      }}
    >
      {/* <SearchInputs /> */}
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
