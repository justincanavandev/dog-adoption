import { useState, useEffect } from "react";
import type { DogWithRelations, Age, State } from "~/types/dog-types";
import { DogContext } from "~/context/DogContext";
import DogResults from "./DogResults";
import SearchInputs from "./SearchInputs";
import type { Session } from "next-auth";
import type { UserWithRelations } from "~/types/dog-types";

type DogsProps = {
  allDogs: DogWithRelations[];
  favorites: DogWithRelations[];
  sessionData: Session | null;
  currentUser: UserWithRelations | undefined;
};

const Dogs = ({ allDogs, favorites, sessionData, currentUser }: DogsProps) => {

  const [dogs, setDogs] = useState<DogWithRelations[]>(allDogs);
  // const [favoriteDogs, setFavoriteDogs] = useState<DogWithRelations[]>([]);
  const [favoriteDogs, setFavoriteDogs] = useState<DogWithRelations[]>([]);
  const [ageSearch, setAgeSearch] = useState<Age>("");
  const [stateSearch, setStateSearch] = useState<State>("");
  const [citySearch, setCitySearch] = useState<string>("");
  const [zipSearch, setZipSearch] = useState<string>("");
  const [breedSearch, setBreedSearch] = useState<string>("");

  useEffect(() => {
    if (currentUser?.favorites) {
      setFavoriteDogs(favorites);
    }
  }, [favorites, setFavoriteDogs, currentUser]);

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
        sessionData,
        currentUser,
      }}
    >
      <SearchInputs />
      {/* {errorMessage && (
        <div className="mt-4 w-full text-center">{errorMessage}</div>
      )} */}
      {/* {matchedDog.id && <MatchedDog />} */}
      {/* {favoriteDogObjects.length > 0 && <FavoriteDogs />} */}

      <DogResults />
    </DogContext.Provider>
  );
};
export default Dogs;
