import { createContext } from "react";
import type { Dog } from "~/types/dog-types";
import type { SetStateAction } from "react";

export type DogContextType = {
  dogs: Dog[];
  setDogs: React.Dispatch<SetStateAction<Dog[]>>;
};

export const DogContext = createContext({} as DogContextType);
