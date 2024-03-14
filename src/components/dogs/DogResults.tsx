import { type MutableRefObject, useContext, useRef } from "react";
import { DogContext } from "~/context/DogContext";
import Image from "next/image";
import imgNotFound from "public/images/img-unavail.jpeg";
import Head from "next/head";
import { capitalizeFirstLetter } from "~/utils/helpers";
import type { DogWithRelations } from "~/types/dog-types";
import FavoriteDogs from "../dialogs/FavoriteDogs";
import { api } from "~/utils/api";
import Spinner from "../Spinner";
import Dialog from "../base/Dialog";
import { FaRegHeart, FaHeart } from "react-icons/fa";
// import toast from "react-hot-toast";


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
  } = useContext(DogContext);
  const favoriteDialogRef: MutableRefObject<HTMLDialogElement | null> =
    useRef(null);
  const utils = api.useUtils();

  const dogsToShow = dogData?.pages[currentPage]?.dogs;
  const totalDogs = dogData?.pages[currentPage]?.totalDogs;
  const totalPages = totalDogs ? Math.ceil(totalDogs / searchLimit) : 0;
  const nextCursor = dogData?.pages[currentPage]?.nextCursor;
  // const [updatedDogId, setUpdatedDogId] = useState<number | null>(null);

  const handleFetchNextPage = async () => {
    await fetchNextPage();
    setCurrentPage((prev) => prev + 1);
  };

  const handleFetchPreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  // const { data: dogById } = api.dog.getOneById.useQuery(
  //   {
  //     id: updatedDogId ? updatedDogId : 0,
  //   },
  //   {
  //     enabled: updatedDogId !== null && typeof updatedDogId === "number",
  //   },
  // );

  

  const { mutate: updateFavorites } = api.user.updateFavorites.useMutation({
    onSuccess: async () => {
      // console.log("favDogIds", favDogIds);
      // console.log("data", data);
      // console.log("context", context);
      // // if(favoritesData?.dogIds) {
      // if (favDogIds.length > data?.dogIds?.length) {
      //   // toast("hello")

      //   toast(`You have removed ${favDogIds?.pop()} from your favorites!`);
      // } else {
      //   if (favDogIds) {
      //     const dogId = favDogIds.pop();
      //     if (typeof dogId === "number") {
      //       setUpdatedDogId(dogId)
      //       console.log('dogId', dogById)
      //       // const dog = getDogById(dogId);
      //       // console.log("dog", dog);
      //     }
      //   }
      //   toast(`You have added g to your favorites!`);
      // }

      // console.log('variables', variables)
      await utils.user.getById.invalidate();
      await utils.dog.getManyById.invalidate();
      // toast("hello")
    },
    // }
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
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {/* <Link href="/">Go to Home Page</Link> */}
        <h2 className="mt-4 w-full text-center text-[1.5rem]">
          {" "}
          Find Your Match!
        </h2>
        <dialog
          ref={favoriteDialogRef}
          className="modal backdrop:backdrop-blur-sm"
        >
          <Dialog
            title="Favorite Dogs!"
            Component={
              <FavoriteDogs
                remove={removeFromFavorites}
                add={handleAddToFavorites}
              />
            }
          />
        </dialog>
        {favoriteDogs.length > 0 && (
          <FaHeart
            className="absolute right-4 top-2 cursor-pointer text-[2rem] text-red-400"
            onClick={() => favoriteDialogRef.current?.showModal()}
          ></FaHeart>
        )}
        {isDogsLoading && <Spinner />}
        {isDogsError ||
          (!isDogsLoading && !dogsToShow && <div>Error fetching dogs!</div>)}

        {dogsToShow?.length === 0 ? (
          <div>No Dogs matched your search!</div>
        ) : (
          dogsToShow?.map((dog) => (
            <div
              key={dog.id}
              className={`relative flex h-auto w-[240px] flex-col items-center justify-between overflow-hidden rounded-md border xs:w-[90%] sm:w-[50%]`}
            >
              {!isDogsLoading || !isFetchingNextPage ? (
                <>
                  <Image
                    alt={`Image of ${dog.name}, ${dog.breed}`}
                    height={270}
                    width={240}
                    // fill={true}
                    style={{
                      objectFit: "cover",
                      maxHeight: "270px",
                      maxWidth: "240px",
                      minHeight: "270px",
                      minWidth: "240px",
                    }}
                    priority={false}
                    quality={100}
                    className="rounded-lg"
                    src={dog.photos[0] ? dog.photos[0].medium : imgNotFound}
                  ></Image>

                  <div className="flex h-full max-w-[240px] flex-col justify-around gap-1 pl-2 text-center xs:text-[1.2rem]">
                    <div className="mt-2 flex flex-col items-center">
                      <h3 className="w-full truncate text-center text-[1.8rem]">
                        {dog.name}
                      </h3>
                      <span className="max-w-full truncate">{`\u2022 ${dog.breed}`}</span>
                      <span>{`\u2022 ${dog.age}`}</span>
                      {/* <span className="truncate">
                   
                        {dog.address?.address1 &&
                          `\u2022 ${dog.address.address1},`}
                      </span> */}
                      <span className="w-full truncate">
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
                <div className="absolute right-2  top-2 cursor-pointer rounded-full bg-white p-2 text-[1.3rem] text-red-500 opacity-75 sm:text-[1.4rem] ">
                  {favDogIds.includes(dog.id) ? (
                    <FaHeart
                      onClick={() => {
                        removeFromFavorites(dog);
                      }}
                      className=""
                    />
                  ) : (
                    <FaRegHeart
                      onClick={() => {
                        handleAddToFavorites(dog);
                      }}
                      className=""
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
              Page {currentPage + 1}
              {totalPages > 0 && ` of ${totalPages}`}
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
        )}
      </div>
    </>
  );
};

export default DogResults;
