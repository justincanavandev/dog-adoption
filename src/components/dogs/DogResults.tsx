import { type MutableRefObject, useContext, useEffect, useRef } from "react";
import { DogContext } from "~/context/DogContext";
import Image from "next/image";
import imgNotFound from "public/images/img-unavail.jpeg";
import Link from "next/link";
import Head from "next/head";
import { capitalizeFirstLetter } from "~/utils/helpers";
import type { DogWithRelations } from "~/types/dog-types";
import FavoriteDogsDialog from "../favorites/FavoriteDogsDialog";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

const DogResults = () => {
  //   const {
  //     currentPage,
  //     setCurrentPage,
  //     fetchFavoriteDogs,
  //     favoriteDogsIds,
  //     setFavoriteDogsIds,
  //     nextParams,
  //     setNextParams,
  //     prevParams,
  //     setPrevParams,
  //     total,
  //     filteredDogs,
  //     locationArr,
  //     fetchDogObjects,
  //   } = useContext(DogsContext)

  //   const totalPages = Math.ceil(total / 25)

  const {
    dogs,
    favoriteDogs,
    setFavoriteDogs,
    // selectedFavDog,
    // setSelectedFavDog,
  } = useContext(DogContext);
  const favoriteDialogRef: MutableRefObject<HTMLDialogElement | null> =
    useRef(null);

  // const { refetch: getDogById } = api.dog.getOneById.useQuery(
  //   {
  //     id: selectedFavDog ? selectedFavDog.id : 0,
  //   },
  //   {
  //     enabled: false,
  //   },
  // );
  const { data: sessionData } = useSession();

  const { data: currentUser } = api.user.getById.useQuery(
    { id: sessionData ? sessionData.user.id : "" },
    {
      enabled: sessionData ? true : false,
    },
  );

  // const { mutate: addFavoriteDog } = api.favorites.create.useMutation({});
  const { mutate: updateFavoriteDogs } = api.favorites.update.useMutation({});

  const addToFavorites = (dog: DogWithRelations) => {
    if (favoriteDogs.includes(dog)) {
      console.log("You have already favorited this dog!");
    } else {
      setFavoriteDogs([...favoriteDogs, dog]);
      // setSelectedFavDog(dog)
      // getDogById({dogId: dog.id})
      // addFavoriteDog({ dogIds: [dog.id] });
      if (currentUser && currentUser.favorites) {
        const { favorites } = currentUser;
        const favDogIds = favorites.dogIds;
        updateFavoriteDogs({ dogIds: [...favDogIds, dog.id] });
      }
    }
  };

  const removeFromFavorites = (dog: DogWithRelations) => {
    const filteredDogs = favoriteDogs.filter((favDog) => dog.id !== favDog.id);

    setFavoriteDogs(filteredDogs);
  };

  useEffect(() => {
    console.log("favoriteDogs", favoriteDogs);
  }, [favoriteDogs]);

  //   const fetchNext = async (nextParams: string): Promise<void> => {
  //     let response: AxiosResponse<any, any> | undefined =
  //       await fetchNextPage(nextParams)
  //     if (response) {
  //       const isResponse200 = responseCheck(response)
  //       if (isResponse200) {
  //         try {
  //           await fetchDogObjects(response.data.resultIds)
  //         } catch (error) {
  //           console.error(`Couldn't fetch dog objects`, error)
  //         }
  //         if (response.data.next) {
  //           setNextParams(response.data.next)
  //         }
  //         if (response.data.prev) {
  //           setPrevParams(response.data.prev)
  //         }
  //       }
  //     }
  //   }

  //   const fetchPrev = async (prevParams: string): Promise<void> => {
  //     const response: AxiosResponse<any, any> | undefined =
  //       await fetchPrevPage(prevParams)
  //     if (response) {
  //       const isResponse200 = responseCheck(response)
  //       if (isResponse200) {
  //         try {
  //           await fetchDogObjects(response.data.resultIds)
  //         } catch (error) {
  //           console.error(`Couldn't fetch dog objects`, error)
  //         }

  //         if (response.data.next) {
  //           setNextParams(response.data.next)
  //         }
  //         if (response.data.prev) {
  //           setPrevParams(response.data.prev)
  //         }
  //       }
  //     }
  //   }
  // useEffect(() => {
  //   console.log("dogs", allDogs);
  // }, []);

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
          <button onClick={() => favoriteDialogRef.current?.showModal()}>
            View Favorites
          </button>
        )}

        {dogs.map((dog) => (
          <div
            key={dog.id}
            className="mt-6 flex w-[45%] flex-col items-center justify-between rounded-md border-2 border-black"
          >
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
                  {dog.address?.state && `${dog.address.state.toUpperCase()}, `}
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
            <div className="my-2 flex w-full flex-col items-center gap-1">
              <button
                className="w-32 border border-black px-1"
                onClick={() => {
                  favoriteDogs.includes(dog)
                    ? removeFromFavorites(dog)
                    : addToFavorites(dog);
                }}
              >
                {favoriteDogs.includes(dog)
                  ? "Remove From Favorites"
                  : "Add To Favorites"}
              </button>
            </div>
          </div>
        ))}
        {/* Pagination */}

        {/* <div className="mb-2 flex w-full justify-evenly">
          <button
            className="border-2 border-black px-1"
              onClick={() => {
                setCurrentPage(currentPage - 1)
                fetchPrev(prevParams)
              }}
              disabled={currentPage <= 0}
          >
            Prev Page
          </button>
          <p>Page {currentPage + 1} of {totalPages}</p>
          <button
            className="border-2 border-black px-1"
              onClick={() => {
                setCurrentPage(currentPage + 1)
                fetchNext(nextParams)
              }}
              disabled={currentPage >= totalPages - 1}
          >
            Next page
          </button>
        </div> */}
      </div>
    </>
  );
};

export default DogResults;
