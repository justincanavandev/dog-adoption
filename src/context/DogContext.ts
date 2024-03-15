import { createContext } from "react";
import type {
  DogWithRelations,
  Age,
  State,
  SearchTerms,
  // DogData,
} from "~/types/dog-types";
import type { SetStateAction, MutableRefObject} from "react";
import type { Session } from "next-auth";
import type { UserWithRelations } from "~/types/dog-types";
import type {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  // RefetchOptions,
  // RefetchQueryFilters,
  // QueryObserverResult,
  InfiniteData,
} from "@tanstack/react-query";
import type { TRPCClientErrorLike } from "@trpc/client";
import type { TRPCErrorShape } from "@trpc/server/rpc";

export type DogContextType = {
  favoriteDogs: DogWithRelations[];
  ageSearch: Age | "Age";
  setAgeSearch: React.Dispatch<SetStateAction<Age | "Age">>;
  stateSearch: State | "State";
  setStateSearch: React.Dispatch<SetStateAction<State | "State">>;
  citySearch: string;
  setCitySearch: React.Dispatch<SetStateAction<string>>;
  zipSearch: string;
  setZipSearch: React.Dispatch<SetStateAction<string>>;
  breedSearch: string;
  setBreedSearch: React.Dispatch<SetStateAction<string>>;
  sessionData: Session | null;
  currentUser: UserWithRelations | undefined;
  favDogIds: number[];
  currentPage: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
  
  isDogsLoading: boolean;
  isDogsSuccess: boolean;
  isDogsError: boolean;
  // isDogsRefetching: boolean;
  isFetchingNextPage: boolean;
  searchTerms: SearchTerms;
  setSearchTerms: React.Dispatch<SetStateAction<SearchTerms>>;
  searchLimit: number
  setSearchLimit: React.Dispatch<SetStateAction<number>>;
  favoriteDialogRef: MutableRefObject<HTMLDialogElement | null>
  dogData:
    | InfiniteData<
        | {
            dogs: DogWithRelations[];
            nextCursor: number | undefined;
            totalDogs: number;
          }
        | undefined
      >
    | undefined;
    // refetchDogs: <TPageData>(
    //   options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
    // ) => Promise<
    //   QueryObserverResult<
    //     InfiniteData<
    //       | {
    //           dogs: DogWithRelations[];
    //           nextCursor: number | undefined;
    //           totalDogs: number;
    //         }
    //       | undefined
    //     >,
    //     TRPCClientErrorLike<TRPCErrorShape>
    //   >
    // >;
    fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<
      InfiniteQueryObserverResult<
        | {
            dogs: DogWithRelations[];
            nextCursor: number | undefined;
            totalDogs: number;
          }
        | undefined,
        TRPCClientErrorLike<TRPCErrorShape>
      >
    >;

};

export const DogContext = createContext({} as DogContextType);
