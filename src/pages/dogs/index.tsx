import { api } from "~/utils/api";
import Spinner from "~/components/Spinner";
import Dogs from "~/components/dogs/Dogs";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const DogPage = () => {
  const {
    data: allDogs,
    isLoading: isDogsLoading,
    isSuccess: isDogsSuccess,
    isError: isDogsError,
  } = api.dog.getAll.useQuery();

  const { data: sessionData } = useSession();

  const {
    data: currentUser,
    isLoading: isUserLoading,
    isError: isUserError,
    isSuccess: isUserSuccess,
  } = api.user.getById.useQuery(
    { id: sessionData ? sessionData.user.id : "" },
    {
      enabled: !!sessionData,
    },
  );

  const {
    data: favorites,
    isSuccess: isFavoritesSuccess,
    isLoading: isFavoritesLoading,
  } = api.dog.getManyById.useQuery(
    {
      ids: currentUser?.favorites ? currentUser.favorites.dogIds : [],
    },
    { enabled: !!sessionData && !!currentUser },
  );

  return (
    // <div className="mt-4 flex flex-col gap-2 ">
    <>
      {(isDogsLoading && isUserLoading) ||
        isDogsLoading ||
        (isUserLoading && <Spinner fullscreen={true} />)}
      {isDogsError && <div>Error fetching dogs!</div>}
      {isUserError && <div>Error fetching user!</div>}
      {isDogsSuccess && !isDogsLoading && allDogs && (
        <Dogs
          allDogs={allDogs}
          favorites={
            favorites &&
            isFavoritesSuccess &&
            !isFavoritesLoading &&
            !isUserLoading &&
            isUserSuccess
              ? favorites
              : []
          }
          sessionData={sessionData}
          currentUser={currentUser}
        />
      )}
    </>
    // </div>
  );
};

export default DogPage;
