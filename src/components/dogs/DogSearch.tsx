// import { useContext, useEffect } from "react"
// import { DogsContext } from "./context/DogContext"
// import { AxiosResponse } from "axios"
// import { fetchNextPage } from "./api/paginationFns"
// import { responseCheck } from "./utils/responseCheck"
// import { fetchPrevPage } from "./api/paginationFns"
// import { getNewDogs } from "./api/getNewDogs"

import { useContext } from "react";
import { DogContext } from "~/context/DogContext";
import Image from "next/image";
import imgNotFound from "public/images/img-unavail.jpeg";
import Link from "next/link";
import Head from "next/head";
import { capitalizeFirstLetter } from "~/utils/helpers";
import type { DogWithRelations } from "~/types/dog-types";

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

  const { dogs, favoriteDogs, setFavoriteDogs } =
    useContext(DogContext);
  // const [favoriteDogs, setFavoriteDogs] = useState({})

  const addToFavorites = async (dog: DogWithRelations): Promise<void> => {
    if (favoriteDogs.includes(dog)) {
      console.log("You have already favorited this dog!");
    } else {
      setFavoriteDogs([...favoriteDogs, dog]);
    }
  };

  // useEffect(() => {
  //   console.log("favoriteDogs", favoriteDogs);
  // }, [favoriteDogs]);

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
    // <Layout>
    <>
      <Head>
        <title>Search for Dogs!</title>
      </Head>
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/">Go to Home Page</Link>
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
                <span className="">
                  Address:{" "}
                  {dog.address?.address1 && `${dog.address.address1}, `}
                  {dog.address?.city &&
                    `${capitalizeFirstLetter(dog.address.city)}, `}
                  {dog.address?.state && `${dog.address.state.toUpperCase()}, `}
                  {dog.address?.zipCode && dog.address.zipCode}
                </span>
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
                width={300}
                height={400}
                className="xs:h-48 xs:w-36 mx-auto h-40 w-[7.5rem] rounded-md object-cover sm:h-60 sm:w-[11.25rem] md:m-1 lg:h-72 lg:w-[13.5rem]"
                src={dog.photos[0] ? dog.photos[0].medium : imgNotFound}
              ></Image>
            </div>
            <div className="my-2 flex w-full flex-col items-center gap-1">
              <button
                className="w-32 border border-black px-1"
                onClick={() => addToFavorites(dog)}
              >
                Add to Favorites
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
      {/* // </Layout> */}
    </>
  );
};

export default DogSearch;
