import type { Age } from "~/types/dog-types";

const ageOptions = ["Baby", "Young", "Adult"];

export const isAgeValid = (age: unknown): age is Age => {
  return typeof age === "string" && ageOptions.includes(age);
};
