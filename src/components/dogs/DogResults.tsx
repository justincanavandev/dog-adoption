import { type MutableRefObject, useContext, useRef } from "react";
import { DogContext } from "~/context/DogContext";
import Image from "next/image";
import imgNotFound from "public/images/img-unavail.jpeg";
import Link from "next/link";
import Head from "next/head";
import { capitalizeFirstLetter } from "~/utils/helpers";
import type { DogWithRelations } from "~/types/dog-types";
import FavoriteDogsDialog from "../favorites/FavoriteDogsDialog";
import { api } from "~/utils/api";
import Spinner from "../Spinner";

const DogResults = () => {
  const {
    currentUser,
    favoriteDogs,
    setFavoriteDogs,
    favDogIds,
    currentPage,
    setCurrentPage,
    fetchNextPage,
    isDogsLoading,
    isFetchingNextPage,
    dogData,
    searchLimit
  } = useContext(DogContext);
  const favoriteDialogRef: MutableRefObject<HTMLDialogElement | null> =
    useRef(null);
  const utils = api.useUtils();

  const dogsToShow = dogData?.pages[currentPage]?.dogs;
  const totalDogs = dogData?.pages[currentPage]?.totalDogs;
  const totalPages = totalDogs ? Math.ceil(totalDogs / searchLimit) : "";
  const nextCursor = dogData?.pages[currentPage]?.nextCursor;

  const handleFetchNextPage = async () => {
    await fetchNextPage();
    setCurrentPage((prev) => prev + 1);
  };

  const handleFetchPreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const { mutate: addFavoriteDog } = api.favorites.create.useMutation({
    onSuccess: async () => {
      await utils.dog.getManyById.invalidate();
      await utils.user.getById.invalidate();
    },
  });
  const { mutate: updateFavoriteDogs } = api.favorites.update.useMutation({
    onSuccess: async () => {
      await utils.user.getById.invalidate();
    },
  });

  const addToFavorites = (dog: DogWithRelations) => {
    if (favoriteDogs.includes(dog)) {
      console.log("You have already favorited this dog!");
      return;
    } else {
      setFavoriteDogs([...favoriteDogs, dog]);

      if (currentUser) {
        console.log('currentUser', currentUser)
        if (currentUser.favorites) {
        
          updateFavoriteDogs({ dogIds: [...favDogIds, dog.id] });
        } else {
          console.log('dog.id', dog.id)
          addFavoriteDog({ dogIds: [dog.id] });
          console.log('currentUser.favorites', currentUser.favorites)
        }
      }
    }
  };

  const removeFromFavorites = (dog: DogWithRelations) => {
    const filteredDogs = favoriteDogs.filter((favDog) => dog.id !== favDog.id);
    const filteredDogIds = favDogIds.filter((id) => dog.id !== id);

    updateFavoriteDogs({ dogIds: filteredDogIds });

    setFavoriteDogs(filteredDogs);
  };

  return (
    <>
      <Head>
        <title>Search for Dogs!</title>
      </Head>
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/">Go to Home Page</Link>
        <h2 className="w-full text-center text-[1.5rem]"> View All Dogs!</h2>
        <dialog ref={favoriteDialogRef} className="modal">
          <FavoriteDogsDialog />
        </dialog>
        {favoriteDogs.length > 0 && (
          <button
            className="absolute right-8"
            onClick={() => favoriteDialogRef.current?.showModal()}
          >
            View Favorites
          </button>
        )}

        {dogsToShow?.length === 0 ? (
          <div>No Dogs matched your search!</div>
        ) : (
          dogsToShow?.map((dog) => (
            <div
              key={dog.id}
              className="mt-6 flex h-auto w-[45%] flex-col items-center justify-between rounded-md border-2 border-black"
            >
              { !isDogsLoading || !isFetchingNextPage ? (
                <div className="flex w-full flex-col justify-between md:flex-row">
                  <div className="xs:text-[1.2rem] flex flex-col gap-1  pl-2">
                    <span>Name: {dog.name}</span>
                    <span>Breed: {dog.breed}</span>
                    <span>Age: {dog.age}</span>
                    <span className="">
                      Address:{" "}
                      {dog.address?.address1 && `${dog.address.address1}, `}
                      {dog.address?.city &&
                        `${capitalizeFirstLetter(dog.address.city)}, `}
                      {dog.address?.state &&
                        `${dog.address.state.toUpperCase()}, `}
                      {dog.address?.zipCode && dog.address.zipCode}
                    </span>
                  </div>
                  <Image
                    alt="dog photo"
                    width={300}
                    height={400}
                    className="xs:h-48 xs:w-36 mx-auto h-40 w-[7.5rem] rounded-md object-cover sm:h-60 sm:w-[11.25rem] md:m-1 lg:h-72 lg:w-[13.5rem]"
                    src={dog.photos[0] ? dog.photos[0].medium : imgNotFound}
                  ></Image>
                </div>
              ) : (
                <Spinner />
              )}
              <div className="my-2 flex w-full flex-col items-center gap-1">
                <button
                  className="w-32 border border-black px-1"
                  onClick={() => {
                    favDogIds.includes(dog.id)
                      ? removeFromFavorites(dog)
                      : addToFavorites(dog);
                  }}
                >
                  {favDogIds.includes(dog.id)
                    ? "Remove From Favorites"
                    : "Add To Favorites"}
                </button>
              </div>
            </div>
          ))
        )}
        {/* Pagination */}

        <div className="mb-2 flex w-full justify-evenly">
          <button
            className="border-2 border-black px-1"
            onClick={() => {
              handleFetchPreviousPage();
            }}
            disabled={currentPage <= 0}
          >
            Prev Page
          </button>
          <p>
            Page {currentPage + 1} of {totalPages}
          </p>
          <button
            className="border-2 border-black px-1"
            onClick={() => {
              void handleFetchNextPage();
            }}
            disabled={!nextCursor ? true : false}
          >
            Next page
          </button>
        </div>
      </div>
    </>
  );
};

export default DogResults;
