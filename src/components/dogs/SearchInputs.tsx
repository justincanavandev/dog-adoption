import { useContext, useState, useRef, type MutableRefObject } from "react";
import { fiftyStates, findBreedDuplicates } from "~/utils/helpers";
import { DogContext } from "~/context/DogContext";
import { isAgeValid } from "~/utils/type-guards";
import { isStateValid } from "~/utils/type-guards";
import { api } from "~/utils/api";
import Dialog from "../base/Dialog";
// import FavoriteDogs from "../dialogs/FavoriteDogs";

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

  const { data: allDogs } = api.dog.getAll.useQuery();
  const breedDialogRef: MutableRefObject<HTMLDialogElement | null> =
    useRef(null);
  const [breedDuplicates, setBreedDuplicates] = useState<
    (string | undefined)[]
  >([]);

  const handleSearch = async () => {
    setCurrentPage(0);

    if (allDogs) {
      const breeds = findBreedDuplicates(allDogs, breedSearch);
      if (breeds) {
        setBreedDuplicates(breeds);
        await new Promise((resolve) => {
          breedDialogRef.current?.addEventListener("close", resolve, {
            once: true,
          });
          breedDialogRef.current?.showModal();
        });
      } else {
        setSearchTerms({
          limit: searchLimit,
          age: ageSearch,
          state: stateSearch,
          city: citySearch,
          zipCode: zipSearch,
          breed: breedSearch,
        });
      }
    }
  };

  const BreedDialog = () => (
    <>
      {breedDuplicates.length > 0 && (
        <div>
          <select
            onChange={(e) => {
              setSearchTerms({
                ...searchTerms,
                breed: e.target.value,
              });
              breedDialogRef.current?.close();
            }}
          >
            {breedDuplicates.map((breed) => (
              <option
                key={breed}
                value={breed}
              >
                {breed}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );

  return (
    <div className="flex flex-col items-start">
      <h1 className="pl-4 text-[1.5rem]">Search for Dogs!</h1>

      <dialog ref={breedDialogRef} className="modal">
        <Dialog
          title="Did you mean one of these?"
          Component={<BreedDialog />}
        />
      </dialog>

      <>
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          <input
            className="border-2 border-black "
            type="text"
            placeholder="Breed"
            value={breedSearch}
            onChange={(e) => setBreedSearch(e.target.value)}
          />
          <input
            className="border-2 border-black"
            type="text"
            placeholder="City"
            value={citySearch}
            onChange={(e) => setCitySearch(e.target.value)}
          />
          <input
            className="border-2 border-black"
            type="text"
            placeholder="Zip Code"
            value={zipSearch}
            onChange={(e) => setZipSearch(e.target.value)}
          />
          <select
            className="border-2 border-black"
            onChange={(e) =>
              isStateValid(e.target.value) && setStateSearch(e.target.value)
            }
            defaultValue="State"
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
            className="w-36 border-2 border-black"
            defaultValue="Age"
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
            defaultValue={5}
            className="border-2 border-black"
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
          <div className="flex w-full justify-center">
            <button
              className="w-24 border-2 border-black"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </>
    </div>
  );
};

export default SearchInputs;
