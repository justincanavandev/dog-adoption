import {
  useState,
  useEffect,
  useCallback,
} from "react";
import type { DogWithRelations, Age, State } from "~/types/dog-types";
import { DogContext } from "~/context/DogContext";
import DogResults from "./DogResults";
import SearchInputs from "./SearchInputs";
import type { Session } from "next-auth";
import type { UserWithRelations } from "~/types/dog-types";
import { api } from "~/utils/api";

type DogsProps = {
  favorites: DogWithRelations[];
  sessionData: Session | null;
  currentUser: UserWithRelations | undefined;
};

const Dogs = ({ favorites, sessionData, currentUser }: DogsProps) => {
  const [dogs, setDogs] = useState<DogWithRelations[]>([]);
  const [favoriteDogs, setFavoriteDogs] = useState<DogWithRelations[]>([]);
  const [ageSearch, setAgeSearch] = useState<Age>("");
  const [stateSearch, setStateSearch] = useState<State>("");
  const [citySearch, setCitySearch] = useState<string>("");
  const [zipSearch, setZipSearch] = useState<string>("");
  const [breedSearch, setBreedSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);

  const favDogIds = currentUser?.favorites ? currentUser.favorites.dogIds : [];

  const {
    data: dogData,
    // isLoading: isDogsLoading,
    // isSuccess: isDogsSuccess,
    // isError: isDogsError,
    refetch: refetchDogs,
    fetchNextPage,
  } = api.dog.getAllSearch.useInfiniteQuery(
    {
      limit: 10,
      age: ageSearch,
      state: stateSearch,
      city: citySearch,
      zipCode: zipSearch,
      breed: breedSearch,
    },
    {
      getNextPageParam: (prevPage) => prevPage?.nextCursor,
      enabled: false,
    },
  );

  const refetch = useCallback(async () => {
    const response = await refetchDogs();
    const filteredDogs = response.data?.pages[currentPage]?.dogs;
    if (filteredDogs) {
      setDogs(filteredDogs);
    }
  }, [currentPage, refetchDogs, setDogs]);

  useEffect(() => {
    void refetch();
  }, [refetch]);

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
        favDogIds,
        currentPage,
        setCurrentPage,
        dogData,
        refetchDogs,
        fetchNextPage,
      }}
    >
      {/* <Search /> */}
      <SearchInputs />
      {/* {errorMessage && (
        <div className="mt-4 w-full text-center">{errorMessage}</div>
      )} */}
      {/* {matchedDog.id && <MatchedDog />} */}
      {/* {favoriteDogObjects.length > 0 && <FavoriteDogs />} */}
      {/* {isPaginationLoading && <Spinner />}
      {paginatedDogData && !isPaginationLoading && isPaginationSuccess && ( */}
      <DogResults />
    </DogContext.Provider>
  );
};
export default Dogs;
