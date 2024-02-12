// import { useContext, useEffect } from "react"
// import { DogsContext } from "./context/DogContext"
// import { AxiosResponse } from "axios"
// import { fetchNextPage } from "./api/paginationFns"
// import { responseCheck } from "./utils/responseCheck"
// import { fetchPrevPage } from "./api/paginationFns"
// import { getNewDogs } from "./api/getNewDogs"

import { useContext, useEffect } from "react";
import { DogContext } from "~/context/dog-context";
import Image from "next/image";
import imgNotFound from "public/img-unavail.jpeg";

const DogSearch = () => {
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

  const { dogs } = useContext(DogContext);

  //   const addToFavorites = async (id: string): Promise<void> => {
  //     await fetchFavoriteDogs([...favoriteDogsIds], id)
  //     if (!favoriteDogsIds.includes(id)) {
  //       setFavoriteDogsIds([...favoriteDogsIds, id])
  //     }
  //   }
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
  useEffect(() => {
    console.log("dogs", dogs);
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <h2 className="w-full text-center text-[1.5rem]"> View All Dogs!</h2>

      {dogs.map((dog, index) => (
        <div
          key={dog.id}
          className="mt-6 flex w-[45%] flex-col items-center justify-between rounded-md border-2 border-black"
        >
          <div className="flex w-full flex-col justify-between md:flex-row">
            <div className="xs:text-[1.2rem] flex flex-col gap-1  pl-2">
              <span>Name: {dog.name}</span>
              <span>Breed: {dog.breed}</span>
              <span>Age: {dog.age}</span>
              {/* {locationArr && locationArr[index] && (
                <span>
                  {" "}
                  {`${locationArr[index].city}, ${locationArr[index].state}, ${locationArr[index].zip_code}`}
                </span>
              )} */}
            </div>
            {/* <img */}
            <Image
              alt="dog photo"
              width={100}
              height={500}
              className="xs:h-48 xs:w-36 mx-auto h-40 w-[7.5rem] rounded-md object-cover sm:h-60 sm:w-[11.25rem] md:m-1 lg:h-72 lg:w-[13.5rem]"
              src={dog.photos[0] ? dog.photos[0].medium : imgNotFound}
            ></Image>
          </div>
          <div className="my-2 flex w-full flex-col items-center gap-1">
            {/* <button
              className="w-32 border border-black px-1"
              onClick={() => addToFavorites(dog.id)}
            >
              Add to Favorites
            </button> */}
          </div>
        </div>
      ))}
      <div className="mb-2 flex w-full justify-evenly">
        <button
          className="border-2 border-black px-1"
          //   onClick={() => {
          //     setCurrentPage(currentPage - 1)
          //     fetchPrev(prevParams)
          //   }}
          //   disabled={currentPage <= 0}
        >
          Prev Page
        </button>
        <p>{/* Page {currentPage + 1} of {totalPages} */}</p>
        <button
          className="border-2 border-black px-1"
          //   onClick={() => {
          //     setCurrentPage(currentPage + 1)
          //     fetchNext(nextParams)
          //   }}
          //   disabled={currentPage >= totalPages - 1}
        >
          Next page
        </button>
      </div>
    </div>
  );
};

export default DogSearch;
