/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState, useEffect } from "react";
import type {
  DogWithRelations,
  Age,
  State,
  SearchTerms,
  // DogData,
} from "~/types/dog-types";
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
  const [favoriteDogs, setFavoriteDogs] = useState<DogWithRelations[]>([]);
  const [ageSearch, setAgeSearch] = useState<Age>("");
  const [stateSearch, setStateSearch] = useState<State>("");
  const [citySearch, setCitySearch] = useState<string>("");
  const [zipSearch, setZipSearch] = useState<string>("");
  const [breedSearch, setBreedSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchLimit, setSearchLimit] = useState(5);
  const [searchTerms, setSearchTerms] = useState<SearchTerms>({
    limit: 5,
    age: "",
    state: "",
    city: "",
    zipCode: "",
    breed: "",
  });

  const favDogIds = currentUser?.favorites ? currentUser.favorites.dogIds : [];

  const {
    data: dogData,
    isLoading: isDogsLoading,
    isSuccess: isDogsSuccess,
    isError: isDogsError,
    isFetchingNextPage,
    fetchNextPage,
  } = api.dog.getAllSearch.useInfiniteQuery(
    {
      limit: searchTerms.limit,
      age: searchTerms.age,
      state: searchTerms.state,
      city: searchTerms.city,
      zipCode: searchTerms.zipCode,
      breed: searchTerms.breed,
    },
    {
      getNextPageParam: (prevPage) => prevPage?.nextCursor,
      staleTime: 60 * 5000,
    },
  );
  console.log('currentUser Dogs comp', currentUser)

  useEffect(() => {
    if (currentUser?.favorites) {
      setFavoriteDogs(favorites);
    }
  }, [favorites, setFavoriteDogs, currentUser]);

  return (
    <DogContext.Provider
      value={{
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
        fetchNextPage,
        isDogsLoading,
        isDogsSuccess,
        isDogsError,
        dogData,
        searchTerms,
        setSearchTerms,
        searchLimit,
        setSearchLimit,
        isFetchingNextPage,
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
