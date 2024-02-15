import { createContext } from "react";
// import type { Dog } from "@prisma/client";
import type { DogWithRelations } from "~/types/dog-types";
import type { SetStateAction } from "react";
// import { Dog } from "@prisma/client";

export type DogContextType = {
  dogs: DogWithRelations[];
  setDogs: React.Dispatch<SetStateAction<DogWithRelations[]>>;
  allDogs: DogWithRelations[] | undefined,
  isDogsLoading: boolean,
  isDogsSuccess: boolean,
  isDogsError: boolean
  favoriteDogs: DogWithRelations[]
  setFavoriteDogs: React.Dispatch<SetStateAction<DogWithRelations[]>>;
};

export const DogContext = createContext({} as DogContextType);
