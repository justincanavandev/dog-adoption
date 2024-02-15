import { api } from "~/utils/api";
import Spinner from "~/components/Spinner";
import Dogs from "~/components/dogs/Dogs";

const DogPage = () => {
  const {
    data: allDogs,
    isLoading: isDogsLoading,
    isSuccess: isDogsSuccess,
    isError: isDogsError,
  } = api.dog.getAll.useQuery();



  return (
    // <div className="mt-4 flex flex-col gap-2 ">
    <>
      {isDogsLoading && <Spinner fullscreen={true} />}
      {isDogsError && <div>Error fetching dogs!</div>}
      {isDogsSuccess && !isDogsLoading && allDogs && <Dogs allDogs={allDogs} />}
     
    </>
    // </div>
  );
};

export default DogPage;
