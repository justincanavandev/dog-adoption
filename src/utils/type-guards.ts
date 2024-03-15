import type { Age, State, UpdatedDog } from "~/types/dog-types";
import { fiftyStates } from "./helpers";
import type { FavoriteDogs } from "@prisma/client";

const ageOptions = ["Baby", "Young", "Adult", "Senior", ""];

export const isAgeValid = (age: unknown): age is Age => {
  return typeof age === "string" && ageOptions.includes(age);
};

export const isStateValid = (state: unknown): state is State => {
  return typeof state === "string" && fiftyStates.includes(state);
};

export const isFavoriteDogsValid = (
  favorites: unknown,
): favorites is FavoriteDogs => {
  return (
    favorites !== null &&
    typeof favorites === "object" &&
    "userId" in favorites &&
    "dogIds" in favorites
  );
};

export const isUpdatedDogValid = (
  updatedDog: unknown,
): updatedDog is UpdatedDog => {
  return (
    updatedDog !== null &&
    typeof updatedDog === "object" &&
    "dogId" in updatedDog &&
    "action" in updatedDog
  );
};
