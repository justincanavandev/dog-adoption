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
    return joinedString.trim();
  }
};

const allowedHostnames = [
  "dl5zpyw5k3jeb.cloudfront.net",
  "dbw3zep4prcju.cloudfront.net",
];

export const isHostnameValid = (url: string) => {
  // Takes off the https:// as well as everything after ".net".. matches format in allowedHostnames array
  const splitUrl = url.substring(8).split("/");
  const urlMatch = splitUrl[0];
  if (urlMatch) {
    return allowedHostnames.includes(urlMatch);
  }

};

export const isZipCodeValid = (str: string) => /^\d{5}(-\d{4})?$/.test(str);

export const removeDuplicates = <T>(data: T[]) => [...new Set(data)];

export const findBreedDuplicates = (breeds: string[], userInput: string) => {
  const takeOutCharacters = (breed: string) => {
    return breed
      .replace(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, "")
      .toLowerCase();
  };

  const breedMatches = breeds.filter(
    (breed) => takeOutCharacters(breed) === takeOutCharacters(userInput),
  );
  const breedArr: string[] = [];

  if (breedMatches.length === 0) {
    const breedIncludes = breeds.filter((breed, index) => {
      const result =
        takeOutCharacters(breed).includes(takeOutCharacters(userInput)) ||
        takeOutCharacters(userInput).includes(takeOutCharacters(breed));

      if (result && !breedArr.includes(breed)) {
        breedArr.push(breed);
        return breeds[index];
      }
    });
    return breedIncludes;
  } else {
    return undefined;
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
