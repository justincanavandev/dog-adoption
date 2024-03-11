import type { Dog } from "@prisma/client";

export const capitalizeFirstLetter = (word: string) => {
  if (!word.includes(" ")) {
    const firstLetter = word.charAt(0);

    const firstLetterCap = firstLetter.toUpperCase();

    const remainingLetters = word.slice(1).toLowerCase();
    const capitalizedWord = firstLetterCap + remainingLetters;
    return capitalizedWord.trim();
  } else {
    const arr = word.split(" ");
    const splitArr = arr.map((partial: string) => {
      const firstLetter = partial.charAt(0);
      const firstLetterCap = firstLetter.toUpperCase();

      const remainingLetters = partial.slice(1).toLowerCase();

      const capitalizedWord = firstLetterCap + remainingLetters;
      return capitalizedWord;
    });
    const joinedString = splitArr.join(" ");
    return joinedString;
  }
};

export const isZipCodeValid = (str: string) => /^\d{5}(-\d{4})?$/.test(str);

export const removeDuplicates = <T>(data: T[]) => [...new Set(data)];

export const findBreedDuplicates = (dogs: Dog[], userInput: string) => {
  const breedIndices: number[] = [];
  const takeOutCharacters = (breed: string) => {
    return breed
      .replace(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, "")
      .toLowerCase();
  };
  const lowercaseBreeds: string[] = dogs.map((dog) =>
    takeOutCharacters(dog.breed),
  );

  const breedMatches = lowercaseBreeds.filter(
    (breed) => breed === takeOutCharacters(userInput),
  );

  if (breedMatches.length === 0) {
    const breedArr: string[] = [];
    const breedIncludes = lowercaseBreeds.filter((breed, index) => {
      const result =
        breed.includes(takeOutCharacters(userInput)) ||
        takeOutCharacters(userInput).includes(breed);

      if (result && !breedArr.includes(breed)) {
        breedIndices.push(index);
        breedArr.push(breed);
        return result;
      }
    });
    if (breedIndices.length > 0 && breedIncludes.length > 0) {
      const breeds = breedIndices
        .map((index) => (dogs[index] ? dogs[index]?.breed : undefined))
        .filter((breed) => typeof breed !== undefined);

      return breeds;
    } else {
      return undefined;
    }
  }
};

export const fiftyStates: string[] = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
  "",
];
