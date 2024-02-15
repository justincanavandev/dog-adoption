export const capitalizeFirstLetter = (word: string) => {
  if (!word.includes(" ")) {
    const firstLetter = word.charAt(0);

    const firstLetterCap = firstLetter.toUpperCase();

    const remainingLetters = word.slice(1).toLowerCase();
    const capitalizedWord = firstLetterCap + remainingLetters;
    return capitalizedWord.trim();
  } else {
    const arr = word.split(" ");
    arr.map((partial: string) => {
      const firstLetter = partial.charAt(0);
      const firstLetterCap = firstLetter.toUpperCase();

      const remainingLetters = partial.slice(1).toLowerCase();
      const capitalizedWord = firstLetterCap + remainingLetters;
      return capitalizedWord;
    });
    const joinedString = arr.join(" ");
    return joinedString;
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
];
