import { createContext } from "react";
import type { DogWithRelations, Age, State } from "~/types/dog-types";
import type { SetStateAction } from "react";

export type DogContextType = {
  dogs: DogWithRelations[];
  setDogs: React.Dispatch<SetStateAction<DogWithRelations[]>>;
  allDogs: DogWithRelations[] | undefined;
  favoriteDogs: DogWithRelations[];
  setFavoriteDogs: React.Dispatch<SetStateAction<DogWithRelations[]>>;
  ageSearch: Age;
  setAgeSearch: React.Dispatch<SetStateAction<Age>>;
  stateSearch: State;
  setStateSearch: React.Dispatch<SetStateAction<State>>;
  citySearch: string;
  setCitySearch: React.Dispatch<SetStateAction<string>>;
  zipSearch: string;
  setZipSearch: React.Dispatch<SetStateAction<string>>;
  breedSearch: string
  setBreedSearch: React.Dispatch<SetStateAction<string>>;
};

export const DogContext = createContext({} as DogContextType);
