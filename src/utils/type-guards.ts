import type { Age, State } from "~/types/dog-types";
import { fiftyStates } from "./helpers";

const ageOptions = ["Baby", "Young", "Adult"];

export const isAgeValid = (age: unknown): age is Age => {
  return typeof age === "string" && ageOptions.includes(age);
};

export const isStateValid = (state: unknown): state is State => {
  return typeof state === "string" && fiftyStates.includes(state)
}
