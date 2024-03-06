import { api } from "~/utils/api";
import Dogs from "~/components/dogs/Dogs";
import { useSession } from "next-auth/react";

const DogPage = () => {
  const { data: sessionData } = useSession();

  const {
    data: currentUser,
    // isLoading: isUserLoading,
    // isError: isUserError,
  } = api.user.getById.useQuery(
    { id: sessionData ? sessionData.user.id : "" },
    {
      enabled: !!sessionData,
      staleTime: 5000 * 60,
    },
  );

  const {
    data: favoriteDogs,
    isSuccess: isFavoritesSuccess,
    isLoading: isFavoritesLoading,
  } = api.dog.getManyById.useQuery(
    {
      ids: currentUser?.favorites ? currentUser.favorites.dogIds : [],
    },
    { enabled: !!sessionData && !!currentUser, staleTime: 5000 * 60 },
  );

  return (
    <>
      {/* {isUserLoading && <Spinner fullscreen={true} />}
      {isUserError && <div>Error fetching user!</div>} */}
      <Dogs
        favoriteDogs={
          favoriteDogs && isFavoritesSuccess && !isFavoritesLoading
            ? favoriteDogs
            : []
        }
        sessionData={sessionData}
        currentUser={currentUser}
      />
    </>
  );
};

export default DogPage;
