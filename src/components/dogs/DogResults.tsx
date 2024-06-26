import { useContext, useState } from "react";
import { DogContext } from "~/context/DogContext";
import Image from "next/image";
import imgNotFound from "public/images/img-unavail.jpeg";
import Head from "next/head";
import { capitalizeFirstLetter } from "~/utils/helpers";
import type { DogWithRelations, UpdatedDog } from "~/types/dog-types";
import FavoriteDogs from "../dialogs/FavoriteDogs";
import { api } from "~/utils/api";
import Spinner from "../Spinner";
import Dialog from "../base/Dialog";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { type FavoriteDogs as FavoriteDogsType } from "@prisma/client";
import { isFavoriteDogsValid, isUpdatedDogValid } from "~/utils/type-guards";
import { isHostnameValid } from "~/utils/helpers";
import Button from "../base/Button";
import { useSession } from "next-auth/react";

const DogResults = () => {
  const {
    currentUser,
    favoriteDogs,
    favDogIds,
    currentPage,
    setCurrentPage,
    fetchNextPage,
    isDogsLoading,
    isFetchingNextPage,
    dogData,
    searchLimit,
    isDogsError,
    favoriteDialogRef,
  } = useContext(DogContext);

  const utils = api.useUtils();
  const { data: sessionData } = useSession();
  const dogsToShow = dogData?.pages[currentPage]?.dogs;
  const totalDogs = dogData?.pages[currentPage]?.totalDogs;
  const limitOrPerPage = searchLimit === "Per Page" ? 5 : searchLimit;
  const totalPages = totalDogs ? Math.ceil(totalDogs / limitOrPerPage) : 0;
  const nextCursor = dogData?.pages[currentPage]?.nextCursor;
  const [updatedDog, setUpdatedDog] = useState<UpdatedDog | null>(null);

  const handleFetchNextPage = async () => {
    await fetchNextPage();
    setCurrentPage((prev) => prev + 1);
  };

  const handleFetchPreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const {} = api.dog.getOneById.useQuery(
    {
      id: updatedDog?.dogId ?? -1,
    },
    {
      enabled: isUpdatedDogValid(updatedDog),
      onSuccess: (data) => {
        if (data) {
          if (updatedDog?.action === "add") {
            toast.success(
              `You have successfully added ${data?.name} (${data?.breed}) to your favorites!`,
            );
          } else {
            toast.error(
              `You have removed ${data?.name} (${data?.breed}) from your favorites!`,
            );
          }
          setUpdatedDog(null);
        }
      },
    },
  );

  const handleUpdateFavorites = (favorites: FavoriteDogsType) => {
    if (favDogIds.length > favorites?.dogIds?.length) {
      const removedIdArr = favDogIds.filter(
        (id) => !favorites?.dogIds?.includes(id),
      );

      const removedId = removedIdArr[0];

      if (removedId) {
        setUpdatedDog({
          dogId: removedId,
          action: "remove",
        });
      }
    } else {
      const dogId = favorites.dogIds.pop();
      if (dogId) {
        setUpdatedDog({
          dogId,
          action: "add",
        });
      }
    }
  };

  const { mutate: updateFavorites } = api.user.updateFavorites.useMutation({
    onSuccess: async (data: FavoriteDogsType | undefined) => {
      if (data) {
        if (isFavoriteDogsValid(data)) {
          handleUpdateFavorites(data);
        }
      }
      await utils.user.getById.invalidate();
      await utils.dog.getManyById.invalidate();
    },
  });

  const handleAddToFavorites = (dog: DogWithRelations) => {
    if (favoriteDogs.includes(dog)) {
      console.log("You have already favorited this dog!");
      return;
    } else {
      if (currentUser) {
        updateFavorites({
          dogIds: [...favDogIds, dog.id],
          favorites: currentUser.favorites,
        });
      }
    }
  };

  const removeFromFavorites = (dog: DogWithRelations) => {
    const filteredIds = favDogIds.filter((id) => id !== dog.id);
    if (currentUser) {
      updateFavorites({
        dogIds: filteredIds,
        favorites: currentUser.favorites,
      });
    }
  };

  return (
    <>
      <Head>
        <title>Search for Dogs!</title>
      </Head>
      <div className="relative mx-4 mt-4 flex flex-wrap justify-center gap-4 ">
        <div className="flex flex-wrap justify-center gap-4 lg:max-w-[1050px] lg:gap-12 xl:max-w-[1400px]">
          <h2 className="w-full text-center text-[1.5rem]">
            {" "}
            Find Your Match!
          </h2>
          <dialog
            ref={favoriteDialogRef}
            className="modal rounded-md bg-gray backdrop:backdrop-blur-sm"
          >
            <Dialog
              title="Your Favorite Dogs!"
              Component={
                <FavoriteDogs
                  remove={removeFromFavorites}
                  add={handleAddToFavorites}
                />
              }
            />
          </dialog>

          {isDogsLoading && <Spinner />}
          {isDogsError ||
            (!isDogsLoading && !dogsToShow && <div>Error fetching dogs!</div>)}

          {dogsToShow?.length === 0 ? (
            <div>No Dogs matched your search!</div>
          ) : (
            dogsToShow?.map((dog) => (
              <div
                key={dog.id}
                className={`relative flex h-auto w-[240px] flex-col items-center justify-between overflow-hidden rounded-md border-2 border-black bg-lightGray`}
              >
                {!isDogsLoading || !isFetchingNextPage ? (
                  <>
                    <Image
                      alt={`Image of ${dog.name}, ${dog.breed}`}
                      height={270}
                      width={240}
                      style={{
                        objectFit: "cover",
                        maxHeight: "270px",
                        maxWidth: "240px",
                        minHeight: "270px",
                        minWidth: "240px",
                      }}
                      priority={true}
                      quality={100}
                      className="rounded-t-md"
                      src={
                        dog.photos[0]
                          ? isHostnameValid(dog.photos[0].medium)
                            ? dog.photos[0].medium
                            : imgNotFound
                          : imgNotFound
                      }
                    ></Image>

                    <div className="flex h-full max-w-[240px] flex-col justify-around gap-1 pl-2 text-center xs:text-[1.2rem]">
                      <div className="mt-2 flex w-auto flex-col items-center">
                        <h3 className="w-full truncate px-1 text-center text-[1.8rem]">
                          {dog.name}
                        </h3>
                        <span className="max-w-full truncate px-1">{`\u2022 ${dog.breed}`}</span>
                        <span>{`\u2022 ${dog.age}`}</span>
                        {/* <span className="truncate">
                   
                        {dog.address?.address1 &&
                          `\u2022 ${dog.address.address1},`}
                      </span> */}
                        <span className="w-full truncate px-1">
                          {dog.address?.city &&
                            `\u2022 ${capitalizeFirstLetter(dog.address.city)}, `}
                          {dog.address?.state &&
                            ` ${dog.address.state.toUpperCase()}, `}
                          {dog.address?.zipCode && dog.address.zipCode}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <Spinner />
                )}
                <div className="my-2 flex w-full flex-col items-center gap-1">
                  <div className="absolute right-2 top-2 cursor-pointer rounded-full duration-200 hover:scale-110 bg-white p-2 text-[1.3rem] text-red-500 opacity-75 sm:text-[1.4rem] ">
                    {favDogIds.includes(dog.id) ? (
                      <FaHeart
                        onClick={() => {
                          sessionData
                            ? removeFromFavorites(dog)
                            : toast.error(
                                "Must be logged in for this feature!",
                              );
                        }}
                      />
                    ) : (
                      <FaRegHeart 
                        onClick={() => {
                          sessionData
                            ? handleAddToFavorites(dog)
                            : toast.error(
                                "Must be logged in for this feature!",
                              );
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
          {/* Pagination */}
          {dogsToShow?.length !== 0 && !isDogsLoading && dogsToShow && (
            <div className="mb-2 flex w-full justify-evenly">
              <Button
                text="Prev Page"
                action={handleFetchPreviousPage}
                disabled={currentPage <= 0}
              />
              <p>
                Page {currentPage + 1}
                {totalPages > 0 && ` of ${totalPages}`}
              </p>
              <Button
                text="Next Page"
                asyncAction={handleFetchNextPage}
                disabled={!nextCursor ? true : false}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DogResults;
