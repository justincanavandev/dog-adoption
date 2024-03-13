import { DogContext } from "~/context/DogContext";
import { useContext } from "react";
import { capitalizeFirstLetter } from "~/utils/helpers";
import Image from "next/image";
import imgNotFound from "public/images/img-unavail.jpeg";
import Spinner from "../Spinner";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import type { DogWithRelations } from "~/types/dog-types";

type FavoriteDogsType = {
  remove: (dog: DogWithRelations) => void;
  add: (dog: DogWithRelations) => void;
};

const FavoriteDogs = ({ remove, add }: FavoriteDogsType) => {
  const { favoriteDogs, isDogsLoading, isFetchingNextPage, favDogIds } =
    useContext(DogContext);

  return (
    <>
      <div className="flex w-[300px] flex-col gap-8 items-center rounded-md xs:w-[400px] sm:w-[640px] md:w-[750px] ">
        <div className="overflow-y-scroll flex flex-col gap-6  sm:flex-row sm:flex-wrap sm:justify-center">
          {favoriteDogs.map((dog) => (
            <div
              key={dog.id}
              className={`relative flex h-auto max-w-[300px] flex-col items-center justify-between overflow-hidden rounded-md xs:border xs:border-gray-500`}
            >
              {!isDogsLoading || !isFetchingNextPage ? (
                <>
                  <Image
                    alt={`Image of ${dog.name}, ${dog.breed}`}
                    height={270}
                    width={270}
                    style={{
                      objectFit: "cover",
                      maxHeight: "270px",
                      maxWidth: "270px",
                    }}
                    quality={100}
                    className="rounded-md"
                    src={dog.photos[0] ? dog.photos[0].medium : imgNotFound}
                  ></Image>

                  <div className="flex h-full max-w-[270px] flex-col justify-around gap-1 pl-2 text-center xs:text-[1.2rem]">
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
                        remove(dog);
                      }}
                      className=""
                    />
                  ) : (
                    <FaRegHeart
                      onClick={() => {
                        add(dog);
                      }}
                      className=""
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FavoriteDogs;
