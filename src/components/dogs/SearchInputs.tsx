import { useContext, useState, useRef, type MutableRefObject } from "react";
import { fiftyStates, findBreedDuplicates } from "~/utils/helpers";
import { DogContext } from "~/context/DogContext";
import { isAgeValid } from "~/utils/type-guards";
import { isStateValid } from "~/utils/type-guards";
import { api } from "~/utils/api";
import Dialog from "../base/Dialog";

const SearchInputs = () => {
  const {
    ageSearch,
    setAgeSearch,
    stateSearch,
    setStateSearch,
    citySearch,
    setCitySearch,
    zipSearch,
    setZipSearch,
    breedSearch,
    setBreedSearch,
    searchTerms,
    setSearchTerms,
    setCurrentPage,
    searchLimit,
    setSearchLimit,
  } = useContext(DogContext);

  const { refetch: refetchAllBreeds } = api.dog.getAllBreeds.useQuery();
  const breedDialogRef: MutableRefObject<HTMLDialogElement | null> =
    useRef(null);
  const [breedDuplicates, setBreedDuplicates] = useState<string[]>([]);

  const clearSearchParams = () => {
    setAgeSearch("Age");
    setStateSearch("State");
    setCitySearch("");
    setZipSearch("");
    setBreedSearch("");
  };

  const handleSearch = async () => {
    setCurrentPage(0);

    setSearchTerms({
      limit: searchLimit,
      age: ageSearch,
      state: stateSearch,
      city: citySearch,
      zipCode: zipSearch,
      breed: breedSearch,
    });

    if (breedSearch) {
      const fetchedBreeds = await refetchAllBreeds();
      if (fetchedBreeds?.data) {
        const breeds = findBreedDuplicates(fetchedBreeds.data, breedSearch);
        if (breeds) {
          setBreedDuplicates(breeds);
          await new Promise((resolve) => {
            breedDialogRef.current?.addEventListener("close", resolve, {
              once: true,
            });
            breedDialogRef.current?.showModal();
          });
        }
        // else {
        // }
      }
    } else {
      clearSearchParams();
    }
  };

  const BreedDialog = () => (
    <>
      {breedDuplicates.length > 0 && (
        <div className="flex flex-col items-center xs:w-[300px]">
          <h4 className="mb-7 max-w-[70%] text-center">
            Did you mean one of these?
          </h4>
          <select
            className="w-[9rem] border border-black"
            defaultValue="Select one!"
            onChange={(e) => {
              setSearchTerms({
                ...searchTerms,
                breed: e.target.value,
              });
              breedDialogRef.current?.close();
              clearSearchParams();
            }}
          >
            <option className="" disabled>
              Select one!
            </option>
            {breedDuplicates.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );

  return (
    <div className="mt-12 flex flex-col items-center">
      <h1 className="mb-2 pl-4 text-[1.5rem]">Search for Dogs!</h1>

      <dialog ref={breedDialogRef} className="modal backdrop:backdrop-blur-sm">
        <Dialog title="Breed not found!" Component={<BreedDialog />} />
      </dialog>

      <>
        <div className="flex max-w-[600px] flex-col items-center gap-2 rounded-md border py-4 xs:flex-row xs:flex-wrap xs:justify-center">
          <input
            className="w-[14rem] border-2 border-black pl-1 "
            type="text"
            placeholder="Breed"
            value={breedSearch}
            onChange={(e) => setBreedSearch(e.target.value)}
          />
          <input
            className="w-[14rem] border-2 border-black pl-1"
            type="text"
            placeholder="City"
            value={citySearch}
            onChange={(e) => setCitySearch(e.target.value)}
          />

          <div className="flex flex-wrap justify-center gap-4">
            <input
              className="w-[8rem] border-2 border-black  pl-1"
              type="text"
              placeholder="Zip Code"
              value={zipSearch}
              onChange={(e) => setZipSearch(e.target.value)}
            />
            <select
              className="w-[6rem] border-2 border-black"
              onChange={(e) =>
                isStateValid(e.target.value) && setStateSearch(e.target.value)
              }
              // defaultValue="State"
              value={stateSearch}
            >
              <option className="" disabled>
                State
              </option>
              {fiftyStates.map(
                (state) =>
                  state.length > 0 && (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ),
              )}
            </select>
            <select
              onChange={(e) => {
                isAgeValid(e.target.value) && setAgeSearch(e.target.value);
              }}
              className="w-[8rem] border-2 border-black"
              value={ageSearch}
            >
              <option disabled>Age</option>
              <option value="Baby">Baby</option>
              <option value="Young">Young</option>
              <option value="Adult">Adult</option>
              <option value="Senior">Senior</option>
            </select>
            <select
              onChange={(e) => {
                setSearchLimit(Number(e.target.value));
              }}
              value={searchLimit}
              className="w-[6rem] border-2 border-black"
            >
              <option disabled>Per Page</option>
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </div>
          <div className="mt-4 flex w-full justify-center gap-2">
            <button
              className="w-24 border-2 border-black"
              onClick={handleSearch}
            >
              Search
            </button>
            <button
              className="w-24 border-2 border-black"
              onClick={clearSearchParams}
            >
              Clear
            </button>
          </div>
        </div>
      </>
    </div>
  );
};

export default SearchInputs;
