import { createContext } from "react";
import type { DogWithRelations, Age } from "~/types/dog-types";
import type { SetStateAction } from "react";

export type DogContextType = {
  dogs: DogWithRelations[];
  setDogs: React.Dispatch<SetStateAction<DogWithRelations[]>>;
  allDogs: DogWithRelations[] | undefined;
  favoriteDogs: DogWithRelations[];
  setFavoriteDogs: React.Dispatch<SetStateAction<DogWithRelations[]>>;
  ageSearch: Age;
  setAgeSearch: React.Dispatch<SetStateAction<Age>>;
};

export const DogContext = createContext({} as DogContextType);
