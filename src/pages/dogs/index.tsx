import DogSearch from "~/components/all-dogs/DogSearch";
import { api } from "~/utils/api";
import { useState, useEffect } from "react";
import { DogContext } from "~/context/DogContext";
import Spinner from "~/components/Spinner";
import type { DogWithRelations } from "~/types/dog-types";

const DogPage = () => {
  const [dogs, setDogs] = useState<DogWithRelations[]>([]);
  const {
    data: allDogs,
    isLoading: isDogsLoading,
    isSuccess: isDogsSuccess,
    isError: isDogsError,
  } = api.dog.getAll.useQuery();

  useEffect(() => {
    if (isDogsSuccess && !isDogsLoading && dogs) {
      if (allDogs) {
        console.log('allDogs', allDogs)
        setDogs(allDogs);
      }
    }
  }, [isDogsSuccess, isDogsLoading, allDogs, dogs]);

  return (
    <DogContext.Provider
      value={{
        dogs,
        setDogs,
        allDogs,
        isDogsLoading,
        isDogsSuccess,
        isDogsError,
      }}
    >
      {isDogsLoading && <Spinner />}
      <div className="mt-4 flex flex-col gap-2 ">
        {/* <SearchInputs /> */}

        {/* {errorMessage && (
        <div className="mt-4 w-full text-center">{errorMessage}</div>
      )} */}
        {/* {matchedDog.id && <MatchedDog />} */}
        {/* {favoriteDogObjects.length > 0 && <FavoriteDogs />} */}

        {/* {filteredDogs.length > 0 && <DogSearch />} */}
        <DogSearch />
      </div>
    </DogContext.Provider>
  );
};

export default DogPage;
