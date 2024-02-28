import { DogContext } from "~/context/DogContext";
import { useContext } from "react";
import { capitalizeFirstLetter } from "~/utils/helpers";
import Image from "next/image";
import imgNotFound from "public/images/img-unavail.jpeg";

const FavoriteDogsDialog = () => {
  const { favoriteDogs } = useContext(DogContext);
  console.log("favoriteDogs", favoriteDogs);

  return (
    <div className="flex flex-col items-center relative  border-2 border-black">
      <h2 className="text-[1.7rem] text-center">Favorite Dogs!</h2>
      {favoriteDogs.map((dog) => (
        <div
          key={`favoriteDog-${dog.id}`}
          className="flex flex-col items-center justify-between w-[70%] rounded-md border-2 border-black"
        >
          <div className="flex w-full flex-col justify-between md:flex-row">
            <div className="xs:text-[1.2rem] flex flex-col gap-1 pl-2">
              <span>Name: {dog.name}</span>
              <span>Breed: {dog.breed}</span>
              <span>Age: {dog.age}</span>
              <span className="">
                Address: {dog.address?.address1 && `${dog.address.address1}, `}
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
        </div>
      ))}
      <>
        <form className="absolute right-2" method="dialog">
          <button className="btn hover:text-navy cursor-pointer rounded-md">
            Close
          </button>
        </form>
      </>
    </div>
  );
};

export default FavoriteDogsDialog;
